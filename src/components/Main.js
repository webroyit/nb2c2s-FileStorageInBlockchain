import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5 text-center">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content">
              <p>&nbsp;</p>
              <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>
                <h2 className="text-white text-monospace bg-dark"><b><ins>Share File</ins></b></h2>
                <form onSubmit={(event) => {
                  event.preventDefault();
                  const description = this.fileDescription.value;
                  console.log(description);
                }} >
                  <div className="form-group">
                    <br></br>
                    <input
                      id="fileDescription"
                      type="text"
                      ref={(input) => { this.fileDescription = input }}
                      className="form-control text-monospace"
                      placeholder="Description..."
                      required />
                  </div>
                  
                  <input type="file" className="text-white text-monospace"/>
                  <button type="submit" className="btn-primary btn-block mt-2"><b>Upload!</b></button>
                </form>
              </div>
              <p>&nbsp;</p>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;