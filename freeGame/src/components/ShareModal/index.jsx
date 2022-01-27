import React from 'react';
import './index.less';
import { openWx, nativeShareSign, nativeShareWork, nativeShareClose } from '@/utils/birdgeContent';
import { fetchTaskDoneTask } from '@/services/game';
import kcopy from '@public/usual/kcopy.png';
import BasicModal from '@/components/BasicModal';

function index(props) {
  const { visible, onClose, type, data = {} } = props;
  const { show, taskType } = visible;
  console.log(taskType, 'taskType');
  const { value } = data;
  const btnType = {
    nativeShareWork: nativeShareWork,
    nativeShareClose: nativeShareClose,
  }[type];

  const modalProps = {
    visible: show,
    onClose: onClose,
    opacity: 0.8,
    style: { '--z-index': '1001' },
  };
  const downTask = async () => {
    const res = await fetchTaskDoneTask({
      taskStrapId: value,
    });
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
                if (taskType == 'share') {
                  downTask();
                }
                openWx();
                onClose();
              }}
            >
              去微信粘贴
            </div>
            <div
              className="ShareModal_content_button"
              onClick={() => {
                if (taskType == 'share') {
                  downTask();
                }
                btnType && btnType(value);
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
