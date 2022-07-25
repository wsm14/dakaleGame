import React from 'react';
import './index.less';
import BasicModal from '@/components/BasicModal';
import { openWx } from '@/utils/birdgeContent';

const index = (props) => {
  const { onClose } = props;
  return (
    <BasicModal modalProps={{ ...props }}>
      <div className="copyCode">
        <div
          className="copyCodeButton"
          onClick={() => {
            openWx();
            onClose();
          }}
        >
          去微信粘贴给好友
        </div>
      </div>
    </BasicModal>
  );
};

export default index;
