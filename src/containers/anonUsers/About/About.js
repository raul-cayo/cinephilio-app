import React from 'react';

import PicLuis from '../../../images/luis.jpg'
import PicCayo from '../../../images/cayo.jpg'
import PicDiego from '../../../images/diego.jpg'

function About(props) {
  return (
    <section className="m-5">
      <h1 className="text-center">¿Qué es Cinephilio?</h1>
      <p>Es un motor de recomendaciones que se basa en las respuestas a las encuestas que realiza cada usuario para recomendarle la mejor película.</p>
      <p>Para decidir que película se va a recomendar se utilizan algoritmos y métodos de Machine Learning.</p>

      <h3 className="my-3">Conoce al equipo de desarrollo</h3>
      <div className="row">
        <div className="col-4 p-3">
          <div className="avatar mx-auto">
            <img src={PicCayo} className="img-fluid rounded-circle" />
          </div>
          <p className="text-center">Raúl Cayo</p>
          <p className="text-center"><strong>API DEVELOPER</strong></p>
        </div>

        <div className="col-4 p-3">
          <div className="avatar mx-auto">
            <img src={PicLuis} className="img-fluid rounded-circle" />
          </div>
          <p className="text-center">Luis Hernández</p>
          <p className="text-center"><strong>FRONT END DEVELOPER</strong></p>
        </div>

        <div className="col-4 p-3">
          <div className="avatar mx-auto">
            <img src={PicDiego} className="img-fluid rounded-circle" />
          </div>
          <p className="text-center">Diego Ramírez</p>
          <p className="text-center"><strong>DBA</strong></p>
        </div>
      </div>
    </section>
  )
}

export default About;