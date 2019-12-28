import React from 'react';
import axios from 'axios';

import QuizQuestions from './QuizQuestions';
import QuestionServer from './QuestionServer';
import SpeechBalloon from '../SpeechBalloon/SpeechBalloon';
import LoadingModal from '../LoadingModal/LoadingModal';

class QuizController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quiz: [],
      attrCount: {},
      profile: {},
      questionNumber: 0,
      isLoading: true
    };
    this.selectAnswer = this.selectAnswer.bind(this)
  }

  getQuestionsRequest() {
    /*let data = { questions_id: [] };
    axios.get('https://cinephilio-engine.herokuapp.com/quiz',
      JSON.stringify(data),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then((res) => {
        if (res.status === 200) {
          this.setState({ quiz: res.data.quiz, isLoading: false });
        } else {
          console.log("Error loginRequest status: " + res.status);
          this.setState({ isLoading: false });
        }
      })
      .catch((err) => {
        console.log('catch: ' + err);
        this.setState({ isLoading: false });
      });*/

    QuestionServer().then(questions => {
      this.setState({
        quiz: questions,
        isLoading: false
      });
    });
  };

  getResultRequest() {
    console.log('Send profile and movies seen');
    console.log('Get movie recommendation');
  }

  setProfile(data) {
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
    console.log(e);
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

  getResult() {
    // this.getResultRequest();
    // change status
  }

  componentDidMount() {
    setTimeout(() => {
      this.getQuestionsRequest();
    }, 700);
  }

  render() {
    let currentQuestion = this.state.quiz[this.state.questionNumber];
    return (
      <div>
        { this.state.isLoading && <LoadingModal /> }
        { // Quiz questions
          this.state.quiz.length > 0 && this.state.questionNumber < 7 &&
          <QuizQuestions 
            selectAnswer={this.selectAnswer} 
            question={currentQuestion.text} 
            options={currentQuestion.answers}
            number={this.state.questionNumber + 1}
          />
        }
        { // Quiz result
          this.state.questionNumber === 7 &&
          <div className="container">
            <div className="col-lg-8 offset-lg-2">
              <SpeechBalloon>Mmm... Creo conocer una película que te va a gustar.</SpeechBalloon>
              <button className="btn cbt-blue btn-block py-3 mt-4">Ver recomendación</button>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default QuizController;