import React from 'react';

import QuizComponent from '../../../components/Quiz/QuizComponent'

import photo1 from '../../../images/c3po.jpg'
import photo2 from '../../../images/walle.jpg'
import photo3 from '../../../images/bruce-robot.jpeg'
import photo4 from '../../../images/sophia.jpeg'

function AnonRecommendation(props) {
  let opc = [photo1,photo2,photo3,photo4]
  return (
    <React.Fragment>
      <h1>Anonymous Recommendation landing page mate.</h1>
      <QuizComponent opciones={opc} pregunta="Soy la pregunta"></QuizComponent>
    </React.Fragment>
  )
}

export default AnonRecommendation;