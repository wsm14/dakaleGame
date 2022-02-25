import React from 'react';
import { Swiper } from 'antd-mobile';
import { linkToWallet, deviceName, linkToSecret } from '@/utils/birdgeContent';
import { history } from 'umi';
import './index.less';
export default ({ data = {}, type }) => {
  const { userBeanNums = 0, noUseKeys } = data;
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
              <div className="topLayer_scoend_fontFamily">
                {userBeanNums && (userBeanNums / 100).toFixed(2)}元
              </div>
            </Swiper.Item>
            <Swiper.Item className="swiper_box public_center">
              <div>{userBeanNums}卡豆</div>
            </Swiper.Item>
          </Swiper>
        </div>
        <div
          className="topLayer_collect public_center"
          onClick={() => {
            if (deviceName() === 'miniProgram') {
              history.push('/secret');
            } else {
              linkToSecret();
            }
          }}
        >
          种树秘籍
        </div>
        <div className={`bean_barrge_info bean_barrge_info_${type}`}>
          <div className="bean_barrge_desc">
            {type === 'bigTree' ? '可领取' : '有肥料滋养，我长得更快哦'}
          </div>
        </div>
      </div>
    </div>
  );
};
