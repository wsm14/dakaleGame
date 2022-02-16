import React from 'react';
import BasicModal from '@/components/BasicModal';
import card0 from '@public/image/card0.png';

import './index.less';

function index(props) {
  const { visible, onClose } = props;
  const modalProps = {
    visible: visible,
    onClose,
    opacity: 0.8,
  };
  return (
    <BasicModal modalProps={{ ...modalProps }}>
      <div className="SuccessModal_content">
        <div className="SuccessModal_title">恭喜您兑换成功</div>
        <div className="SuccessModal_info">确定要兑换吗</div>
        <div className="SuccessModal_image">
          <img src={card0} alt="" />
        </div>
        <div className="SuccessModal_tips">仅差一步就可拿到奖励</div>
        <div className="SuccessModal_bottom">
          <div className="SuccessModal_button" onClick={() => {}}>
            看视频
          </div>
          <div className="SuccessModal_button" onClick={() => {}}>
            好友助力
          </div>
        </div>
      </div>
    </BasicModal>
  );
}

export default index;
