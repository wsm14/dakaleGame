import React from 'react';
import { Swiper } from 'antd-mobile';
import './index.less';
import checkon from '@public/checkon.png';

function index(props) {
  const { list = [] } = props;
  const verticalItems = list.map((item) => (
    <Swiper.Item className="verticalContent_box" key={item}>
      <div className="verticalContent">
        <img src={checkon} />
        <div>姜**豆 成功领取xxxx商品</div>
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
      <Swiper className="swiperContent" {...swiperProps}>
        {verticalItems}
      </Swiper>
    </>
  );
}

export default index;
