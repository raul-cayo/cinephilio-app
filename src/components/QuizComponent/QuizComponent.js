import React from 'react'

/*  Este componente recibe como parámetro 3 cosas
    1. Una función del padre para activar el evento "onClick"
    2. La pregunta
    3. Las opciones

    Dado que las opciones contienen una llave llamada "profile" es lo que se devuelve por parámetro
    cuando es elegida una de las imágenes   */

const QuizComponent = (props) => {
    return (
        <div className="text-center">
            <h3>{props.pregunta}</h3>
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    {props.opc.map(({picture_path,profile}, i) =>{
                        return (
                            <div key={i} className="col-md-5">
                                <button onClick={() => {props.handleClic(profile)}} style={{marginBottom:"0.5rem", backgroundColor:"Transparent", border:"none"}}>
                                    <img alt={picture_path} style={{width: "18rem"}} src={'/questions/' + picture_path}/>
                               </button>    
                            </div>
                        )
                    } )}
                </div>
            </div>
        </div>
    )
}

export default QuizComponent;