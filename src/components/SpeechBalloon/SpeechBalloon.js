import React from 'react';

import Logo from '../../images/LogoDark.png';

const SpeechBallon = (props) => {
  return (
    <div className="row my-2 px-4">
      <div className="col-12 col-md-3">
        <img className="logo rounded-circle d-block mx-auto my-2" src={Logo} alt="Logo Cinephilio" />
      </div>
      <p className="my-auto text-box col-12 col-md-9 py-3">{props.children}</p>
    </div>
  )
};

export default SpeechBallon;