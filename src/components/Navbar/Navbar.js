import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {

  render() {
    return (
      <nav className="cphio-navbar navbar navbar-light">
        <div className="container-fluid">

          <div className="navbar-header " data-toggle="collapse" data-target=".navbar-collapse.show">
            <Link to="/home" className="titulo-navbar px-2">Cinephilio</Link>
          </div>

          <p className="my-auto ml-auto mr-3 d-none d-sm-block">{this.props.username}</p>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item text-center mb-1 mt-2">
                <button className="nav-btn">Mi Cuenta</button>
              </li>
              <li className="nav-item text-center">
                <button className="nav-btn">Cerrar Sesión</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
};

export default Navbar;