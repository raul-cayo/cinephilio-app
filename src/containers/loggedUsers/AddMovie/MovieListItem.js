import React, {useState} from 'react';

export default (props) => {
  const [espera, setEspera] = useState(false)
  return (
    <li className="list-group-item d-flex justify-content-between">
      <div>{props.title} ({props.year})</div>
      <div className="seen-actions flex-shrink-0">
        {!espera && <i onClick={() => {setEspera(!espera)}} className="material-icons mx-2">add_circle</i>}
        {espera && 
        <React.Fragment>
          <label className="movie-liked-text">¿Te gustó?</label>
          <i className="material-icons mx-2">thumb_up</i>
          <i className="material-icons mx-2">thumb_down</i>
          <i onClick={() => {setEspera(!espera)}} className="material-icons">cancel</i>
        </React.Fragment>}
      </div>
    </li>
    )
}