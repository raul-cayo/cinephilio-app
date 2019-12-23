import React from 'react';

import QuizComponent from '../QuizComponent/QuizComponent';
import QuestionServer from '../QuestionServe/QuestionServer';

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
    /*  Este método nos sirve para ir creado el profile del usuario al momento de contestar
        un quiz. Guarda los datos de los valores por respuesta y las veces que una de las 
        clasificaciones ha aparecido para poder promediar al final  */
    let newProfile = { ...this.state.profile };
    let attrCount = { ...this.state.attrCount };
    Object.keys(data).forEach(function (key) {
      if (!(key in newProfile)) { //La llave no está en el objeto
        newProfile[key] = data[key];
      }
      else { // La llave sí está en el objeto
        newProfile[key] += data[key];
      }
      if (!(key in attrCount)) { //La llave no está en el objeto
        attrCount[key] = 1;
      }
      else { // La llave sí está en el objeto
        attrCount[key] += 1;
      }
    });

    this.setState({
      profile: newProfile,
      attrCount: attrCount
    });
  }

  selectAnswer(e) {
    /*  Este método controla el proceso de creación de profile, se activa cuando se presiona en 
        una de las imágenes de las optionsiones del quiz. Es un método propio de ésta clase pero es
        pasado por props al hijo. 
        
        Quizá desde aquí se pueda hacer el request para solicitar la película   */
    this.setProfile(e);
    if (this.state.questionNumber + 1 < this.state.quiz.length) {
      this.setState({
        questionNumber: this.state.questionNumber + 1
      })
      return
    }
    else {
      let finalProfile = { ...this.state.profile }
      let conteoAtributos = { ...this.state.attrCount }
      Object.keys(conteoAtributos).forEach((key) => {
        finalProfile[key] = Math.round(finalProfile[key] / conteoAtributos[key])
      })
      this.setState({
        questionNumber: this.state.questionNumber + 1,
        profile: finalProfile
      })
    }

  }

  componentDidMount() {
    // TODO add settimeout
    this.getQuestionsRequest()
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