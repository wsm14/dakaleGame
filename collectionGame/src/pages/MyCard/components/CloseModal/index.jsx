import React, { useState, useEffect } from 'react';
import { Mask } from 'antd-mobile';
import Lottie from 'react-lottie';
import './index.less';
import close from './Lottie/close.json';

function index(props) {
  const { visible, onClose } = props;
  const [isStopped, setIsStopped] = useState(true);
  useEffect(() => {
    if (visible) {
      setIsStopped(false);
    } else {
      setIsStopped(true);
    }
  }, [visible]);
  return (
    <div>
      <Mask visible={visible} forceRender opacity="0.8">
        <div className="cardModal_Lottie">
          <Lottie
            options={{
              loop: false,
              autoplay: true,
              animationData: close,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            isClickToPauseDisabled={true}
            isStopped={isStopped}
          />
          <div className="cardModal_close" onClick={onClose}></div>
        </div>
      </Mask>
    </div>
  );
}

export default index;
