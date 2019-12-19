import React from 'react'

const QuizComponent = (props) => {
    return (
        <div className="text-center">
            <h3>{props.pregunta}</h3>
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    {props.opciones.map((imagen,i) =>{
                        return (
                            <div key={i} className="col-md-5">
                                <button style={{marginBottom:"0.5rem", backgroundColor:"Transparent", border:"none"}} onClick={() => console.log("0")}>
                                    <img style={{width: "18rem"}} src={imagen} alt={"Imagen"}/>
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