import React from 'react';
import './index.less';
import { Mask } from 'antd-mobile-v5';
import { useDispatch } from 'umi';
import closeIcon from '@public/image/close.png';

function index(props) {
  const { children, modalProps } = props;
  const { onClose, opacity = '0.8' } = modalProps;
  return (
    <>
      <Mask {...modalProps}>
        <div className="basicBox">
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
        </div>
      </Mask>
    </>
  );
}

export default index;
