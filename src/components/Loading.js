import React from 'react';
import gif from '../images/loading.gif';

function Loading() {
  return (
    <div id="loading">
      <img src={gif} alt="loading" width="4%" />
    </div>
  )
}

export default Loading