import React, {useState} from 'react';

export default (props) => {
  const [espera, setEspera] = useState(false)
  const [added, setAdded] = useState(false)

  function newMovie(liked){
    setAdded(!added);
    props.addNewMovie(liked,props.movieId);
  }

  return (
    <li className="list-group-item d-flex justify-content-between">
      <div>{props.title} ({props.year})</div>
      <div className="seen-actions flex-shrink-0">
        {!espera && <i onClick={() => {setEspera(!espera)}} className="material-icons mx-2">add_circle</i>}
        {!added && espera && 
        <React.Fragment>
          <label className="movie-liked-text">¿Te gustó?</label>
          <i onClick={() => {newMovie(true)}} className="material-icons mx-2">thumb_up</i>
          <i onClick={() => {newMovie(false)}} className="material-icons mx-2">thumb_down</i>
          <i onClick={() => {setEspera(!espera)}} className="material-icons trash">cancel</i>
        </React.Fragment>}
        {added && 
        <React.Fragment>
          <label className="movie-added-text">Película añadida</label>
        </React.Fragment>}
      </div>
    </li>
    )
}