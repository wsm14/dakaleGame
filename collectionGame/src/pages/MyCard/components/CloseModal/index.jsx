import React, { useState, useEffect } from 'react';
import { Mask } from 'antd-mobile';
import Lottie from 'react-lottie';
import './index.less';
import close from './Lottie/close.json';

function index(props) {
  const { visible, onClose } = props;
  const [autoplay, setAutoplay] = useState(false);
  useEffect(() => {
    if (visible) {
      setAutoplay(true);
    }
  }, [visible]);
  return (
    <div>
      <Mask visible={visible}>
        <div className="cardModal_Lottie">
          <Lottie
            options={{
              loop: false,
              autoplay: autoplay,
              animationData: close,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            isClickToPauseDisabled={true}
          />
          <div className="cardModal_close" onClick={onClose}></div>
        </div>
      </Mask>
    </div>
  );
}

export default index;
