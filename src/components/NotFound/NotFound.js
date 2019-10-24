import React from 'react';

import PicError from '../../images/error.jpg';

function NotFound(props) {
  return (
    <div>
      <h1>404: Pagina no encontrada</h1>
      <div class="col-8">
        <img className="d-block mx-auto my-2" src={PicError} alt="Logo Cinephilio" />
      </div>
    </div>
  )
}

export default NotFound;