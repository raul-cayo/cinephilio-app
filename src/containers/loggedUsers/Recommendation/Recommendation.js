import React from 'react';

import Navbar from '../../../components/Navbar/Navbar';
import QuizController from '../../../components/Quiz/QuizController';

function Recommendation(props) {
  return (
    <React.Fragment>
      <Navbar/>
      <QuizController anon={false} />
    </React.Fragment>
  )
}

export default Recommendation;