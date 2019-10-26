import React from 'react';

import PicError from '../../images/error.jpg';
import './ErrorDisplay.css';

function ErrorDisplay(props) {
  return (
    <div class="d-flex justify-content-center">
      <h1 className="mt-3">{props.error}</h1>
      <p>{props.desc}</p>
      <div class="col-4">
        <img className="d-block mx-auto" src={PicError} alt="Imagen Error" />
      </div>
    </div>
  )
}

export default ErrorDisplay;