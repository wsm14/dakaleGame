import request from '@/utils/request';

// get 查询用户默认地址
export async function fetchUserDefaultAddress(params) {
  return request('/user/user/address/getUserDefaultAddress', {
    params,
  });
}

// get 查询用户默认地址
export async function fetchAddressListUserAddress(params) {
  return request('/user/user/address/listUserAddress', {
    params,
  });
}

// get 免费领商品游戏 - 获取奖品信息
export async function fetchFreeGoodGetFreeGoodInfo(params) {
  return request('/user/game/freeGood/getFreeGoodInfo', {
    params,
  });
}

// post 免费领商品游戏 - 设置地址信息
export async function fetchFreeGoodSetRewardAddress(data) {
  return request('/user/game/freeGood/setRewardAddress', {
    method: 'POST',
    data,
  });
}
