import React, { useState } from 'react';
import { Mask } from 'antd-mobile';
import './index.less';
export default (props) => {
  const { onClose, show, children } = props;
  return (
    <Mask
      visible={show}
      style={{ '--z-index': 1001 }}
      onMaskClick={() => {
        onClose && onClose();
      }}
    >
      <div
        className="mask_center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children && children}
        <div
          className="close_btn"
          onClick={() => {
            onClose && onClose();
          }}
        ></div>
      </div>
    </Mask>
  );
};
