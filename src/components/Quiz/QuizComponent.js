import React from 'react'

import SpeechBalloon from '../SpeechBalloon/SpeechBalloon';

/*
  EXPECTED PROPS
    props.number | current question number
    props.question | string
    props.options | object array with answers path & profile
    props.selectAnswer | fucntion to handle the click on option
*/
const QuizComponent = (props) => {
  return (
    <div className="col-10 offset-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3">
      <SpeechBalloon>({props.number} / 7) {props.question}</SpeechBalloon>
      
      <div className="row">
        {props.options.map(({ picture_path, profile }, i) => {
          return (
            <div key={i} className="col-10 offset-1 offset-md-0 col-md-6 p-0">
              <button
                className="m-1 m-md-2"
                onClick={() => { props.selectAnswer(profile) }}
                style={{ backgroundColor: "Transparent", border: "2px solid white", padding: "0" }}>
                <img
                  className="img-fluid"
                  alt={picture_path}
                  style={{ maxWidth: "100%" }}
                  src={'/questions/' + picture_path}
                />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default QuizComponent;