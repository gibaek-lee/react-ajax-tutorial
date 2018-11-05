import React from 'react';
import './Warning.css';

const Warning = ({styles, warning}) => {
  if(!warning) return null;
  return (
    <div className="Warning" style={styles}>
      Prev post does not exist
    </div>
  )
}

export default Warning;
