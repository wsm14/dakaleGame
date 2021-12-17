import React from 'react';
import './index.less';
import { history } from 'umi';
import backImg from '@public/back.png';
import { linkToMyGoods, nativeClose } from '@/utils/birdgeContent';

function index() {
  const goBack = () => {
    nativeClose();
  };
  return (
    <div className="topRules">
      <img src={backImg} alt="" className="backImg" onClick={goBack} />
      <div className="topButton">
        <div
          className="topButton_rule"
          onClick={() => {
            window.location.href =
              'https://resource-new.dakale.net/dev/html/active/648822c6-8699-4925-7258-815987283a3a.html?newPage=true';
          }}
        >
          规则
        </div>
        <div className="topButton_line"></div>
        <div className="topButton_record" onClick={linkToMyGoods}>
          记录
        </div>
      </div>
    </div>
  );
}

export default index;
