import React, {useState} from 'react';

export default (props) => {
  const [liked, setLiked] = useState(props.liked);
  const [deleting, setDeleting] = useState(false);
  function changeLike(estado){
    if(estado !== liked){
      setLiked(estado);
      props.stateChange(estado,props.movieId,false);
    }
    return;
  }

  return (
    <li className="list-group-item d-flex justify-content-between">
      <div>{props.title} ({props.year})</div>
      <div className="seen-actions flex-shrink-0">
        {!deleting && <React.Fragment>
          <i onClick={() => changeLike(true)} className="material-icons mx-2" style={liked ? {color:'#31E3CB'}:null}>thumb_up</i>
          <i onClick={() => changeLike(false)} className="material-icons mx-2" style={!liked ? {color:'#31E3CB'}:null}>thumb_down</i>
          <i onClick={() => setDeleting(true)} className="material-icons mx-2 trash">delete</i>
        </React.Fragment>}
        {deleting && <React.Fragment>
          <label className="movie-deleting-text">¿Estás seguro?</label>
          <i onClick={()=>props.stateChange(liked,props.movieId,true)} className="material-icons mx-2">check_circle</i>
          <i onClick={()=>setDeleting(false)} className="material-icons mx-2">cancel</i>
        </React.Fragment>}
      </div>
    </li>
    )
}