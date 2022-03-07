import React, { useState } from 'react';
import Mask from '@/components/mask';

import './index.less';
export default (props) => {
  const { show, onClose, val = {}, fakeSign } = props;
  const { type, data } = val;
  const { fillBean = 0 } = data;
  const template = {
    card: (
      <div className="signature_success_box">
        <div className="signature_success_title">温馨提示</div>
        <div className="signature_success_desc">您是周卡会员，可免费补签1次</div>
        <div className="signature_success_btnBox">
          <div
            className="signature_success_btn"
            onClick={() => {
              onClose();
            }}
          >
            稍后补签
          </div>
          <div
            className="signature_success_btn"
            onClick={() => {
              fakeSign(data, '2');
            }}
          >
            确认补签
          </div>
        </div>
      </div>
    ),
    bean: (
      <div className="signature_success_box">
        <div className="signature_success_title">温馨提示</div>
        <div className="signature_success_desc">将使用{fillBean}卡豆进行补签</div>
        <div
          className="signature_bean_btnBox"
          onClick={() => {
            fakeSign(data, '0');
          }}
        >
          确认补签
        </div>
      </div>
    ),
  }[type];
  return (
    <Mask show={show} onClose={onClose}>
      {template}
    </Mask>
  );
};
