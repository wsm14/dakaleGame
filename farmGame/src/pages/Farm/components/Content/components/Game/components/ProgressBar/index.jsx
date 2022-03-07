import React from 'react';
import './index.less';
const index = ({ data = {} }) => {
  return (
    <div className="ProgressBar">
      <div className="ProgressBar_bac">
        <div
          className="ProgressBar_line"
          style={{ width: `${(data.gameProgress / data.currentLevelLimit).toFixed(2) * 100}%` }}
        ></div>
      </div>
      <div className="ProgressBar_tips">
        {data.status === '1'
          ? `再施肥${data.currentLevelLimit - data.gameProgress}次可升级（
        ${data.gameLevel}/15级）`
          : '你已满足领取条件'}
      </div>
    </div>
  );
};

export default index;
