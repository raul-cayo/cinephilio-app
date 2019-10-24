import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Navbar.css';

class Navbar extends React.Component {
  logoutRequest() {
    axios.post('https://cinephilio-api.herokuapp.com/logout',
      { headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('access_token') }}
    )
    .then((res) => {
      if (res.status === 200) {
        console.log("Successfully logged out");
      } else {
        console.log("Error _registerRequest status: " + res.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  logoutUser(e) {
    e.preventDefaulf();
    this.logoutRequest();
    this.props.history.push("/login");
  }

  render() {
    return (
      <nav className="cphio-navbar navbar navbar-light">
        <Link to="/home" className="titulo-navbar px-2">Cinephilio</Link>

        <p className="my-auto ml-auto mr-3 d-none d-sm-block">{window.localStorage.getItem('username')}</p>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item text-center mb-1 mt-2">
              <Link to="/home" className="nav-btn">Mi Cuenta</Link>
            </li>
            <li className="nav-item text-center">
              <button className="nav-btn" onClick={this.logoutRequest.bind(this)}>Cerrar Sesión</button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
};

export default withRouter(Navbar);