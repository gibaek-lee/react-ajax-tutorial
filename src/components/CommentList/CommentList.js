import React from 'react';
import './CommentList.css';
import { Comment } from '../';

const CommentList = ({comments}) => {
  const mapComments = comments.map(
    (comment, index) => (
      <Comment
        name={comment.email.split('@')[0]}
        body={comment.body}
        key={index}
      />
    )
  );

  return (
    <ul className="CommentList">
      {mapComments}
    </ul>
  )
}

export default CommentList;
