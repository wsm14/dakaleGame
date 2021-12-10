import request from '@/utils/request';

export function fetchGameInfo(params) {
  return request('/user/sign/game/getGameInfo', {
    params,
  });
}
//签到游戏首页
export function fetchSignInfo(params) {
  return request('/user/game/sign/getSignInfo', {
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
  return request('/user/game/sign/saveSignInfo', {
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
  return request('/user/game/sign/fillSign', {
    method: 'POST',
    data,
  });
}
//签到补签
