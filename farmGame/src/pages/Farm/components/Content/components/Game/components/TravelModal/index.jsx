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
      <div className="TravelModal_title">
        果树升级啦
        <br />
        离免费领果实越来越近 加油
      </div>
      <div className="TravelModal_content TravelModal_bg0">
        <div className="TravelModal_title">卡豆*10</div>
        <div className="TravelModal_bottom">
          <div className="TravelModal_button TravelModal_buttonStyle">立即收下</div>
          <div className="TravelModal_button TravelModal_buttonStyle1">看视频X2倍</div>
        </div>
      </div>
    </BasicModal>
  );
};

export default index;
