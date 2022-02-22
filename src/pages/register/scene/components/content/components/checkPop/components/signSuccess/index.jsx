import React, { useState, useEffect } from 'react';
import Mask from '@/components/mask';
import { linkTo } from '@/utils/birdgeContent';
import './index.less';
export default (props) => {
  const { tomorrowBean, onClose } = props;
  return (
    <Mask {...props}>
      <div className="imper_mask_box">
        <div className="imper_mask_top"></div>
        <div className="imper_mask_icon"></div>
        <div className="imper_mask_title">恭喜签到成功获得</div>
        <div className="imper_mask_bean">{tomorrowBean}卡豆</div>
        <div
          onClick={() => {
            linkTo({
              wechat: {
                url: `/pages/share/ImperVideo/index`,
              },
            });
            onClose && onClose();
          }}
          className="kol_imper_btnBox"
        >
          再领最高60卡豆
        </div>
      </div>
    </Mask>
  );
};
