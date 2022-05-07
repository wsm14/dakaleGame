import React, { useState, useEffect } from 'react';
import './index.less';
import { Toast } from 'antd-mobile';
import BasicModal from '@/components/BasicModal';
import { getNumber } from '@/utils/utils';

const index = (props) => {
  const { visible, onClose } = props;
  const [times, setTimes] = useState(30);

  useEffect(() => {
    timeDown();
    getVideo();
  }, []);

  const modalProps = {
    visible,
    onClose,
  };

  //获取视频
  const getVideo = () => {
    const list = [
      '1509788207827189761',
      '1509786733353172993',
      '1509786128169631746',
      '1509785360230318081',
      '1509784523722522625',
    ];
    const videoId = list[getNumber(0, 4)];
    console.log(videoId);
  };

  const timeDown = () => {
    const timer = setInterval(() => {
      setTimes((val) => {
        if (val < 0) {
          clearInterval(timer);
          return 0;
        } else {
          return val - 1;
        }
      });
    }, 1000);
  };

  const getBean = () => {
    Toast.show({
      content: '领取成功',
    });
  };

  return (
    <>
      <BasicModal modalProps={modalProps}>
        <div className="meledVideo">
          <video width="100%" height="100%" controls></video>
          <div className="meledVideo_times">剩余{times}秒可以领取100卡豆</div>
        </div>
      </BasicModal>
    </>
  );
};

export default index;
