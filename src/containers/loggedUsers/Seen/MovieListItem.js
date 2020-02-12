import React, {useState} from 'react';

export default (props) => {
  const [liked, setLiked] = useState(props.liked)

  function changeLike(estado){
    if(estado !== liked){
      setLiked(estado)
      props.likeChange(estado,props.movieId,false)
    }
    return
  }

  return (
    <li className="list-group-item d-flex justify-content-between">
      <div>{props.title} ({props.year})</div>
      <div className="seen-actions flex-shrink-0">
        <i onClick={() => changeLike(true)} className="material-icons mx-2" style={liked ? {color:'#31E3CB'}:null}>thumb_up</i>
        <i onClick={() => changeLike(false)} className="material-icons mx-2" style={!liked ? {color:'#31E3CB'}:null}>thumb_down</i>
        <i className="material-icons mx-2 trash">delete</i>
      </div>
    </li>
    )
}