import React from 'react';
import { forwardRef } from 'react';
import './index.less';

import poster from '@public/image/poster.png';

const index = forwardRef((props, ref) => {
  const { gameDetail, shareImg } = props;
  const { userInfo = {} } = gameDetail;
  return (
    <div className="posterBox" ref={ref}>
      <img src={poster} alt="" className="posterBox_topImg" />
      <div className="posterBox_float">
        <img
          src={`${userInfo?.profile}?_=${Date.now()}`}
          alt=""
          className="posterBox_headImg"
          crossOrigin="anonymous"
        />
        <div className="posterBox_nickName">{userInfo?.username}</div>
        <img
          src={`${shareImg}?_=${Date.now()}`}
          alt=""
          className="posterBox_qcode"
          crossOrigin="anonymous"
        />
      </div>
    </div>
  );
});

export default index;
