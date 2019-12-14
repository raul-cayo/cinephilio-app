import React from 'react'

const QuizComponent = (props) => {
    return (
        <div className="text-center">
            <img alt={props.imagenAlt} src={props.imagen}/>
            <h3>{props.pregunta}</h3>
            <div className="row">
                <div className="col-xs-6 col-xl-6 item">
                {props.opciones.map((imagen,i) => {
                        return <button key={i} onClick={console.log("0")}>
                                    <img style={{width: "18rem"}} src={imagen}/>
                               </button>
                    })}
                </div>
            </div>
        </div>
    )
}

export default QuizComponent;