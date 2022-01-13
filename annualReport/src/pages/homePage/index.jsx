import React, { useEffect, useState } from 'react';
import './index.less';
import { history } from 'umi';
import { Toast } from 'antd-mobile';
import { closeAnimate } from '@/utils/birdgeContent';

import hand from '@public/image/hand.png';
import circle from '@public/image/circle.png';
import circle1 from '@public/image/circle1.png';

function index() {
  const [state, setState] = useState(false);
  useEffect(() => {
    closeAnimate();
  }, []);
  const begainReport = () => {
    if (!state) {
      Toast.show({
        content: '请勾选协议',
      });
      return;
    }
    history.push('/report');
  };
  return (
    <div className="homePage">
      <div className="clickArea" onClick={begainReport}></div>
      <div className="clickHand">
        <img src={hand} alt="" />
      </div>
      <div className="agree">
        <img
          src={state ? circle : circle1}
          alt=""
          onClick={() => {
            setState(!state);
          }}
        />
        <div className="agree-center">请授权哒卡乐读取您的年度报告</div>
        <div
          className="agree-content"
          onClick={() => {
            window.location.href =
              'https://web-new.dakale.net/product/page/policy/conceal.html?newPage=true&&showTitle=true';
          }}
        >
          《隐私协议》
        </div>
      </div>
    </div>
  );
}

export default index;
