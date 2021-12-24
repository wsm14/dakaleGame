import React from 'react';
import './index.less';

function index({ state, imgList = [] }) {
  return (
    <div className="loding">
      <div className="progress">
        <div
          className="progress_content"
          style={{ width: `${(state / imgList.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

export default index;
