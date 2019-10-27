import React from 'react';

import LoadingGif from '../../images/loading.gif';
import './LoadingModal.css';

function LoadingModal(props) {
  return (
    <div className="modal-bg">
      <div className="modal d-flex flex-column justify-content-center">
        <h4 className="text-center mt-3">Cargando</h4>
        <img src={LoadingGif} alt="Cargando" />
      </div>
    </div>
  )
}

export default LoadingModal;