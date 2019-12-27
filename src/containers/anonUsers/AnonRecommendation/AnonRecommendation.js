import React from 'react';

import AnonNavbar from '../../../components/Navbar/AnonNavbar';
import QuizController from '../../../components/Quiz/QuizController';


function AnonRecommendation(props) {

  return (
    <React.Fragment>
      <AnonNavbar/>
      <QuizController/>
    </React.Fragment>
  )
}

export default AnonRecommendation;