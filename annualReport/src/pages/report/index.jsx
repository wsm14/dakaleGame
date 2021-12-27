import React, { useState } from 'react';
import { Swiper } from 'antd-mobile';
import './index.less';
import SwiperChildren from './components/SwiperChildren';
import ReportIcon from './components/ReportIcon';
import topIcon from '@public/image/topIcon.png';

function index() {
  const [pageIndex, setPageIndex] = useState(0); //当前跳转到第几页
  const list = [0, 1, 2, 3, 4, 5];
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
      <ReportIcon></ReportIcon>

      {/* 上滑动图标 */}
      {pageIndex < 5 && (
        <div className="topIcon">
          <img src={topIcon} alt="" />
        </div>
      )}
    </>
  );
}

export default index;
