import React from 'react'

import Logo from '../../images/LogoDark.png';

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
      <div className="row my-3 px-4">
        <div className="col-12 col-md-3">
          <img className="logo rounded-circle d-block mx-auto my-2" src={Logo} alt="Logo Cinephilio" />
        </div>
        <p className="my-auto text-box col-12 col-md-9 py-3">
          ({props.number} / 7) {props.question}
        </p>
      </div>
      <div className="row">
        {props.options.map(({ picture_path, profile }, i) => {
          return (
            <div key={i} className="col-md-6 p-0">
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
}

export default QuizComponent;