import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import QuizQuestions from './QuizQuestions';
import QuestionServer from './QuestionServer';
import SpeechBalloon from '../SpeechBalloon/SpeechBalloon';
import LoadingModal from '../LoadingModal/LoadingModal';
import './QuizController.css';

class QuizController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quiz: [],
      attrCount: {},
      profile: {},
      questionNumber: 0,
      isLoading: true,
      recommendation: {}
    };
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  getQuestionsRequest() {
    let data = { questions_id: [] };
    axios.post('https://cinephilio-engine.herokuapp.com/quiz',
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
      });

    // QuestionServer().then(questions => {
    //   this.setState({
    //     quiz: questions,
    //     isLoading: false
    //   });
    // });
  };

  getResultRequest(profile, moviesSeen = []) {
    // send profile and movies seen
    // get movie recommendation and change state

    console.log("profile");
    console.log(profile);
    console.log("movies seen");
    console.log(moviesSeen);

    this.setState({
      questionNumber: 99,
      recommendation: {
        movie_id: 339,
        poster_path: "/aREHjLD3kwQFcL1ncNOx8ggDGxA.jpg",
        title: "Night On Earth",
        release_date: "1991"
      },
      isLoading: false
    });
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
    this.setState({ isLoading: true });

    setTimeout(() => {
      if (this.props.anon) {
        this.getResultRequest(this.state.profile);
      }
      else {
        axios.get( // TODO change this method on the api to get all info needed an rename it profile
          'https://cinephilio-api.herokuapp.com/user-profile',
          { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('access_token') } }
        )
        .then((res) => {
          if (res.status === 200) {
            let currentProfile = res.data;
            delete currentProfile.user_id;
            console.log('hererere');
            this.getResultRequest(currentProfile, []);
          } else {
            console.log("Error getResult user profile: " + res.status);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }, 700);
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
        { // Get result
          this.state.questionNumber === 7 &&
          <div className="container">
            <div className="col-lg-10 offset-lg-1 mt-4">
              <SpeechBalloon>Mmm... creo conocer una película que te va a gustar.</SpeechBalloon>
              <button 
                className="btn cbt-blue btn-block py-3 mt-4"
                onClick={this.getResult.bind(this)}
              >Ver recomendación</button>
            </div>
          </div>
        }
        { // Quiz result
          this.state.questionNumber === 99 &&
          <div className="container">
            <div className="col-lg-10 offset-lg-1 mt-4">
              <SpeechBalloon>Te recomiendo esta película.</SpeechBalloon>

              <div className="movie-display row mt-4">
                <div className="col-8 p-0">
                  <div className="movie-title p-2 pl-4">
                    {this.state.recommendation.title.toUpperCase()}
                  </div>
                  <div className="p-2 pl-4">
                    <p>{this.state.recommendation.release_date}</p>
                  </div>
                </div>
                <div className="col-4 p-0">
                  <img
                    className="img-fluid"
                    src={ "http://image.tmdb.org/t/p/w500/" + this.state.recommendation.poster_path}
                    alt="Movie Poster">
                  </img>
                </div>
              </div>

              {this.props.anon && <Link className="btn cbt-blue btn-block py-3 mt-4" to="/">Terminar</Link>}
              {!this.props.anon && <Link className="btn cbt-blue btn-block py-3 mt-4" to="/home">Terminar</Link>}

            </div>
          </div>
        }
      </div>
    )
  }
}

export default QuizController;