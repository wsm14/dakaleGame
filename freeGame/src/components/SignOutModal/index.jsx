import React from 'react';
import './index.less';
import { fetchFreeGoodQuitTeam } from '@/services/game';
import BasicModal from '@/components/BasicModal';

function index(props) {
  const { visible, onClose, getInvitaInfo, processId } = props;

  const modalProps = {
    visible: visible,
    onClose: onClose,
    opacity: 0.8,
    style: { '--z-index': '1001' },
  };

  //退出小队
  const signOut = async () => {
    const res = await fetchFreeGoodQuitTeam({
      processIdStr: processId,
    });
    getInvitaInfo();
    onClose();
  };

  return (
    <>
      <BasicModal modalProps={{ ...modalProps }}>
        <div className="signOutModal_content">
          <div className="signOutModal_content_sign">温馨提示</div>
          <div className="signOutModal_content_title">是否确认退出小队？</div>
          <div className="signOutModal_doubleButton">
            <div
              className="signOutModal_content_button"
              onClick={() => {
                signOut();
              }}
            >
              立即退出
            </div>
            <div
              className="signOutModal_content_button1"
              onClick={() => {
                onClose();
              }}
            >
              暂不退出
            </div>
          </div>
        </div>
      </BasicModal>
    </>
  );
}

export default index;
