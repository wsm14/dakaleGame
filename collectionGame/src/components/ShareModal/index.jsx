import React from 'react';
import './index.less';
import { openWx } from '@/utils/birdgeContent';
import kcopy from '@public/image/kcopy.png';
import BasicModal from '@/components/BasicModal';
import { cobyInfo } from '@/utils/utils';
import { fetchCommandGetCommand } from '@/services/game';

function index(props) {
  const { visible, onClose, checkInfo, getCardDetail } = props;
  const { show } = visible;

  const modalProps = {
    visible: show,
    onClose: onClose,
    opacity: 0.8,
  };

  const copyCode = async () => {
    const res = await fetchCommandGetCommand({
      commandType: 'luckCardGiveOther',
      relateId: checkInfo.identification,
    });
    if (res.success) {
      const { command } = res.content;
      cobyInfo(command, {}, (val) => {
        openWx();
        onClose();
        getCardDetail();
      });
    }
  };
  return (
    <>
      <BasicModal modalProps={{ ...modalProps }}>
        <div className="ShareModal_content">
          <div className="ShareModal_content_img">
            <img src={kcopy} alt="" />
          </div>
          <div className="ShareModal_content_title">
            将口令复制给微信好友识别即可领取
            <br />
            赠送后自动扣除卡片，10分钟未领自动退回
          </div>
          <div className="ShareModal_doubleButton">
            <div className="ShareModal_content_button" onClick={copyCode}>
              去微信粘贴
            </div>
            {/* <div
              className="ShareModal_content_button"
              onClick={() => {
                nativeShareWork && nativeShareWork(value);
                onClose();
              }}
            >
              直接邀请
            </div> */}
          </div>
        </div>
      </BasicModal>
    </>
  );
}

export default index;
