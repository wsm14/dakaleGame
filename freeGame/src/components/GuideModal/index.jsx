import React from 'react';
import modalHand from '@public/usual/modalHand.png';
import './index.less';

function index(props) {
  const { visible, onClose } = props;
  return (
    <>
      <div className="guideModal" style={{ display: visible ? 'block' : 'none' }} onClick={onClose}>
        <div className="guideModal_handImg">
          <div>点我合力</div>
          <img src={modalHand} alt="" />
        </div>
      </div>
    </>
  );
}

export default index;
