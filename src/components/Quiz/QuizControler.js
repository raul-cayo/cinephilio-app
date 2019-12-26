import React from 'react';

import QuizComponent from './QuizComponent';
import QuestionServer from './QuestionServer';

class QuizControler extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quiz: [],
      attrCount: {},
      profile: {},
      questionNumber: 0
    };
    this.selectAnswer = this.selectAnswer.bind(this)
  }

  getQuestionsRequest = () => {
    // Fake http request
    QuestionServer().then(questions => {
      this.setState({
        quiz: questions
      })
    })
  };

  setProfile = (data) => {
    let newProfile = { ...this.state.profile };
    let attrCount = { ...this.state.attrCount };
    Object.keys(data).forEach(function (key) {
      newProfile[key] = newProfile[key] ? newProfile[key] + data[key] : data[key];
      attrCount[key] = attrCount[key] ? attrCount[key] + 1 : 1;
    });

    this.setState({
      profile: newProfile,
      attrCount: attrCount
    });
  }

  selectAnswer(e) {
    this.setProfile(e);
    if (this.state.questionNumber + 1 < this.state.quiz.length) {
      this.setState({
        questionNumber: this.state.questionNumber + 1
      });
    }
    else {
      let finalProfile = { ...this.state.profile };
      let finalAttrCount = { ...this.state.attrCount };
      Object.keys(finalAttrCount).forEach((key) => {
        finalProfile[key] = Math.round(finalProfile[key] / finalAttrCount[key])
      });
      this.setState({
        questionNumber: this.state.questionNumber + 1,
        profile: finalProfile
      });
    }

  }

  componentDidMount() {
    // TODO add settimeout
    this.getQuestionsRequest();
  }

  render() {
    let currentQuestion = this.state.quiz[this.state.questionNumber];
    return (
      <div>
        { // Quiz
          this.state.quiz.length > 0 && this.state.questionNumber < 7 &&
          <QuizComponent 
            selectAnswer={this.selectAnswer} 
            question={currentQuestion.text} 
            options={currentQuestion.answers}
            number={this.state.questionNumber + 1}
          />
        }
        { // Quiz results
          this.state.questionNumber === 7 &&
          <React.Fragment>
            <h2>Los resultados son</h2>
            {Object.keys(this.state.profile).map(llave => {
              return <div>
                <p>
                  {llave + ": " + this.state.profile[llave]}
                </p>
              </div>
            })}
          </React.Fragment>
          }
      </div>
    )
  }
}

export default QuizControler