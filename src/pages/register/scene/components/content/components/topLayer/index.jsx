import React from 'react';
import { Swiper, Switch } from 'antd-mobile';

import './index.less';
export default ({ img, regOpen, data = {} }) => {
  
  const { remindFlag, bean = 0 } = data;
  
  return (
    <div className="topLayer_box">
      <div className="topLayer_title">
        <div className={`topLayer_img`}></div>
        <img src={img && img.get('registerFont').src} className={`topLayer_title_desc`} />
        <div className="topLayer_title_reg" onClick={regOpen}></div>
      </div>
      <div className="topLayer_scoend_box">
        <div className="topLayer_scoend_beanInfo">
          <Swiper
            autoplay={true}
            allowTouchMove={false}
            direction={'vertical'}
            loop={true}
            indicator={() => {}}
            className="topLayer_scoend_swiper"
          >
            <Swiper.Item className="swiper_box public_center">
              <div>{bean && (bean / 100).toFixed(2)}元</div>
            </Swiper.Item>
            <Swiper.Item className="swiper_box public_center">
              <div>{bean}卡豆</div>
            </Swiper.Item>
          </Swiper>
        </div>
        <div className="topLayer_collect public_center">赚豆秘籍</div>
      </div>
    </div>
  );
};
