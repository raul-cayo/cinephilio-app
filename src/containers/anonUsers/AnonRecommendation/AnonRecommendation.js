import React from 'react';

import AnonNavbar from '../../../components/Navbar/AnonNavbar';
import QuizControler from '../../../components/Quiz/QuizControler';


function AnonRecommendation(props) {

  return (
    <React.Fragment>
      <AnonNavbar/>
      <QuizControler/>
    </React.Fragment>
  )
}

export default AnonRecommendation;