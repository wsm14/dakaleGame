import React, { memo } from 'react';
import { Toast } from 'antd-mobile';
import './index.less';
import { fetchTaskExchangeBalance } from '@/services/game';
import BasicModal from '@/components/BasicModal';

const index = memo((props) => {
  const { visible, onClose, getTaskList, getGameDetail } = props;
  const { show, receiveRule } = visible;
  const rule = (receiveRule && JSON.parse(receiveRule)) || {};

  const modalProps = {
    visible: show,
    onClose: onClose,
    opacity: 0.8,
  };

  //去兑换
  const exchange = async () => {
    const { strapId } = visible;
    const res = await fetchTaskExchangeBalance({
      strapId,
    });
    if (res.success) {
      Toast.show({
        content: '兑换成功',
      });
      getTaskList();
      getGameDetail();
      onClose();
    }
  };

  return (
    <>
      <BasicModal modalProps={{ ...modalProps }}>
        <div className="ExchangeModal_content">
          <div className="ExchangeModal_content_sign">温馨提示</div>
          <div className="ExchangeModal_content_title">
            确定要使用{rule.condition}卡豆兑换一次抽奖机会吗
          </div>
          <div className="ExchangeModal_doubleButton">
            <div
              className="ExchangeModal_content_button1"
              onClick={() => {
                exchange();
              }}
            >
              兑换
            </div>
            <div
              className="ExchangeModal_content_button"
              onClick={() => {
                onClose();
              }}
            >
              再想想
            </div>
          </div>
        </div>
      </BasicModal>
    </>
  );
});

export default index;
