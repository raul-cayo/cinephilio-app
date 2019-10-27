import React from 'react';
import { Link } from 'react-router-dom';

import PicError from '../../images/error.jpg';
import './ErrorDisplay.css';

import LoadingGif from '../../images/loading.gif';
import LoadingGif2 from '../../images/loading_bg.gif';

function ErrorDisplay(props) {
  return (
    <div class="d-flex justify-content-center flex-column">
      <h1 className="mt-3 text-center">{props.error}</h1>
      <p className="text-center">{props.desc}</p>
      <div className="col-6 offset-3">
        <img className="img-fluid wazowski" src={PicError} alt="Imagen Error" />
        <Link to="/" className="btn cbt-blue btn-block mt-4">Ir a Página Principal</Link>
        <img className="img-fluid" src={LoadingGif} alt="Loading" />
        <img className="img-fluid" src={LoadingGif2} alt="Loading" />
      </div>
    </div>
  )
}

export default ErrorDisplay;