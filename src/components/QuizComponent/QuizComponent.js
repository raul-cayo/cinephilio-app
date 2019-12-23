import React from 'react'

const QuizComponent = (props) => {
  return (
    <div className="text-center">
      <h3>{props.question}</h3>
      <h3>{props.number}/7</h3>
      <div className="col-10 offset-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3">
        <div className="row">
          {props.options.map(({ picture_path, profile }, i) => {
            return (
              <div key={i} className="col-md-6">
                <button 
                  onClick={() => { props.selectAnswer(profile) }} 
                  style={{ marginBottom: "2rem", backgroundColor: "Transparent", border: "2px solid white", padding: "0"}}>
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
    </div>
  )
}

export default QuizComponent;