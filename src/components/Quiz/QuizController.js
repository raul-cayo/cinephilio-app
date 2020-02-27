import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import QuizQuestions from './QuizQuestions';
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
    let data = { questions_id: [] }; // TODO update and send questions done by user
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
  };

  getResultRequest(profile, moviesSeen = []) {
    let data = {
      profile: [
        profile.complexity,
        profile.education,
        profile.originality,
        profile.production,
        profile.realism,
        profile.tension,
        profile.violence
      ],
      movies_seen: moviesSeen
    }

    axios.post('https://cinephilio-engine.herokuapp.com/recommendation',
      JSON.stringify(data),
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then((res) => {
        this.setState({
          questionNumber: 99,
          recommendation: {
            movie_id: res.data.recommendation[0].movie_id,
            poster_path: res.data.recommendation[0].poster_path,
            title: res.data.recommendation[0].title,
            release_date: res.data.recommendation[0].release_date
          },
          isLoading: false
        });
      }
    )
    .catch((err) => { console.log(err); });
  }

  getCurrentProfileRequest() {
    this.setState({ isLoading: true });

    setTimeout(() => {
      if (this.props.anon) {
        this.getResultRequest(this.state.profile);
      }
      else {
        console.log(this.state.profile);
        axios.put('https://cinephilio-api.herokuapp.com/profile',
          JSON.stringify(this.state.profile),
          { headers: { 
            'Authorization': 'Bearer ' + window.localStorage.getItem('access_token'),
            'Content-Type': 'application/json'
          }}
        )
        .then((res) => {
          if (res.status === 200) {
            let currentProfile = res.data;

            axios.get('https://cinephilio-api.herokuapp.com/movies-seen',
              {headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('access_token')}}
            )
            .then((res) => {
              let moviesSeenList = [];

              res.data.movies_seen.forEach(movie => {
                moviesSeenList.push(movie.movie_id);
              });

              this.getResultRequest(currentProfile, moviesSeenList);
            })
            .catch((err) => { console.log(err); });

          } else {
            console.log("Error getCurrentProfileRequest: " + res.status);
          }
        })
        .catch((err) => { console.log(err); });
      }
    }, 700);
  }

  selectAnswer(answer) {
    let newProfile = { ...this.state.profile };
    let newAttrCount = { ...this.state.attrCount };

    Object.keys(answer).forEach(function (key) {
      newProfile[key] = newProfile[key] ? newProfile[key] + answer[key] : answer[key];
      newAttrCount[key] = newAttrCount[key] ? newAttrCount[key] + 1 : 1;
    });

    if (this.state.questionNumber + 1 == this.state.quiz.length) {
      Object.keys(newAttrCount).forEach((key) => {
        newProfile[key] = Math.round(newProfile[key] / newAttrCount[key])
      });
    }

    this.setState({
      questionNumber: this.state.questionNumber + 1,
      profile: newProfile,
      attrCount: newAttrCount
    });
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
                onClick={this.getCurrentProfileRequest.bind(this)}
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

              {
                !this.props.anon &&
                <div className="row">
                  <Link className="btn cbt-blue btn-block py-3 mt-4 col-6" to="/home">
                    <i className="material-icons">thumb_up</i>
                  </Link>
                  <Link className="btn cbt-blue btn-block py-3 mt-4 col-6" to="/home">
                    <i className="material-icons">thumb_down</i>
                  </Link>
                </div>
              }
              {this.props.anon && <Link className="btn cbt-blue btn-block py-3 mt-4" to="/">Terminar</Link>}

            </div>
          </div>
        }
      </div>
    )
  }
}

export default QuizController;