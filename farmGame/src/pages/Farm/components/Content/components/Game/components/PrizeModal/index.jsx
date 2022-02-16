import React from 'react';
import BasicModal from '@/components/BasicModal';
import './index.less';

const index = () => {
  const modalProps = {
    visible: true,
    onClose: () => {},
  };
  return (
    <BasicModal modalProps={modalProps}>
      <div className="prizeModal_title">距离领取奖品又进一步啦</div>
      <div className="prizeModal_content">
        <div className="prizeModal_goodsImg"></div>
        <div className="prizeModal_goodsName">橙子一箱</div>
        <div className="prizeModal_level">当前1级，达到15级免费获得</div>
        <div className="prizeProgress">
          <div className="prizeProgress_line"></div>
          <div className="prizeProgress_circle">
            <div className="prizeProgress_item"></div>
            <div className="prizeProgress_item"></div>
            <div className="prizeProgress_img"></div>
          </div>
        </div>
        <div className="prizeProgress_level">
          <div>1级</div>
          <div>5级</div>
          <div>10级</div>
          <div>15级</div>
        </div>
        <div className="prizeModal_button">继续施肥</div>
      </div>
    </BasicModal>
  );
};

export default index;
