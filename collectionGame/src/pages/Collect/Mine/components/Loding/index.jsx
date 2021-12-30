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
        <div className="loading_title">哒卡集福豆 赢2022一整年生活费</div>
      </div>
      <Cloud></Cloud>
    </div>
  );
}

export default index;
