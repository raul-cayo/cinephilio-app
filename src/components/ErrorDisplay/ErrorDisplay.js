import React from 'react';
import { Link } from 'react-router-dom';

import PicError from '../../images/error.jpg';
import './ErrorDisplay.css';

function ErrorDisplay(props) {
  return (
    <div class="d-flex justify-content-center flex-column">
      <h1 className="mt-3 text-center">{props.error}</h1>
      <p className="text-center">{props.desc}</p>
      <div class="col-6 offset-3 col-lg-4 offset-lg-4">
        <img className="img-fluid" src={PicError} alt="Imagen Error" />
        <Link to="/" className="btn cbt-blue btn-block">Ir a Página Principal</Link>
      </div>
    </div>
  )
}

export default ErrorDisplay;