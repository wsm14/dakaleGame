import request from '@/utils/request';

export function fetchUserAcquiredPlatformGift(params) {
  return request('/user/user/platform/gift/getUserAcquiredPlatformGift', {
    params,
  });
}
//获取券详情

export function fetchUserPopUpCommerceGoods(params) {
  return request('/user/commerceGoods/getNewUserPopUpCommerceGoods', {
    params,
  });
}
//获取券详情

export function fetchLoveDonateRecord(params) {
  return request('/user/loveDonate/listUserLoveDonateRecord', {
    params,
  });
}
//获取用户捐赠记录
export function fakeLoveDonate(data) {
  return request('/user/loveDonate/userBeanLoveDonate', {
    method: 'POST',
    data,
  });
}
//用户捐赠
