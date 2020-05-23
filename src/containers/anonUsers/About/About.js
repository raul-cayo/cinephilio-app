import React from 'react';

import AnonNavbar from '../../../components/Navbar/AnonNavbar';
import SpeechBalloon from '../../../components/SpeechBalloon/SpeechBalloon';
import PicLuis from '../../../images/developers/luis 2.jpg';
import PicCayo from '../../../images/developers/cayo.jpg';
import PicDiego from '../../../images/developers/diego.jpg';
import './About.css';

function About(props) {
  return (
    <React.Fragment>
      <AnonNavbar/>
      <div className="container">
        <div className="col-lg-8 offset-lg-2 pt-4">
          <SpeechBalloon>Cinephilio es un motor de recomendaciones que se basa en las 
            respuestas a las encuestas que realiza cada usuario para recomendarle la mejor película. 
            Para decidir que película se va a recomendar se utilizan algoritmos de aprendizaje automático.
	  </SpeechBalloon>

          <div className="udg row mt-5">
            <div className="col-8 offset-2 offset-sm-0 col-sm-4 px-5 px-sm-3">
              <div className="avatar mx-auto mb-2">
                <img alt="Cayo" src={PicCayo} className="letter letterU img-fluid imgStyle" />
              </div>
              <p className="text-center mb-1">Raúl Sanchez</p>
              <p className="text-center mt-0"><strong>ING. INFORMÁTICA</strong></p>
            </div>

            <div className="col-8 offset-2 offset-sm-0 col-sm-4 px-5 px-sm-3">
              <div className="avatar mx-auto mb-2">
                <img alt="Diego" src={PicDiego} className="letter letterD img-fluid imgStyle" />
              </div>
              <p className="text-center mb-1">Diego Ramírez</p>
              <p className="text-center mt-0"><strong>ING. COMPUTACIÓN</strong></p>
            </div>

            <div className="col-8 offset-2 offset-sm-0 col-sm-4 px-5 px-sm-3">
              <div className="avatar mx-auto mb-2">
                <img alt="Luis" src={PicLuis} className="letter letterG img-fluid imgStyle" />
              </div>
              <p className="text-center mb-1">Luis Hernández</p>
              <p className="text-center mt-0"><strong>ING. INFORMÁTICA</strong></p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default About;