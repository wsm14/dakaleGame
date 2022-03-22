import React from 'react';
import Cloud from '@/components/Cloud';
import './index.less';

function index({ state, imgList = [] }) {
  return (
    <div className="loding">
      <div className="loading_bottom">
        <div className="loading_progress">
          <div
            className="progress_content"
            style={{ width: `${(state / imgList.length) * 100}%` }}
          ></div>
        </div>
        <div className="loading_title">哒卡集碎片，好运来来来</div>
      </div>
      {/* <Cloud></Cloud> */}
    </div>
  );
}

export default index;
