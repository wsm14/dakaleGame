import React, { useState } from 'react';
import Mask from '@/components/mask';

import './index.less';
export default (props) => {
  const { show, onClose, val = {}, beanSign, shareSign } = props;
  const { type, data } = val;
  const { fillSignBean = 0 } = data;
  const template = {
    success: (
      <div className="signature_success_box">
        <div className="signature_success_title">签到成功</div>
        <div className="signature_success_desc">呀！你怎么缺勤了呢？快补签一下吧</div>
      </div>
    ),
    fail: (
      <div className="signature_fail_box">
        <div className="signature_fail_title">呜呜，等你好久了， 下次可不许缺勤哦～</div>
        <div className="signature_fail_desc">请选择补签方式</div>
        <div className="signature_fail_collect">
          <div className="signature_fail_collectLeft" onClick={() => beanSign(data)}>
            <div className="signature_fail_beanIcon"></div>
            <div className="signature_fail_beanCount">{fillSignBean}卡豆补签</div>
          </div>
          <div className="signature_fail_collectRight" onClick={() => shareSign(data)}>
            <div className="signature_fail_fourIcon"></div>
            <div className="signature_fail_beanCount">找好友帮忙</div>
          </div>
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
