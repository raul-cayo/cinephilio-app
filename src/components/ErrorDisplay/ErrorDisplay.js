import React from 'react';
import { Link } from 'react-router-dom';

import PicError from '../../images/error.jpg';
import './ErrorDisplay.css';

function ErrorDisplay(props) {
  return (
    <div class="d-flex justify-content-center flex-column">
      <h1 className="mt-3">{props.error}</h1>
      <p>{props.desc}</p>
      <div class="col-6 col-md-4">
        <img className="d-block mx-auto mb-2" src={PicError} alt="Imagen Error" />
        <Link to="/" className="btn cbt-blue btn-block">Ir a Página Principal</Link>
      </div>
    </div>
  )
}

export default ErrorDisplay;