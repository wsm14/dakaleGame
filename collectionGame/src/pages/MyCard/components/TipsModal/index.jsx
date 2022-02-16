import React, { useState } from 'react';
import BasicModal from '@/components/BasicModal';
import SuccessModal from '../SuccessModal';
import card0 from '@public/image/card0.png';

import './index.less';

function index(props) {
  const { visible, onClose } = props;
  const [exchangeVisible, setExchangeVisible] = useState(false);
  const modalProps = {
    visible: visible,
    onClose,
    opacity: 0.8,
  };
  return (
    <>
      <BasicModal modalProps={{ ...modalProps }}>
        <div className="TipsModal_content">
          <div className="TipsModal_title">温馨提示</div>
          <div className="TipsModal_info">确定要兑换吗</div>
          <div className="TipsModal_image">
            <img src={card0} alt="" />
          </div>
          <div
            className="TipsModal_button"
            onClick={() => {
              onClose();
              setExchangeVisible(true);
            }}
          >
            立即兑换
          </div>
        </div>
      </BasicModal>

      {/* 兑换弹窗 */}
      <SuccessModal
        visible={exchangeVisible}
        onClose={() => {
          setExchangeVisible(false);
        }}
      ></SuccessModal>
    </>
  );
}

export default index;
