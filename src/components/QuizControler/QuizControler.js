import React from 'react'
import QuizComponent from '../QuizComponent/QuizComponent'
import QuestionServer from '../QuestionServe/QuestionServer'

class QuizControler extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            questionBank: [],
            contadorAtributos: {},
            perfil: {},
            noPregunta: 0
        };
        this.handleClic = this.handleClic.bind(this)
    }
    
    getQuestions = () =>{
        /*  Este método tiene una función dummy, solamente sirve para emular el llamado HTTP al API y tener
            las preguntas necesarias con su contenido   */
        QuestionServer().then(question => {
            this.setState({
                questionBank: question
            })
        })
    }

    setProfile= (data) =>{
        /*  Este método nos sirve para ir creado el perfil del usuario al momento de contestar
            un quiz. Guarda los datos de los valores por respuesta y las veces que una de las 
            clasificaciones ha aparecido para poder promediar al final  */
        let perfilado = {...this.state.perfil}
        let contadorAtributos= {...this.state.contadorAtributos}
        Object.keys(data).forEach(function(key){
            //console.log(key, data[key])
            if( !(key in perfilado)){ //La llave no está en el objeto
                perfilado[key] = data[key]
            }
            else{ // La llave sí está en el objeto
                perfilado[key] += data[key]
            }
            if( !(key in contadorAtributos)){ //La llave no está en el objeto
                contadorAtributos[key] = 1
            }
            else{ // La llave sí está en el objeto
                contadorAtributos[key] += 1
            }
        })
        this.setState({
            perfil: perfilado,
            contadorAtributos
        })
    }

    handleClic(e){ 
        /*  Este método controla el proceso de creación de perfil, se activa cuando se presiona en 
            una de las imágenes de las opciones del quiz. Es un método propio de ésta clase pero es
            pasado por props al hijo. 
            
            Quizá desde aquí se pueda hacer el request para solicitar la película   */
        this.setProfile(e)
        if(this.state.noPregunta+1 < this.state.questionBank.length){
            this.setState({
                noPregunta: this.state.noPregunta+1
            })
            return
        }
        else{
            let perfilFinal = {...this.state.perfil}
            let conteoAtributos = {...this.state.contadorAtributos}
            Object.keys(conteoAtributos).forEach((key)=>{
                perfilFinal[key] = Math.round(perfilFinal[key]/conteoAtributos[key])
            })
            this.setState({
                noPregunta: this.state.noPregunta+1,
                perfil: perfilFinal
            })
        }
        
    }

    componentDidMount(){
        this.getQuestions()
    }
    render(){
        let preguntaActual = this.state.questionBank[this.state.noPregunta]
        return(
            <div>
                {/* Lo que recién se encuentra debajo de este comentario es necesario que se quede
                    lo más parecido a como se encuentra ya que usa la función de corto circuito para
                    mostrar y dejar de mostrar algo al usuario basandose en 2 cosas:
                    1. Ya haya algo en el banco de preguntas
                    2. El contador de preguntas sea menor a 7   */}
                {this.state.questionBank.length > 0 && this.state.noPregunta < 7 && 
                <React.Fragment>
                   <QuizComponent handleClic={this.handleClic} pregunta={preguntaActual.text} opc={preguntaActual.answers}/>
                </React.Fragment>}
                {/* Lo que se encuentra debajo es meramente informativo, es descartable */}
                {this.state.noPregunta === 7 && 
                <React.Fragment>
                    <h2>Los resultados son</h2>
                    {Object.keys(this.state.perfil).map(llave =>{
                        return <div>
                            <p>
                                {llave + ": " + this.state.perfil[llave]}
                            </p>
                        </div>
                    })}
                </React.Fragment>}
            </div>
        )
    }
}

export default QuizControler