import React from 'react';
import { Popup } from 'antd-mobile';
import './index.less';

function index(props) {
  const { visible, children, onClose } = props;
  return (
    <>
      <Popup
        visible={visible}
        bodyStyle={{
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          // minHeight: '30vh',
        }}
        onMaskClick={onClose && onClose}
      >
        {children && children}
      </Popup>
    </>
  );
}

export default index;
