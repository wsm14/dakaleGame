import React from 'react';
import './index.less';

import secretInfo1 from '@public/image/secretInfo1.png';
import secretInfo2 from '@public/image/secretInfo3.png';
import secretInfo3 from '@public/image/secretInfo3.png';

function index() {
  return (
    <div className="secretContent">
      <img src={secretInfo1} alt="" className="secretImg1" />
      <img src={secretInfo2} alt="" className="secretImg2" />
      <img src={secretInfo3} alt="" className="secretImg3" />
    </div>
  );
}

export default index;
