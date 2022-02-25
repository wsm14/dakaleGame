import React, { useState } from 'react';
import BasicModal from '@/components/BasicModal';
import FooterModal from '@/components/FooterModal';
import { linkWatchTv } from '@/utils/birdgeContent';
import './index.less';

const index = (props) => {
  const { visible, onClose, travelInfo = {} } = props;
  const [footVisible, setFootVisible] = useState(false);
  const modalProps = {
    visible: visible,
    onClose: onClose,
  };
  return (
    <>
      <BasicModal modalProps={modalProps}>
        {travelInfo.prizeType === 'image' ? (
          <div className="TravelModal_top">
            你的豆仔旅行去了北京
            <br />
            拍了张照给你
          </div>
        ) : (
          <div className="TravelModal_top">
            你的豆仔回来了
            <br />
            给你带来了
          </div>
        )}
        <div className={`TravelModal_content TravelModal_${travelInfo.prizeType}`}>
          <div className="TravelModal_title">{travelInfo.prizeName}</div>
          <div className="TravelModal_bottom">
            <div
              className="TravelModal_button TravelModal_buttonStyle"
              onClick={
                travelInfo.prizeType === 'image'
                  ? () => {
                      setFootVisible(true);
                    }
                  : onClose
              }
            >
              {travelInfo.prizeType === 'image' ? '炫耀一下' : '立即收下'}
            </div>
            <div className="TravelModal_button TravelModal_buttonStyle1" onClick={linkWatchTv}>
              看视频领广告豆
            </div>
          </div>
        </div>
      </BasicModal>
      <FooterModal
        visible={footVisible}
        onClose={() => {
          setFootVisible(false);
        }}
        data={travelInfo}
      ></FooterModal>
    </>
  );
};

export default index;
