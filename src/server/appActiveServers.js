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
