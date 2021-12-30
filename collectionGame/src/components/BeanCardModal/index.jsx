import React from 'react';
import { Mask } from 'antd-mobile';
import './index.less';

import closeImg from '@public/image/close.png';

function index() {
  return (
    <>
      <Mask visible={true}>
        <div className="cardModal">
          <div className="cardModal_accept">开心收下</div>
          <img src={closeImg} alt="" className="cardModal_closeImg" />
        </div>
      </Mask>
    </>
  );
}

export default index;
