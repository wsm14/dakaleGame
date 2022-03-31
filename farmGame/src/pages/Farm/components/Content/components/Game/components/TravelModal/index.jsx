import React, { useState, useEffect } from 'react';
import BasicModal from '@/components/BasicModal';
import FooterModal from '@/components/FooterModal';
import Track from '@/components/tracking';
import { linkWatchTv, deviceName } from '@/utils/birdgeContent';
import { fetchShareGetNewShareInfo } from '@/services/game';
import './index.less';

const index = (props) => {
  const { visible, onClose, travelInfo = {} } = props;
  const [footVisible, setFootVisible] = useState(false);
  const [shareImg, setShareImg] = useState('');

  useEffect(() => {
    getShareImg();
  }, []);

  //获取二维码
  const getShareImg = async () => {
    const res = await fetchShareGetNewShareInfo({
      shareType: 'game',
      subType: 'shareGameImage',
      needHyaline: '1',
    });
    const { content = {} } = res;
    const { shareInfo = {} } = content;
    setShareImg(shareInfo.qcodeUrl);
  };
  const modalProps = {
    visible: visible,
    onClose: onClose,
    opacity: 0.8,
  };
  return (
    <>
      <BasicModal modalProps={modalProps}>
        {travelInfo.prizeType === 'image' ? (
          <div className="TravelModal_top">
            你的豆仔旅行去了{travelInfo.prizeName}
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
          <div className="TravelModal_title">
            {travelInfo.prizeType === 'image'
              ? '纪念照*1'
              : `${travelInfo.prizeName}*${travelInfo.prize || 1}`}
          </div>
          <Track name="reward" args={{ device: deviceName() }}>
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
                看视频领豆
              </div>
            </div>
          </Track>
        </div>
      </BasicModal>
      <FooterModal
        visible={footVisible}
        onClose={() => {
          setFootVisible(false);
        }}
        data={travelInfo}
        shareImg={shareImg}
      ></FooterModal>
    </>
  );
};

export default index;
