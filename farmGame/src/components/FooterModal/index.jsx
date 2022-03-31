import React, { useEffect, useRef, useState } from 'react';
import { Mask } from 'antd-mobile';
import html2canvas from 'html2canvas';
import Track from '@/components/tracking';
import { makeReport, deviceName, linkTo } from '@/utils/birdgeContent';
import './index.less';

const index = (props) => {
  const { visible, onClose, data = {}, shareImg } = props;
  const reportRef = useRef();

  //画海报
  const makeImage = () => {
    if (deviceName() === 'miniProgram') {
      linkTo({
        wechat: {
          url: `/pages/share/download/index`,
        },
      });
    } else {
      html2canvas(reportRef.current, {
        useCORS: true,
        scale: window.devicePixelRatio < 3 ? window.devicePixelRatio : 2,
      }).then(function (canvas) {
        const base64 = canvas.toDataURL('image/png');
        // // base64转换
        makeReport(`shareType=wechat,${base64}`);
      });
    }
  };
  return (
    <>
      <Mask visible={visible} onMaskClick={onClose} forceRender={true}>
        <div className="footerModal">
          <div className="footerModal_canvas">
            <div className="footerModal_content" ref={reportRef}>
              <img
                src={`${data.image || data.prizeImg}?_=${Date.now()}`}
                crossOrigin="anonymous"
                alt=""
                className="footerModal_bac"
              />
              <div className="footModal_code">
                <img src={`${shareImg}?_=${Date.now()}`} alt="" crossOrigin="anonymous" />
              </div>
            </div>
          </div>
          <Track name="showOff" args={{ device: deviceName() }}>
            <div className="footerModal_button" onClick={makeImage}>
              炫耀一下
            </div>
          </Track>
        </div>
      </Mask>
    </>
  );
};

export default index;
