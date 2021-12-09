import React from 'react';
import './index.less';
import { Mask } from 'antd-mobile-v5';
import { useDispatch } from 'umi';
import closeIcon from '@public/closeIcon.png';

function index(props) {
  const { children, modalProps } = props;
  return (
    <>
      <Mask {...modalProps}>
        <div className="basicModal">
          {children}
          <div className="basicModal_close">
            <img
              src={closeIcon}
              onClick={() => {
                onClose && onClose();
              }}
            ></img>
          </div>
        </div>
      </Mask>
    </>
  );
}

export default index;
