import React from 'react';
import './index.less';
const index = () => {
  return (
    <div className="ProgressBar">
      <div className="ProgressBar_bac">
        <div className="ProgressBar_line"></div>
      </div>
      <div className="ProgressBar_tips">再施肥10次可升级（1/5级）</div>
    </div>
  );
};

export default index;
