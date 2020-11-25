import React, { Component } from 'react';
import Web3 from 'web3';

import DStorage from './abis/DStorage.json'
import Navbar from './components/Navbar';
import Main from './components/Main';

// Connect to IPFS
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      dstorage: null,
      files: [],
      filesCount: 0,
      type: null,
      name: null,
      loading: false
    }
    this.captureFile = this.captureFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = DStorage.networks[networkId];

    if(networkData) {
      // Assign contract
      const dstorage = new web3.eth.Contract(DStorage.abi, networkData.address);
      this.setState({ dstorage });

      // Get files amount
      const filesCount = await dstorage.methods.fileCount().call();
      this.setState({ filesCount });

      // Load files and sort by the newest
      for (let i = filesCount; i >= 1; i--) {
        const file = await dstorage.methods.files(i).call();
        this.setState({
          files: [...this.state.files, file]
        });
      }
    } else {
      window.alert('This contract not deployed to detected network.');
    }
  }

  // Get file from user and prepare it for upload
  captureFile = event => {
    event.preventDefault();

    // Get the file from the form
    const file = event.target.files[0];

    // Read the file
    const reader = new window.FileReader();

    // Convert the file into buffer
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name
      });
      console.log('buffer', this.state.buffer);
    }
  }

  // Upload file
  uploadFile = description => {
    // Add file to IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log(result);

      if(error) {
        console.error(error);
        return;
      }

      this.setState({ loading: true });

      // Assign value for the file without extension
      if(this.state.type === '') {
        this.setState({ type: 'none' });
      }

      // Call contract uploadFile function
      this.state.dstorage.methods.uploadFile(result[0].hash, result[0].size, this.state.type, this.state.name, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({
         loading: false,
         type: null,
         name: null
       })
       
       // Reload the page
       window.location.reload();
      }).on('error', (e) =>{
        window.alert('Error');
        this.setState({loading: false});
      })
    });
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main captureFile={this.captureFile} uploadFile={this.uploadFile} />
        }
      </div>
    );
  }
}

export default App;
