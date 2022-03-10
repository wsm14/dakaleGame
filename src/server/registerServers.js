import request from '@/utils/request';

export function fetchGameInfo(params) {
  return request('/user/sign/game/getGameInfo', {
    params,
  });
}
//签到游戏首页
export function fetchSignInfo(params) {
  return request('/user/game/sign/getUserSignRecord', {
    params,
  });
}
export function fetchFoodList(params) {
  return request('/user/sign/game/getFoodList', {
    params,
  });
}

export function fetchTaskList(params) {
  return request('/user/game/task/getTaskList', {
    params,
  });
}
//获取任务列表

export function fetchCommand(params) {
  return request('/user/command/getCommand', {
    params,
  });
}
//获取任务列表

//获取口令
export function fakeFeedFood(data) {
  return request('/user/sign/game/feedFood', {
    method: 'POST',
    data,
  });
}
export function fakeSignInfo(data) {
  return request('/user/game/sign/saveSignRecord', {
    method: 'POST',
    data,
  });
}

export function fakeReceiveFeedReward(data) {
  return request('/user/sign/game/receiveFeedReward', {
    method: 'POST',
    data,
  });
}
//领取喂食奖励

export function fakeUpdateUserPersonalSetting(data) {
  return request('/user/personalSetting/updateUserPersonalSetting', {
    method: 'POST',
    data,
  });
}
//领取喂食奖励

export function fakefillSign(data) {
  return request('/user/game/sign/saveUserFillSignRecord', {
    method: 'POST',
    data,
  });
}
//签到补签

export function fetchFilterType(params, headerOther) {
  return request('/user/specialGoods/listSpecialGoodsByFilterType', {
    params,
    headerOther,
  });
}
//爆品福利

export function fetchSelfTourGoods(params, headerOther) {
  return request('/user/specialGoods/getSelfTourGoods', {
    params,
    headerOther,
  });
}
//周边游玩

export const fetchRightGoods = (params, headerOther) => {
  return request('/user/rightGoods/rightGoodsList', {
    params,
    headerOther,
  });
};
//权益商品

export const fetchUserShareCommission = (params) => {
  return request('/user/userInfo/getUserShareCommission', {
    params,
  });
};
//获取卡豆分层信息

export function fakeBlindBoxKeys(data) {
  return request('/user/sign/game/saveBlindBoxKeys', {
    method: 'POST',
    data,
  });
}
//获取盲盒钥匙
export function fetchBoxList(params) {
  return request('/user/sign/game/getBlindBoxList', {
    params,
  });
}
//橱窗列表

export function fetchOpenBlindBox(params) {
  return request('/user/sign/game/openBlindBox', {
    params,
  });
}
//拆盲盒

export function fetchTaskReward(data) {
  return request('/user/game/task/receiveTaskReward', {
    method: 'POST',
    data,
  });
}
//领取任务奖励

export function fakeOperatingLog(data) {
  return request('/common/operatingLog/saveOperatingSystemLog', {
    method: 'POST',
    data,
  });
}
//埋点接口

export function fakeSignGift(data) {
  return request('/user/game/sign/receiveSignGift', {
    method: 'POST',
    data,
  });
}
//领取大礼包
