import React from 'react';
import { Link } from 'react-router-dom';

import PicError from '../../images/error.jpg';
import './ErrorDisplay.css';
import LoadingModal from '../LoadingModal/LoadingModal';

function ErrorDisplay(props) {
  return (
    <div className="d-flex justify-content-center flex-column">
      <LoadingModal />
      <h1 className="mt-3 text-center">{props.error}</h1>
      <p className="text-center">{props.desc}</p>
      <div className="col-6 offset-3">
        <img className="img-fluid wazowski" src={PicError} alt="Imagen Error" />
        <Link to="/" className="btn cbt-blue btn-block mt-4">Ir a Página Principal</Link>
      </div>
    </div>
  )
}

export default ErrorDisplay;