import React from 'react';
import { Swiper } from 'antd-mobile';
import './index.less';

function index(props) {
  const { list = [] } = props;
  const verticalItems = list.map((item) => (
    <Swiper.Item className="verticalContent_box" key={item.userProfile}>
      <div className="verticalContent">
        <img src={item.userProfile} />
        <div>{item.barrageDesc}</div>
      </div>
    </Swiper.Item>
  ));

  const swiperProps = {
    autoplay: true,
    indicator: () => null,
    direction: 'vertical',
    allowTouchMove: false,
    loop: true,
  };
  return (
    <>
      <Swiper className="swiperContent_height" {...swiperProps}>
        {verticalItems}
      </Swiper>
    </>
  );
}

export default index;
