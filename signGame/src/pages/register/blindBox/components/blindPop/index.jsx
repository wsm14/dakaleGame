import React, { useState } from 'react';
import Mask from '@/components/mask';
import { backgroundObj, filterStrList } from '@/utils/utils';
import {
  linkToCoupon,
  linkToWallet,
  linkToPrize,
  nativeOneVideo,
  linkTo,
} from '@/utils/birdgeContent';
import './index.less';
export default (props) => {
  const { show, onClose, data = {}, onOpenCoby } = props;
  const {
    prizeType,
    prizeImg,
    prizeName,
    taskFlag,
    merchantImg = '',
    oriPrice = '',
    merchantName,
    useEndTime,
  } = data;
  const templateTitle = {
    bean: '恭喜你被超级幸运砸中',
    commerce: '恭喜您获得超级大奖',
    rightGood: '恭喜您获得霸王餐',
  }[prizeType];
  console.log(data);
  const templateContent = {
    bean: (
      <div>
        <div className="blindPop_profile" style={backgroundObj(filterStrList(prizeImg)[1])}></div>
        <div className="blindPop_name">{prizeName}</div>
      </div>
    ),
    commerce: (
      <div className="blindPop_profile" style={backgroundObj(filterStrList(prizeImg)[1])}></div>
    ),
    rightGood: (
      <div>
        <div className="blindPop_shopView">
          <div
            className="blindPop_shopLogo"
            style={backgroundObj(filterStrList(prizeImg)[1])}
          ></div>
          <div className="blindPop_shopContent">
            <div className="blindPop_shop_name font_hide">{prizeName}</div>
            <div className="blindPop_shop_user">
              <div
                className="blindPop_shop_merchantProfile merchant_dakale_logo"
                style={backgroundObj(merchantImg)}
              ></div>
              <div className="blindPop_shop_merchantName  font_hide">{merchantName}</div>
            </div>
            <div className="blindPop_shop_price">
              <div className="blindPop_shop_priceLabel">原价</div>
              <div className="blindPop_shop_pricecount">{oriPrice}</div>
            </div>
          </div>
        </div>
        <div className="blindPop_shop_date">有效期至:{useEndTime}</div>
      </div>
    ),
  }[prizeType];

  const templateSuccessBtn = {
    bean: (
      <div>
        <div
          className="blindPop_shop_bgBtn"
          onClick={() => {
            linkTo({
              ios: {
                path: 'DKLExquisiteChosenHomeViewController',
              },
              android: {
                path: 'ShopAround',
              },
              wechat: {
                url: `/pages/perimeter/goodThings/index`,
              },
            });
          }}
        >
          去使用抵扣
        </div>
        <div className="blindPop_shop_desc">
          {prizeName}可直接抵扣{parseInt(prizeName) / 100}元
        </div>
      </div>
    ),
    commerce: (
      <div>
        <div
          onClick={() => {
            linkToPrize();
          }}
          className="blindPop_shop_bgBtn"
        >
          填写地址
        </div>
        <div className="blindPop_shop_desc">填写收货地址，包邮到家</div>
      </div>
    ),
    rightGood: (
      <div>
        <div
          onClick={() => {
            linkToCoupon();
          }}
          className="blindPop_shop_bgBtn"
        >
          开心收下
        </div>
        <div className="blindPop_shop_desc">可在【我的-券包】中查看并使用</div>
      </div>
    ),
  }[prizeType];
  const templateShareBtn = () => {
    return (
      <div>
        <div className="blindPop_shop_shareDesc">还差一小步就可拿走大奖啦～</div>
        <div className="blindPop_shop_smBtn">
          <div
            className="blindPop_shop_smBtnBox"
            onClick={() => {
              onClose();
              nativeOneVideo();
            }}
          >
            看1条视频
          </div>
          <div
            className="blindPop_shop_smBtnBox"
            onClick={() => {
              onClose();
              onOpenCoby();
            }}
          >
            邀1个好友助力
          </div>
        </div>
      </div>
    );
  };
  return (
    <Mask show={show} onClose={onClose}>
      <div className="blindPop_box">
        <div className="blind_boxTop">
          <div className="blind_toast_font">{templateTitle}</div>
        </div>
        <div className="blindPop_content">
          {templateContent}
          {taskFlag === '1' ? templateShareBtn() : templateSuccessBtn}
        </div>
      </div>
    </Mask>
  );
};
