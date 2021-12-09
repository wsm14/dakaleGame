import React from 'react';
import './index.less';
import backImg from '@public/back.png';

function index() {
  return (
    <div className="topRules">
      <img src={backImg} alt="" className="backImg" />
      <div className="topButton">
        <div className="topButton_rule">规则</div>
        <div className="topButton_line"></div>
        <div className="topButton_record">记录</div>
      </div>
    </div>
  );
}

export default index;
