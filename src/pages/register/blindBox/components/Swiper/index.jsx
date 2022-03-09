import React from 'react';
import { Swiper } from 'antd-mobile';
import { filterStrList } from '@/utils/utils';
import './index.less';
export default ({ prizeInfoList }) => {
  return (
    <div className="blind_swiper">
      <div className="blind_swiper_btn">盲盒奖池</div>
      <Swiper
        autoplay={true}
        allowTouchMove={false}
        direction={'vertical'}
        loop={true}
        indicator={() => {}}
        className="blind_swiper_box font_hide"
      >
        {prizeInfoList.map((item) => {
          const { prizeName, prizeImg } = item;
          return (
            <Swiper.Item className="blind_swiper_desc public_center font_hide">
              <img className="blind_swiper_img" src={filterStrList(prizeImg)[0]} /> {prizeName}
            </Swiper.Item>
          );
        })}
      </Swiper>
    </div>
  );
};
