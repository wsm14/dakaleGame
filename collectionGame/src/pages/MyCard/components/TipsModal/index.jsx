import React, { useState } from 'react';
import BasicModal from '@/components/BasicModal';
import SuccessModal from '../SuccessModal';
import { fetchPreExchangeReward } from '@/services/game';

import './index.less';

function index(props) {
  const { visible, onClose, data, getCardDetail } = props;
  const [exchangeVisible, setExchangeVisible] = useState(false);
  const modalProps = {
    visible: visible,
    onClose,
    opacity: 0.8,
  };

  const exchangePre = async () => {
    const res = await fetchPreExchangeReward({
      identification: data.identification,
    });
    getCardDetail();
    if (res.success) {
      onClose();
      setExchangeVisible(true);
    }
  };
  return (
    <>
      <BasicModal modalProps={{ ...modalProps }}>
        <div className="TipsModal_content">
          <div className="TipsModal_title">温馨提示</div>
          <div className="TipsModal_info">确定要兑换吗</div>
          <div className="TipsModal_image">
            <img src={data.prizeImg} alt="" />
          </div>
          <div
            className="TipsModal_button"
            onClick={() => {
              exchangePre();
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
        data={data}
      ></SuccessModal>
    </>
  );
}

export default index;
