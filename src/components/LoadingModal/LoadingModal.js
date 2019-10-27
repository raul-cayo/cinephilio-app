import React from 'react';

import LoadingGif from '../../images/loading.gif';

function LoadingModal(props) {
  return (
    <div className="modal-bg">
      <div className="modal container p-1">
        <h3 className="text-center">Cargando</h3>
        <img className="img-fluid mx-auto" src={LoadingGif} alt="Cargando" />
      </div>
    </div>
  )
}

export default LoadingModal;