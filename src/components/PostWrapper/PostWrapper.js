import React from 'react';
import './PostWrapper.css';

const PostWrapper = ({ children }) => (//여러 하위 components를 감싸주어서 하나의 css로 관리하는 역할
  <div className="PostWrapper">
    {children}
  </div>
)

export default PostWrapper;
