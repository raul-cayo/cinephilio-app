import React from 'react';

import PicLuis from '../../../images/luis.jpg'
import PicCayo from '../../../images/cayo.jpg'
import PicDiego from '../../../images/diego.jpg'

function About(props) {
  return (
    <section className="team-section text-center m-5">
      <p className="grey-text w-responsive mx-auto mb-5">Conoce al equipo de desarrollo</p>

      <div className="row">
        <div className="col-lg-4 col-md-5 mb-lg-0 mb-5">
          <div className="avatar mx-auto">
            <img src={PicCayo} className="img-fluid img-thumbnail rounded-circle z-depth-1"
              alt="Sample avatar" />
          </div>
          <h5 className="font-weight-bold mt-4 mb-3">Raúl Cayo</h5>
          <p className="text-uppercase blue-text"><strong>API developer</strong></p>
          <p className="grey-text">Estudiante Ing. Informática.</p>
        </div>

        <div className="col-lg-4 col-md-5 mb-lg-0 mb-5">
          <div className="avatar mx-auto">
            <img src={PicLuis} className="img-fluid img-thumbnail rounded-circle z-depth-1"
              alt="Sample avatar" />
          </div>
          <h5 className="font-weight-bold mt-4 mb-3">Luis Hernández</h5>
          <p className="text-uppercase blue-text"><strong>Front end developer</strong></p>
          <p className="grey-text">Estudiante Ing. Informática.</p>
        </div>

        <div className="col-lg-4 col-md-10 mb-md-0 mb-5">
          <div className="avatar mx-auto">
            <img src={PicDiego} className="img-fluid img-thumbnail rounded-circle z-depth-1"
              alt="Sample avatar" />
          </div>
          <h5 className="font-weight-bold mt-4 mb-3">Diego Ramírez</h5>
          <p className="text-uppercase blue-text"><strong>DBA</strong></p>
          <p className="grey-text">Estudiante Ing. en Computación.</p>
        </div>
      </div>
    </section>
  )
}

export default About;