import React, { useRef, useEffect, useState } from 'react';
import './index.less';
import { history } from 'umi';
import { closeAnimate, hideTitle } from '@/utils/birdgeContent';

import hand from '@public/image/hand.png';
import ReportIcon from '../report/components/ReportIcon';

function index() {
  const [audioFlag, setAudioFlag] = useState(false);
  useEffect(() => {
    closeAnimate();
    hideTitle();
  }, []);
  const begainReport = () => {
    history.push('/report');
    setAudioFlag(!audioFlag);
  };
  return (
    <div className="homePage">
      <ReportIcon audioFlag={audioFlag} setAudioFlag={setAudioFlag}></ReportIcon>
      <div className="clickArea" onClick={begainReport}></div>
      <div className="clickHand">
        <img src={hand} alt="" />
      </div>
    </div>
  );
}

export default index;
