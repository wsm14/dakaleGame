import React from 'react';
import './index.less';
import BasicModal from '@/components/BasicModal';

const index = (props) => {
  return (
    <BasicModal modalProps={{ ...props }}>
      <div className="copyCode">
        <div className="copyCodeButton">去微信粘贴给好友</div>
      </div>
    </BasicModal>
  );
};

export default index;
