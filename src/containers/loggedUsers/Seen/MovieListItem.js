import React from 'react';

export default (props) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <div>{props.title} ({props.year})</div>
      <div className="seen-actions flex-shrink-0">
        <i className="material-icons mx-2">thumb_up</i>
        <i className="material-icons mx-2">thumb_down</i>
        <i className="material-icons mx-2 trash">delete</i>
      </div>
    </li>
    )
}