import React, { useState, useEffect } from 'react';
import { Helmet } from 'umi';
import {
  fetchUserAcquiredPlatformGift,
  fetchUserPopUpCommerceGoods,
} from '@/server/appActiveServers';
import { getToken, linkToMember, linkToPhone, linkTo } from '@/utils/birdgeContent';
import { backgroundObj } from '@/utils/utils';
import './index.less';
export default ({}) => {
  const [data, setData] = useState({});
  const [list, setList] = useState([]);
  useEffect(() => {
    getToken(() => {
      getUserAcquiredPlatformGift();
      getCommerceGoods();
    });
  }, []);
  const getUserAcquiredPlatformGift = () => {
    fetchUserAcquiredPlatformGift({
      giftType: 'newUser',
    }).then((val) => {
      if (val) {
        const { platformGiftPackInfo } = val.content;
        if (platformGiftPackInfo) {
          setData(platformGiftPackInfo);
        }
      }
    });
  };
  const getCommerceGoods = () => {
    fetchUserPopUpCommerceGoods({}).then((val) => {
      if (val) {
        const { activityGoodsList = [] } = val.content;
        setList(activityGoodsList);
      }
    });
  };
  const { platformGiftPackRelateList = [] } = data;
  const templateCoupon = (item) => {
    const { platformCoupon = {} } = item;
    const { thresholdPrice, couponValue, useScenesType } = platformCoupon;
    const renter = {
      goodsBuy: '商品通用券',
      scan: '扫码通用券',
      virtual: '虚拟商品券',
      commerce: '电商券',
      community: '团购券',
    }[useScenesType];
    return (
      <div className="noviceCoupon_content_coupon">
        <div className="noviceCoupon_coupon_title1 font_hide">{renter}</div>
        <div className="noviceCoupon_coupon_title2">
          <div className="font30">¥</div>
          <div className="font48">{couponValue}</div>
        </div>
        <div className="noviceCoupon_coupon_title3">满{thresholdPrice}可用</div>
        <div className="noviceCoupon_coupon_btn public_center">已领取</div>
      </div>
    );
  };
  const templateShop = (val, index) => {
    const {
      goodsImg,
      goodsName,
      paymentModeObject = {},
      realPrice,
      specialActivityIdString,
      ownerIdString,
    } = val;
    const { type, bean, cash } = paymentModeObject;
    return (
      <div
        className={`templateShop_box ${(index + 1) % 3 !== 0 && 'templateShop_box_margin'}`}
        onClick={() =>
          linkTo({
            ios: {
              path: 'DKLAroundDiscountGoodsDetailViewController',
              param: { specialActivityId: specialActivityIdString, ownerId: ownerIdString },
            },
            android: {
              path: 'ECGood',
              specialActivityId: specialActivityIdString,
              ownerId: ownerIdString,
            },
            wechat: {
              url: `/pages/perimeter/favourableDetails/index?merchantId=${ownerIdString}&specialActivityId=${specialActivityIdString}`,
            },
          })
        }
      >
        <div className="templateShop_img" style={backgroundObj(goodsImg)}></div>
        <div className="templateShop_title font_hide">{goodsName} </div>
        <div className="templateShop_desc">卡豆价 </div>
        <div className="templateShop_price font_hide">
          {type === 'defaultMode' ? `¥${realPrice}` : `¥${cash}+${bean}卡豆`}
        </div>
      </div>
    );
  };
  return (
    <>
      <Helmet>
        <title>新人福利落地页</title>
      </Helmet>
      <div className="appActive_box">
        <div className="appActive_banner"></div>
        {platformGiftPackRelateList.length > 0 && (
          <>
            <div className="appActive_title  appActive_title_style1"></div>
            <div className="appActive_coupon_content">
              {platformGiftPackRelateList.map((item) => {
                return templateCoupon(item);
              })}
            </div>
          </>
        )}

        <div className="appActive_title appActive_title_style2"></div>

        <div className="appActive_content_vertion">
          <div className="appActive_vertion_info" onClick={linkToPhone}></div>
          <div className="appActive_vertion_info" onClick={linkToMember}></div>
        </div>
        {list.length > 0 && (
          <>
            <div className="appActive_title  appActive_title_style3"></div>
            <div className="appActive_newsContent">
              {list.map((item, index) => {
                return templateShop(item, index);
              })}
            </div>
          </>
        )}

        <div className="appActive_logo"></div>
      </div>
    </>
  );
};
