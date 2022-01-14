import React, { useMemo } from 'react';
import BasicModal from '@/components/BasicModal';
import './index.less';

import beanBottle from '@public/usual/beanBottle.png';
import modalImg1 from '@public/usual/modalImg1.png';
import modalImg2 from '@public/usual/modalImg2.png';
import modalImg3 from '@public/usual/modalImg3.png';
import modalImg4 from '@public/usual/modalImg4.png';

function index(props) {
  const { visible = {}, onClose } = props;
  const { show = false, num, type, onClick, progress } = visible;
  console.log(show, type);
  const modalProps = {
    visible: show,
    opacity: 0.8,
    onClose: onClose,
    afterClose: onClick || null,
    style: { '--z-index': '1001' },
  };

  const info = [
    {
      titleImg: modalImg1,
      beanNum: `送你${num}星豆`,
      content: '',
      button: '去补给',
      click: onClose,
    },
    {
      titleImg: modalImg2,
      beanNum: `快去做任务领星豆吧`,
      content: '使用星豆加速领商品',
      button: '领取补给',
      click: onClose,
    },
    {
      titleImg: modalImg3,
      beanNum: `成功领取${num}星豆`,
      content: '今天继续加油，明天可领更多星豆',
      button: '好的，去补给',
      click: onClose,
    },
    {
      titleImg: modalImg4,
      beanNum: `明日可领${num}星豆`,
      content: '当天补给越多，明天可领更多星豆',
      button: '去补给，积累更多奖励',
      click: onClose,
    },
    {
      titleImg: modalImg3,
      beanNum: `成功领取${num}星豆`,
      content: `商品还差${progress}即可送达下一站`,
      button: '马上去补给',
      click: onClose,
    },
  ];

  const modalInfo = info[type];

  return (
    <>
      <BasicModal modalProps={modalProps}>
        <div className="beanModalBox">
          <img src={modalInfo?.titleImg} alt="" className="beanModalBox_titleImg" />
          <img src={beanBottle} alt="" className="beanModalBox_bottle" />
          <div className="beanModalBox_give">{modalInfo?.beanNum}</div>
          {type != 0 && <div className="beanModalBox_fast">{modalInfo?.content}</div>}
          <div className="beanModalBox_button" onClick={modalInfo?.click}>
            {modalInfo?.button}
          </div>
        </div>
      </BasicModal>
    </>
  );
}

export default index;
