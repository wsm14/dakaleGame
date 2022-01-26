import React from 'react';
import modalHand from '@public/usual/modalHand.png';
import './index.less';
import { deviceName } from '@/utils/birdgeContent';

function index(props) {
  const { visible, onClose } = props;
  return (
    <>
      <div
        className={`guideModal ${deviceName() === 'miniProgram' ? null : 'guideModal_bottom'}`}
        style={{ display: visible ? 'block' : 'none' }}
      >
        <div className="guideModal_handImg">
          <div>点我合力</div>
          <img src={modalHand} alt="" />
        </div>
        <div className="guideModal_click" onClick={onClose}></div>
      </div>
    </>
  );
}

export default index;
