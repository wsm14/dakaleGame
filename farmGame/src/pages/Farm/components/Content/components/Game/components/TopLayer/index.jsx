import React from 'react';
import { Swiper } from 'antd-mobile';
import { linkToWallet } from '@/utils/birdgeContent';
import { history } from 'umi';
import './index.less';
export default ({ data = {} }) => {
  const { bean = 0, noUseKeys } = data;
  return (
    <div className="topLayer_box">
      <div className="topLayer_scoend_box">
        <div
          onClick={() => {
            linkToWallet();
          }}
          className="topLayer_scoend_beanInfo"
        >
          <Swiper
            autoplay={true}
            allowTouchMove={false}
            direction={'vertical'}
            loop={true}
            indicator={() => {}}
            className="topLayer_scoend_swiper"
          >
            <Swiper.Item className="swiper_box public_center">
              <div className="topLayer_scoend_fontFamily">{bean && (bean / 100).toFixed(2)}元</div>
            </Swiper.Item>
            <Swiper.Item className="swiper_box public_center">
              <div>{bean}卡豆</div>
            </Swiper.Item>
          </Swiper>
        </div>
        <div
          className="topLayer_collect public_center"
          onClick={() => {
            // linkRule();
          }}
        >
          种树秘籍
        </div>
        <div className="bean_barrge_info">
          <div className="bean_barrge_desc"> 有肥料滋养，我长得更快哦</div>
        </div>
      </div>
    </div>
  );
};
