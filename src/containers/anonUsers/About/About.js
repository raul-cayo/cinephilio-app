import React from 'react';

import AnonNavbar from '../../../components/Navbar/AnonNavbar';
import SpeechBalloon from '../../../components/SpeechBalloon/SpeechBalloon';
import PicLuis from '../../../images/luis.jpg';
import PicCayo from '../../../images/cayo.jpg';
import PicDiego from '../../../images/diego.jpg';

function About(props) {
  return (
    <React.Fragment>
      <AnonNavbar/>
      <section className="m-5 col-12 col-lg-8 offset-lg-2">
        <SpeechBalloon>TEXT ABOUT</SpeechBalloon>
        <h1 className="text-center mb-2">¿Qué es Cinephilio?</h1>
        <p>Es un motor de recomendaciones que se basa en las respuestas a las encuestas que realiza cada usuario para recomendarle la mejor película. Para decidir que película se va a recomendar se utilizan algoritmos y métodos de Machine Learning.</p>

        <h3 className="mt-5 mb-3"><strong>Equipo de Desarrollo</strong></h3>
        <div className="row">
          <div className="col-12 col-sm-4 px-5 px-sm-3">
            <div className="avatar mx-auto mb-2">
              <img alt="Cayo" src={PicCayo} className="img-fluid img-thumbnail rounded-circle" />
            </div>
            <p className="text-center mb-1">Raúl Cayo</p>
            <p className="text-center mt-0"><strong>API DEVELOPER</strong></p>
          </div>

          <div className="col-12 col-sm-4 px-5 px-sm-3">
            <div className="avatar mx-auto mb-2">
              <img alt="Luis" src={PicLuis} className="img-fluid img-thumbnail rounded-circle" />
            </div>
            <p className="text-center mb-1">Luis Hernández</p>
            <p className="text-center mt-0"><strong>FRONT END DEVELOPER</strong></p>
          </div>

          <div className="col-12 col-sm-4 px-5 px-sm-3">
            <div className="avatar mx-auto mb-2">
              <img alt="Diego" src={PicDiego} className="img-fluid img-thumbnail rounded-circle" />
            </div>
            <p className="text-center mb-1">Diego Ramírez / DBA</p>
            <p className="text-center mt-0"><strong>DBA</strong></p>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default About;