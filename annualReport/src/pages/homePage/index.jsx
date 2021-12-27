import React, { useRef, useEffect } from 'react';
import './index.less';
import { history } from 'umi';
import hand from '@public/image/hand.png';
import ReportIcon from '../report/components/ReportIcon';

function index() {
  return (
    <div className="homePage">
      <ReportIcon></ReportIcon>
      <div
        className="clickArea"
        onClick={() => {
          history.push('/report');
        }}
      ></div>
      <div className="clickHand">
        <img src={hand} alt="" />
      </div>
    </div>
  );
}

export default index;
