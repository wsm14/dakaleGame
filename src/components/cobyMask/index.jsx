import React, { useState } from 'react';
import { Toast } from 'antd-mobile';
import Mask from '@/components/mask';
import { openWx, nativeShareSign, nativeShareWork, nativeShareBlind } from '@/utils/birdgeContent';
import './index.less';
export default (props) => {
  const { onClose, show, type, data = {} } = props;
  const { value } = data;
  const btnType = {
    sign: nativeShareSign,
    nativeShareWork: nativeShareWork,
    nativeShareBlind: nativeShareBlind,
  }[type];
  return (
    <Mask show={show} onClose={onClose}>
      <div className="cobyMask_box">
        <div className="cobyMask_height"></div>
        <div className="cobyMask_icon"></div>
        <div className="cobyMask_desc">将口令复制给微信好友，好友打开app识别口令即可{type==='sign'?'补签':'助力'}成功</div>
        <div className="cobyMask_btn">
          <div
            className="cobyMask_btn_left"
            onClick={() => {
              openWx();
              onClose();
            }}
          >
            去微信粘贴
          </div>
          <div
            className="cobyMask_btn_right"
            onClick={() => {
              btnType && btnType(value);
              onClose();
            }}
          >
            直接分享
          </div>
        </div>
      </div>
    </Mask>
  );
};
