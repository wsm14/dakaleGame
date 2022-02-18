import React from 'react';
import { Mask } from 'antd-mobile';
import './index.less';

const index = (props) => {
  const { visible, onClose } = props;
  return (
    <>
      <Mask visible={visible} onMaskClick={onClose}>
        <div className="footerModal">
          <div className="footerModal_content"></div>
          <div className="footerModal_button">炫耀一下</div>
        </div>
      </Mask>
    </>
  );
};

export default index;
