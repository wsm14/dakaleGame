import React from 'react';
import './index.less';
import loadingTop from '@public/usual/loadingTop.png';

function index({ state, imgList = [] }) {
  return (
    <div className="loding">
      <div className="loadingTop">
        <img src={loadingTop} alt="" />
      </div>
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
