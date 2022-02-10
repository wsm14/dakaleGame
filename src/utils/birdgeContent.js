import native from './bridge';
import { toast } from './utils';
export const hideTitle = (data) => {
  try {
    native.nativeInit('hideTitle');
  } catch (e) {}
};
export const linkTo = (data) => {
  native.nativeInit('linkTo', {
    ...data,
  });
};
//跳转对应页面
// ios: {
//   path: 'DKLAroundDiscountConfirmOrderViewController',
//   param: { merchantId: merchantId, activityId: activityId },
// },
// android: {
//   path: 'KolOrderSure',
//   merchantId: merchantId,
//   specialActivityId: activityId,
// },
export const linkRule = () => {
  if (native.getPhone() === 'miniProgram') {
    native.nativeInit('linkTo', {
      wechat: {
        url: `/pages/share/webView/index?link=https://resource-new.dakale.net/product/html/active/771c4177-4995-4735-9537-376a674bb083.html`,
      },
    });
  } else {
    window.location.href =
      'https://resource-new.dakale.net/product/html/active/771c4177-4995-4735-9537-376a674bb083.html?newPage=true&showTitle=true';
  }
};
export const nativeClose = () => {
  native.nativeInit('close');
};
export const getToken = (fn) => {
  try {
    if (native.getPhone() === 'miniProgram') {
      let token = native.getUrlKey('token');
      if (!token) {
        getLogin();
      } else {
        window.sessionStorage.setItem('dakale_token', token);
        fn && fn(token);
      }
    } else {
      native.nativeInit('getToken', {}, (res) => {
        if (res && res.length > 0) {
          window.sessionStorage.setItem('dakale_token', res);
          fn && fn(res);
        } else {
          getLogin();
        }
      });
    }
  } catch (e) {}
};
//获取token
export const getLogin = () => {
  if (native.getPhone() === 'miniProgram') {
    native.nativeInit('linkTo', {
      wechat: {
        url: `/pages/auth/index`,
      },
    });
  } else {
    let obj = {
      android: {},
      ios: { path: 'DKLLoginController', skipType: 'present', param: { skipType: 'present' } },
    };
    return native.nativeInit('goLogin', obj);
  }
};
//身份过期登录

export const getLocation = (fn) => {
  try {
    if (native.getPhone() === 'miniProgram') {
      const lat = native.getUrlKey('lat');
      const lnt = native.getUrlKey('lnt');
      const city_code = native.getUrlKey('city_code');
      fn &&
        fn({
          city_code: city_code || 3301,
          lat: lat || 30.229271,
          lnt: lnt || 120.255384,
        });
    } else {
      native.nativeInit('getUserLocationInfo', {}, (res) => {
        if (res) {
          res = JSON.parse(res);
          const { cityCode } = res;
          fn && fn({ ...res, city_code: cityCode });
        } else {
          fn &&
            fn({
              city_code: 3301,
              lat: 30.229271,
              lnt: 120.255384,
            });
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
};
export const deviceName = () => {
  return native.getPhone();
};
export const linkToCoupon = () => {
  linkTo({
    ios: {
      path: 'myCoupon',
    },
    android: {
      path: 'MyCoupon',
    },
    wechat: {
      url: `/pages/coupon/wraparound/index`,
    },
  });
};
//券包
export const linkToWallet = () => {
  linkTo({
    ios: {
      path: 'rewardBeanWallet',
    },
    android: {
      path: 'myBeanBalancePage',
    },
    wechat: {
      url: `/pages/newUser/wallet/index`,
    },
  });
};
//卡豆钱包
export const linkToPrize = () => {
  linkTo({
    ios: {
      path: 'smallClockRewardList',
      param: {
        channelStyle: 'gameSign',
      },
    },
    android: {
      path: 'ScanClockPrize',
      type: 'gameSign',
    },
    wechat: {
      url: `/pages/blindBox/gamePrize/index?channel=gameSign`,
    },
  });
};
//我的奖品
export const nativeShareSign = (shardingKey) => {
  native.nativeInit('goShare', {
    android: {
      sharePlatform: 'SharePlatformWechatMiniProgram',
      param: {
        subType: 'fillSign',
        shardingKey: shardingKey,
        shareType: 'game',
      },
    },
    ios: {
      sharePlatform: 'wechatFriend',
      param: {
        shardingKey,
        shareType: 'game',
        subType: 'fillSign',
      },
    },
  });
};
// 安卓分享参数
// sharePlatform
// "SharePlatformDialog" ://弹框
// "SharePlatformWechatFriend"://微信好友
// "SharePlatformWechatMiniProgram"://微信小程序
// "SharePlatformWechatMoment"://微信朋友圈
// "SharePlatformWeibo"://微博
// "SharePlatformFamily"://家人(没有逻辑)
// "SharePlatformQQ"://QQ
// "SharePlatformQZone"://QQ空间
// activityFlag："true"   调起三个按钮的分享框（微信，微信好友，保存相册），针对H5活动
// ios分享参数
// shareType 传给后台的参数 放param里
// subType 传给后台的参数 放param里
// shareId  传给后台的参数 放param里
// wechatTypeString 点击微信好友是分享小程序还是h5 传h5，传其他则是小程序
// nativeShowPlatform 调用原生UI需要展示的分享平台
// callType 传native调用原生UI 传其他或不传直接调后台接口
// operateItem 活动分享用到的
// activityFlag 是否活动分享

export const nativeShareWork = (shareId) => {
  native.nativeInit('goShare', {
    android: {
      param: {
        shareType: 'game',
        subType: 'signTaskHelp',
        shareId: shareId,
      },
      sharePlatform: 'SharePlatformWechatMiniProgram',
    },
    ios: {
      sharePlatform: 'wechatFriend',
      param: {
        shareId: shareId,
        shareType: 'game',
        subType: 'signTaskHelp',
      },
    },
  });
};

export const nativeShareBlind = () => {
  native.nativeInit('goShare', {
    android: {
      param: { shareType: 'game', subType: 'blindBoxHelp' },
      sharePlatform: 'SharePlatformWechatMiniProgram',
    },
    ios: {
      sharePlatform: 'wechatFriend',
      param: {
        shareType: 'game',
        subType: 'blindBoxHelp',
      },
    },
  });
};
export const nativeOneVideo = () => {
  linkTo({
    ios: {
      path: 'DKLSmallClockVideoAdController',
      param: { nativeTask: 'game_to_watch_video_once' },
    },
    android: {
      path: 'AdvertisementVideoContainer',
      nativeTask: 'game_to_watch_video_once',
    },
    wechat: {
      url: `/pages/perimeter/nearVideo/index?type=goods&blindBox=true`,
    },
  });
};
export const openWx = () => {
  try {
    native.nativeInit('shareWx', {
      ios: {
        skipSchemes: 'weixin://',
      },
      android: {},
    });
  } catch (e) {
    toast('打开微信失败');
  }
};
//打开微信分享
export const cobyText = (text) => {
  try {
    native.nativeInit('cobyText', {
      ios: {
        shortCommand: text,
      },
      android: { shortCommand: text },
    });
  } catch (e) {
    toast('打开微信失败');
  }
};
//打开微信分享
export const closeAnimate = () => {
  try {
    if (native.getPhone() !== 'miniProgram') {
      native.nativeInit('hideAnimate');
    }
  } catch (e) {}
};
//关闭安卓动画
export const linkToPhone = () => {
  try {
    linkTo({
      ios: {
        path: 'DKLTelephoneRechargeViewController ',
      },
      android: {
        path: 'PhoneRecharge',
      },
      wechat: {
        url: `/pages/perimeter/recharge/index`,
      },
    });
  } catch (e) {}
};
export const linkToMember = () => {
  try {
    linkTo({
      ios: {
        path: 'DKLMemberRechargeViewController',
      },
      android: {
        path: 'MemberRecharge',
      },
      wechat: {
        url: `/pages/perimeter/rechargeMemberList/index`,
      },
    });
  } catch (e) {}
};
