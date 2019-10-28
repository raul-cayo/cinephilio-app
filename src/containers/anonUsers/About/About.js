import React from 'react';

import PicLuis from '../../../images/luis.jpg'
import PicCayo from '../../../images/cayo.jpg'
import PicDiego from '../../../images/diego.jpg'

function About(props) {
  return (
    <section className="m-5">
      <h1 className="text-center mb-2">¿Qué es Cinephilio?</h1>
      <p>Es un motor de recomendaciones que se basa en las respuestas a las encuestas que realiza cada usuario para recomendarle la mejor película. Para decidir que película se va a recomendar se utilizan algoritmos y métodos de Machine Learning.</p>

      <h3 className="mt-5 mb-3"><strong>Equipo de Desarrollo</strong></h3>
      <div className="row">
        <div className="col-12 col-sm-4 px-5 px-sm-3 px-md-5">
          <div className="avatar mx-auto mb-2">
            <img src={PicCayo} className="img-fluid img-thumbnail rounded-circle" />
          </div>
          <p className="text-center mb-1">Raúl Cayo</p>
          <p className="text-center mt-0"><strong>API DEVELOPER</strong></p>
        </div>

        <div className="col-12 col-sm-4 px-5 px-sm-3 px-md-5">
          <div className="avatar mx-auto mb-2">
            <img src={PicLuis} className="img-fluid img-thumbnail rounded-circle" />
          </div>
          <p className="text-center mb-1">Luis Hernández</p>
          <p className="text-center mt-0"><strong>FRONT END DEVELOPER</strong></p>
        </div>

        <div className="col-12 col-sm-4 px-5 px-sm-3 px-md-5">
          <div className="avatar mx-auto mb-2">
            <img src={PicDiego} className="img-fluid img-thumbnail rounded-circle" />
          </div>
          <p className="text-center mb-1">Diego Ramírez / DBA</p>
          <p className="text-center mt-0"><strong>DBA</strong></p>
        </div>
      </div>
    </section>
  )
}

export default About;