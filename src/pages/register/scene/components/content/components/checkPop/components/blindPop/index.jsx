import React, { useState } from 'react';
import Mask from '@/components/mask';
import { backgroundObj, filterStrList } from '@/utils/utils';
import { linkToCoupon, linkToPrize, nativeOneVideo, linkToShopActive } from '@/utils/birdgeContent';
import './index.less';
export default (props) => {
  const { show, onClose, type, data } = props;
  const templateTitle = {
    success: '连签大礼包领取成功',
    fail: '连签大礼包',
  }[type];
  const { giftBean, giftContent } = data;
  const templateContent = {
    success: (
      <div>
        <div className="blindPop_profile blindPop_bean"></div>
        <div className="blindPop_name">{giftBean}卡豆</div>
      </div>
    ),
    fail: (
      <div>
        <div className="blindPop_profile blindPop_bean"></div>
        <div className="blindPop_name">{giftBean}卡豆</div>
      </div>
    ),
  }[type];
  const templateBtn = {
    success: (
      <div
        className="blindPop_sign_btn"
        onClick={() => {
          onClose();
        }}
      >
        知道了
      </div>
    ),
    fail: (
      <div
        className="blindPop_sign_btn"
        onClick={() => {
          onClose();
        }}
      >
        去签到
      </div>
    ),
  }[type];
  const templateDesc = {
    success: (
      <>
        <div className="blindPop_sign_desc">额外惊喜</div>
        <div className="blindPop_sign_desc">{giftContent}</div>
      </>
    ),
    fail: (
      <div className="blindPop_sign_desc">
        连签7天可获得卡豆大礼包，并有机会 额外获得营销游戏道具
      </div>
    ),
  }[type];
  return (
    <Mask show={show} onClose={onClose}>
      <div className="blindPop_box">
        <div className="blind_boxTop">
          <div className="blind_toast_font">{templateTitle}</div>
        </div>
        <div className="blindPop_content">
          {templateContent}
          {templateDesc}
          {templateBtn}
        </div>
      </div>
    </Mask>
  );
};
