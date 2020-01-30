import React from 'react';

export default (props) => {
  return (
    <li class="list-group-item d-flex justify-content-between">
      <div>{props.title} ({props.year})</div>
      <div class="seen-actions flex-shrink-0">
        <i class="material-icons mx-2">add_circle</i>
      </div>
    </li>
    )
}