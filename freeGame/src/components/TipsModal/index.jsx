import React from 'react';
import './index.less';
import { fetchFreeGoodQuitTeam } from '@/services/game';
import BasicModal from '@/components/BasicModal';

function index(props) {
  const { visible, onClose, onOk, title, leftButton = '确定', rightButton = '取消' } = props;

  const modalProps = {
    visible: visible,
    onClose: onClose,
    opacity: 0.8,
    style: { '--z-index': '1001' },
  };

  //退出小队

  return (
    <>
      <BasicModal modalProps={{ ...modalProps }}>
        <div className="signOutModal_content">
          <div className="signOutModal_content_sign">温馨提示</div>
          <div className="signOutModal_content_title">{title}</div>
          <div className="signOutModal_doubleButton">
            <div className="signOutModal_content_button" onClick={() => {}}>
              {leftButton}
            </div>
            <div className="signOutModal_content_button1" onClick={() => {}}>
              {rightButton}
            </div>
          </div>
        </div>
      </BasicModal>
    </>
  );
}

export default index;
