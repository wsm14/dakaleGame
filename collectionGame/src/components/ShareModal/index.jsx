import React from 'react';
import './index.less';
import { openWx, nativeShareSign, nativeShareWork, nativeShareClose } from '@/utils/birdgeContent';
import kcopy from '@public/image/kcopy.png';
import BasicModal from '@/components/BasicModal';

function index(props) {
  const { visible, onClose, type } = props;
  const { show, value } = visible;

  const modalProps = {
    visible: show,
    onClose: onClose,
    opacity: 0.8,
  };

  return (
    <>
      <BasicModal modalProps={{ ...modalProps }}>
        <div className="ShareModal_content">
          <div className="ShareModal_content_img">
            <img src={kcopy} alt="" />
          </div>
          <div className="ShareModal_content_title">
            将口令复制给微信好友，好友打开app识别口令即可邀请成功
          </div>
          <div className="ShareModal_doubleButton">
            <div
              className="ShareModal_content_button"
              onClick={() => {
                openWx();
                onClose();
              }}
            >
              去微信粘贴
            </div>
            <div
              className="ShareModal_content_button"
              onClick={() => {
                nativeShareWork && nativeShareWork(value);
                onClose();
              }}
            >
              直接邀请
            </div>
          </div>
        </div>
      </BasicModal>
    </>
  );
}

export default index;
