import React from 'react';
import BasicModal from '@/components/BasicModal';
import { openWx } from '@/utils/birdgeContent';
import { cobyInfo } from '@/utils/utils';
import { fetchCommandGetCommand, fetchExchangeReward } from '@/services/game';
import { deviceName, linkTo, nativeOneVideo } from '@/utils/birdgeContent';

import './index.less';

function index(props) {
  const { visible, onClose, data = {} } = props;
  const modalProps = {
    visible: visible,
    onClose,
    opacity: 0.8,
  };
  const copyCode = async () => {
    if (deviceName() == 'miniProgram') {
      onClose();
      linkTo({
        wechat: {
          url: `/pages/share/shareSign/index?userType=help&shareId=${data.identification}`,
        },
      });
    } else {
      const res = await fetchCommandGetCommand({
        commandType: 'gatherExchangeHelp',
        relateId: data.identification,
      });
      if (res.success) {
        const { command } = res.content;
        cobyInfo(command, {}, (val) => {
          openWx();
          onClose();
        });
      }
    }
  };

  const watchTV = async () => {
    const res = await fetchExchangeReward({
      identification: data.identification,
    });
    if (res.success) {
      nativeOneVideo();
      onClose();
    }
  };

  return (
    <BasicModal modalProps={{ ...modalProps }}>
      <div className="SuccessModal_content">
        <div className="SuccessModal_title">恭喜您兑换成功</div>
        <div className="SuccessModal_info">{data.prizeName}</div>
        <div className="SuccessModal_image">
          <img src={data.prizeImg} alt="" />
        </div>
        <div className="SuccessModal_tips">仅差一步就可拿到奖励</div>
        <div className="SuccessModal_bottom">
          <div className="SuccessModal_button" onClick={watchTV}>
            看视频
          </div>
          <div className="SuccessModal_button" onClick={copyCode}>
            好友助力
          </div>
        </div>
      </div>
    </BasicModal>
  );
}

export default index;
