import React from 'react';
import { Swiper, Switch } from 'antd-mobile';
import { nativeClose, linkRule, linkToWallet, deviceName } from '@/utils/birdgeContent';
import { history } from 'umi';
import './index.less';
export default ({ img, regOpen, data = {} }) => {
  const { remindFlag, bean = 0, noUseKeys, continuitySignDay } = data;
  return (
    <div className="topLayer_box">
      <div className="topLayer_title">
        <div
          style={{ visibility: deviceName() === 'miniProgram' ? 'hidden' : 'visible' }}
          className={`topLayer_img`}
          onClick={() => nativeClose()}
        ></div>
        <img src={img && img.get('registerFont').src} className={`topLayer_title_desc`} />
        <div className="topLayer_title_reg" onClick={regOpen}></div>
      </div>
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
            linkRule();
          }}
        >
          签到秘籍
        </div>
        <div
          onClick={() => {
            history.push('/blind');
          }}
          className="topLayer_blindBox public_center"
        >
          {noUseKeys}
        </div>
      </div>
      <div className="bean_barrge_info">
        <div className="bean_barrge_desc">已连续签到{continuitySignDay}天啦！ 明天要记得来哦～</div>
      </div>
    </div>
  );
};
