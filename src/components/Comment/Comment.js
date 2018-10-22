import React from 'react';
import './Comment.css';

const Comment = ({name, body, index}) => (
  <li className="Comment">
    <p>
      <b>{name}</b> {body}
    </p>
  </li>
)

export default Comment;
