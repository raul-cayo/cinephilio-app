import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import './Navbar.css';

class Navbar extends React.Component {

  async logoutRequest() {
    axios.post('https://cinephilio-api.herokuapp.com/logout',
      { headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('access_token') }}
    )
    .then((res) => {
      if (res.status === 200) {
        console.log("Successfully logged out");
      } else {
        console.log("Error logoutRequest status: " + res.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  logoutUser() {
    // this.logoutRequest();
    window.localStorage.setItem('access_token', 'notoken');
    window.localStorage.setItem('refresh_token', 'notoken');
    window.localStorage.setItem('username', 'nousername');
    this.props.history.push("/");
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
            <li className="nav-item text-center mt-2">
              <Link to="/profile" className="nav-btn">Mi Cuenta</Link>
            </li>
            <li>
              <div className="line"></div>
            </li>
            <li className="nav-item text-center">
              <button className="nav-btn" onClick={this.logoutUser.bind(this)}>Cerrar Sesión</button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
};

export default withRouter(Navbar);