import React, { useState } from 'react';
import { Toast } from 'antd-mobile';
import Mask from '@/components/mask';
import './index.less';
export default (props) => {
  const { onClose, show } = props;
 
  return (
    <Mask show={show} onClose={onClose}>
      <div className="cobyMask_box">
        <div className="cobyMask_height"></div>
        <div className="cobyMask_icon"></div>
        <div className="cobyMask_desc">将口令复制给微信好友，好友打开app识别口令即可补签成功</div>
        <div className="cobyMask_btn">
          <div className="cobyMask_btn_left" onClick={() => {}}>
            去微信粘贴
          </div>
          <div className="cobyMask_btn_right">直接分享</div>
        </div>
      </div>
    </Mask>
  );
};
