import React from 'react';

import LoadingGif from '../../images/loading.gif';
import './LoadingModal.css';

function LoadingModal(props) {
  return (
    <div className="modal-bg">
      <div className="modal p-1">
        <h3 className="text-center">Cargando</h3>
        <img className="img-fluid" src={LoadingGif} alt="Cargando" />
      </div>
    </div>
  )
}

export default LoadingModal;