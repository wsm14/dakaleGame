import React, { useState } from 'react';
import { Swiper } from 'antd-mobile';
import './index.less';
import SwiperChildren from './components/SwiperChildren';
import topIcon from '@public/image/topIcon.png';
import musicIcon from '@public/image/musicIcon.png';
import shareIcon from '@public/image/shareIcon.png';

function index() {
  const [pageIndex, setPageIndex] = useState(0); //当前跳转到第几页
  const list = [1, 2, 3, 4, 5];
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
            <SwiperChildren index={index} pageIndex={pageIndex}></SwiperChildren>
          </Swiper.Item>
        ))}
      </Swiper>

      {/* 分享图标 */}
      <div className="shareIcon">
        <img src={shareIcon} alt="" />
      </div>
      {/* 音乐图标 */}
      <div className="musicIcon">
        <img src={musicIcon} alt="" />
      </div>
      {/* 上滑动图标 */}
      <div className="topIcon">
        <img src={topIcon} alt="" />
      </div>
    </>
  );
}

export default index;
