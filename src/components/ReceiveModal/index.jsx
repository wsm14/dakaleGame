import React, { useState, useEffect } from 'react';
import './index.less';
import { Mask } from 'antd-mobile';
import { useSelector } from 'umi';
import BasicModal from '@/components/BasicModal';
import { fetchFreeGoodReceiveGameReward } from '@/services/game';
import { Toast } from 'antd-mobile';

function index(props) {
  const { getHomeDetail } = props;
  const [visible, setVisible] = useState(false);

  const { homeDetail } = useSelector((state) => state.receiveGoods);
  const { gameInfo = {} } = homeDetail;
  const { freeGoodInfo = {}, receiveStatus, receiveCount, totalCount, processId } = gameInfo;

  useEffect(() => {
    console.log();
    if (receiveStatus == 1) {
      setVisible(true);
    }
  }, [receiveStatus]);

  const confirmReceive = async () => {
    const ress = await fetchFreeGoodReceiveGameReward({
      gameProcessId: processId,
      packageId: freeGoodInfo.packageId,
    });
    if (ress.resultCode == 1) {
      Toast.show({
        content: '领取成功',
        afterClose: () => {
          setVisible(false);
          getHomeDetail();
        },
      });
    }
  };

  const modalProps = {
    visible,
    onClose: () => {
      setVisible(false);
    },
    opacity: 1,
  };

  return (
    <>
      <BasicModal modalProps={{ ...modalProps }}>
        <div className="receiveModal_content">
          <div className="receiveModal_content_title">感谢您第{receiveCount}次领取成功</div>
          <div className="receiveModal_content_img">
            <img src={freeGoodInfo.packageImg} alt="" />
          </div>
          <div className="receiveModal_content_goodsName">{freeGoodInfo.packageName}</div>
          <div className="receiveModal_content_gift">哒卡乐已累计送出 {totalCount} 份礼品</div>
          <div className="receiveModal_content_receive" onClick={confirmReceive}>
            确认领取
          </div>
        </div>
      </BasicModal>
    </>
  );
}

export default index;
