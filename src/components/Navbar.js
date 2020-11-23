import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark p-0 text-monospace">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="/"
        >
            FSIBC
        </a>
        <ul className="navbar-nav px-3">
          <b className='text-white'>{this.props.account}</b>
        </ul>
      </nav>
    );
  }
}

export default Navbar;