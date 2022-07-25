import request from '@/utils/request';

//获取用户抵扣信息
export const fetchUserShareCommission = (params) => {
  return request('/user/userInfo/getUserShareCommission', {
    params,
  });
};

//本地生活品商品列表;
export const fetchEsOfflineGoodsByDisplay = (params) => {
  return request('/user/offline/goods/listEsOfflineGoodsByDisplay', {
    params,
  });
};

//线上电商品商品列表
export const fetchEsOnlineGoodsByDisplay = (params) => {
  return request('/user/online/goods/listEsOnlineGoodsByDisplay', {
    params,
  });
};

// get 查询用户默认地址
export async function fetchUserDefaultAddress(params) {
  return request('/user/user/address/getUserDefaultAddress', {
    params,
  });
}

// POST 裂变领取奖励
export async function fetchReceiveReward(data) {
  return request('/user/activity/fission/reward/new/receiveReward', {
    method: 'POST',
    data,
  });
}

//裂变模板详情
export const fetchGetFissionTemplate = (params) => {
  return request('/user/activity/fission/query/getFissionTemplate', {
    params,
  });
};

// get  - 获取口令
export async function fetchCommandGetCommand(params) {
  return request('/user/command/getCommand', {
    params,
  });
}

// POST 裂变助力
export async function fetchInvitationUser(data) {
  return request('/user/activity/fission/help/new/invitationUser', {
    method: 'POST',
    data,
  });
}

// get  - 获取口令
export async function fetchGetShareUserInfo(params) {
  return request('/user/userInfo/getShareUserInfo', {
    params,
  });
}
