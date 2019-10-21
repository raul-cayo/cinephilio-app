import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../images/LogoDark.png';
import './FrontPage.css';

function FrontPage(props) {
  return (
    <div className="container mt-5">
      <div className="row align-self-center">
        <img className="FrontPage-logo rounded-circle mx-auto d-block" src={Logo} alt="Logo Cinephilio" />
      </div>
      <div className="row align-self-center">
        <h1 className="FrontPage-title my-3 text-center mx-auto">Cinephilio</h1>
      </div>
      <div className="row align-self-center px-4">
        <Link to="/login" className="btn cbt-lg-green btn-block mb-3 col-lg-4 offset-lg-4">Iniciar Sesión</Link>
        <Link to="/signup" className="btn cbt-lg-green btn-block mb-3 col-lg-4 offset-lg-4">Registrarme</Link>
        <Link to="/about" className="btn cbt-blue btn-block mb-3 col-lg-4 offset-lg-4">¿Qué es Cinephilio?</Link>
        <Link to="/anonRecomm" className="btn cbt-blue btn-block mb-3 col-lg-4 offset-lg-4">Recomiéndame una Película</Link>
      </div>
    </div>
  )
}

export default FrontPage;