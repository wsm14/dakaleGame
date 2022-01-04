import React, { useState } from 'react';
import { Swiper } from 'antd-mobile';
import './index.less';
import SwiperChildren from './components/SwiperChildren';
import ReportIcon from './components/ReportIcon';
import ImgModal from './components/ImgModal';

import topIcon from '@public/image/topIcon.png';

function index() {
  const [pageIndex, setPageIndex] = useState(0); //跳转到第几页
  const list = [5];
  const [audioFlag, setAudioFlag] = useState(true);
  return (
    <>
      <Swiper
        direction="vertical"
        className="swiperContent"
        onIndexChange={(e) => {
          setPageIndex(e);
        }}
        indicator={() => null}
      >
        {list.map((item, index) => (
          <Swiper.Item key={item}>
            <SwiperChildren index={item} pageIndex={pageIndex}></SwiperChildren>
          </Swiper.Item>
        ))}
      </Swiper>

      {/* 分享和音乐图标 */}
      <ReportIcon audioFlag={audioFlag} setAudioFlag={setAudioFlag}></ReportIcon>

      {/* 上滑动图标 */}
      {pageIndex < 5 && (
        <div className="topIcon">
          <img src={topIcon} alt="" />
        </div>
      )}
      <ImgModal></ImgModal>
    </>
  );
}

export default index;
