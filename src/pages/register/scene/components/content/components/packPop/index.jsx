import React, { useState } from 'react';
import Drawer from '@/components/drawer';
import './index.less';
export default (props) => {
  const { onClose } = props;
  return (
    <Drawer {...props}>
      <div className="checkPop_pack_box">
        <div className="checkPop_pack_topIcon"></div>
        <div
          className="checkPop_pack_close"
          onClick={() => {
            onClose();
          }}
        ></div>
        <div className="checkPop_pack_title">装扮</div>
        <div className="checkPop_pack_content">
          <div className="checkPop_pack_default">
            <div className="checkPop_pack_checked"></div>
            <div className="checkPop_pack_bean"></div>
            <div className="checkPop_pack_desc">默认形象</div>
          </div>
          <div className="checkPop_pack_cloth"> </div>
          <div className="checkPop_pack_cloth"> </div>
        </div>
      </div>
    </Drawer>
  );
};
