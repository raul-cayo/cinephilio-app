import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Navbar.css';

class AnonNavbar extends React.Component {

  render() {
    return (
      <nav className="cphio-navbar navbar navbar-light">
        <Link to="/" className="titulo-navbar px-2">Cinephilio</Link>
      </nav>
    )
  }
};

export default withRouter(AnonNavbar);