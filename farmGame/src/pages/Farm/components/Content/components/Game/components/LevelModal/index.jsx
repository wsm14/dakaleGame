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
      <div className="levelModal_title">
        果树升级啦
        <br />
        离免费领果实越来越近 加油
      </div>
      <div className="levelModal_content levelModal_bg0">
        <div className="levelModal_level">当前1级，达到15级免费获得</div>
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
        <div className="levelModal_button">继续施肥</div>
      </div>
    </BasicModal>
  );
};

export default index;
