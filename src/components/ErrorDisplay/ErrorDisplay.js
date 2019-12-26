import React from 'react';
import { Link } from 'react-router-dom';

import SpeechBalloon from '../SpeechBalloon/SpeechBalloon';
import PicError from '../../images/error.jpg';
import './ErrorDisplay.css';

function ErrorDisplay(props) {
  return (
    <div className="col-10 offset-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3 mt-4">
      <SpeechBalloon>{props.error}</SpeechBalloon>
      <div>
        <img className="img-fluid wazowski" src={PicError} alt="Imagen Error" />
        <Link to="/" className="btn cbt-blue btn-block mt-4">Ir a Página Principal</Link>
      </div>
    </div>
  )
}

export default ErrorDisplay;