import React, { useState } from 'react';
import { Popup } from 'antd-mobile';
import './index.less';
export default (props) => {
  const { onClose, show, children, position, bodyClassName, className } = props;
  return (
    <Popup
      visible={show}
      position={position}
      className={className}
      bodyClassName={bodyClassName}
      onMaskClick={() => {
        onClose && onClose();
      }}
    >
      {children && children}
    </Popup>
  );
};
