import React, { useState, useEffect } from 'react';
import './index.less';
import { history } from 'umi';
import { CapsuleTabs, Swiper } from 'antd-mobile';
import { GetDistance } from '@/utils/utils';
import { getLocation } from '@/utils/birdgeContent';

import meledBg from '@public/image/meledBg.png';
import addressIcon from '@public/image/addressIcon.png';
import shareIcon1 from '@public/image/shareIcon1.png';
import phoneIcon from '@public/image/phoneIcon.png';

const index = () => {
  const [city, setcity] = useState(null);

  useEffect(() => {
    getLocation(setcity);
  }, []);

  const getTitle = () => {
    return (
      <div className="setmeal_item">
        <div>牙齿矫正</div>
        <div className="setmeal_item_price">
          ¥ <span>999</span>
        </div>
      </div>
    );
  };

  const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac'];

  const items = colors.map((color, index) => (
    <Swiper.Item key={index}>
      <img src={meledBg} alt="" className="setmeal_swiper_img" key={index + 1} />
    </Swiper.Item>
  ));

  return (
    <div className="content">
      <div className="contentTop">
        <img src={meledBg} alt="" />
        <div
          className="contentTop_go"
          onClick={() => {
            history.push('/brandInfo');
          }}
        >
          品牌介绍
        </div>
      </div>
      <div className="store">
        <div className="store_info">
          <img src={meledBg} alt="" className="store_img" />
          <div className="store_intru">
            <div className="store_name">MYLIKE杭州美莱医疗美容医院</div>
            <div className="store_time">营业时间：周一至周五 9:30-23:00</div>
          </div>
        </div>
        <div className="store_line"></div>
        <div className="store_direction">
          {/* {GetDistance(lat, lnt, city.lat, city.lnt)} */}
          <div className="store_address">商家地址：距您m｜国泰科技大厦明河路479号</div>
          <div className="store_navigation">
            <img src={addressIcon} alt="" />
            导航
          </div>
        </div>
      </div>

      <div className="setmeal">
        <CapsuleTabs defaultActiveKey="1">
          {colors.map((item, index) => (
            <CapsuleTabs.Tab title={getTitle()} key={index}>
              <div>
                <div className="setmeal_swiper">
                  <Swiper
                    indicatorProps={{
                      color: 'white',
                    }}
                    defaultIndex={1}
                  >
                    {items}
                  </Swiper>
                </div>
                <div className="setmeal_name">
                  【美莱美容】牙齿矫正，进口隐适美。牙齿矫正进口隐适美，牙齿矫正，进口隐适美。
                </div>
                <div className="setmeal_price">
                  <div className="setmeal_discountPrice">
                    优惠价: <span>¥999</span>
                  </div>
                  <div className="setmeal_originalPrice">
                    原价: <span>¥1999.99</span>
                  </div>
                </div>
                <div className="setmeal_label">
                  <div className="setmeal_label_item">
                    省<span>¥74.99</span>
                  </div>
                  <div className="setmeal_label_item">
                    赚<span>¥74.99</span>
                  </div>
                </div>
              </div>
            </CapsuleTabs.Tab>
          ))}
        </CapsuleTabs>
      </div>

      <div className="setmealInfo">
        <div className="modular_title">套餐详情</div>
        <div className="setmealInfo_item">
          <div className="setmealInfo_item_title">· 水光针</div>
          <div className="setmealInfo_item_info">
            <div>皮肤检测（1次）</div>
            <div>¥49.00</div>
          </div>
        </div>
      </div>

      <div className="goodGescribe">
        <div className="modular_title">商品描述</div>
        <div className="goodGescribe_content">
          商品描述文案商品描述文案商品描述文案商品描述文案 商品描述文案商品描述文案
        </div>
      </div>

      <div className="footer">
        <div className="footer_left">
          <div className="footer_left_style">
            <img src={phoneIcon} alt="" />
            <div>电话预约</div>
          </div>
          <div className="footer_left_style">
            <img src={shareIcon1} alt="" />
            <div>推荐给朋友</div>
          </div>
        </div>
        <div className="footer_buy">立即购买</div>
      </div>
    </div>
  );
};

export default index;
