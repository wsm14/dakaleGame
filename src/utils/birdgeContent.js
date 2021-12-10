import native from './bridge';
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
export const getToken = (fn) => {
  try {
    if (native.getPhone() === 'miniProgram') {
    } else {
      native.nativeInit('getToken', {}, (res) => {
        if (res && res.length > 0) {
          fn && fn(res);
        } else {
          getLogin();
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
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
