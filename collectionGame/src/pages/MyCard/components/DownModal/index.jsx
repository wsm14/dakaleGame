import React from 'react';
import BasicModal from '@/components/BasicModal';
import { linkTo } from '@/utils/birdgeContent';

import './index.less';

function index(props) {
  const { visible, onClose } = props;
  const modalProps = {
    visible: visible,
    onClose,
    opacity: 0.8,
  };
  return (
    <BasicModal modalProps={{ ...modalProps }}>
      <div className="DownModal_content">
        <div className="DownModal_title">温馨提示</div>
        <div className="DownModal_info">请下载哒卡乐app进行转赠</div>
        <div
          className="DownModal_button"
          onClick={() => {
            linkTo({
              wechat: {
                url: `/pages/share/download/index`,
              },
            });
          }}
        >
          去下载
        </div>
      </div>
    </BasicModal>
  );
}

export default index;
