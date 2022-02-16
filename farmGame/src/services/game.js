import request from '@/utils/request';

// get 免费领商品游戏 - 首页
export async function fetchFreeGoodMainPage(params) {
  return request('/user/game/freeGood/mainPage', {
    params,
  });
}

// post 免费领商品游戏 - 首页
export async function fetchFreeGoodBeginGame(data) {
  return request('/user/game/freeGood/beginGame', {
    method: 'POST',
    data,
  });
}

// get 免费领商品游戏 - 领取补贴
export async function fetchFreeGoodGetSupply(params) {
  return request('/user/game/freeGood/getSupply', {
    params,
  });
}

// post 免费领商品游戏 - 补给
export async function fetchFreeGoodGameSupply(data) {
  return request('/user/game/freeGood/gameSupply', {
    method: 'POST',
    data,
  });
}

// get 免费领商品游戏 - 签到信息
export async function fetchFreeGoodGetSignRecord(params) {
  return request('/user/game/freeGood/getSignRecord', {
    params,
  });
}

// post 免费领商品游戏 - 签到
export async function fetchFreeGoodSaveSign(data) {
  return request('/user/game/freeGood/saveSign', {
    method: 'POST',
    data,
  });
}

// get 免费领商品游戏 - 获取合力列表
export async function fetchFreeGoodGetTogetherList(params) {
  return request('/user/game/freeGood/getTogetherList', {
    params,
  });
}

// post 免费领商品游戏 - 退出小队
export async function fetchFreeGoodQuitTeam(data) {
  return request('/user/game/freeGood/quitTeam', {
    method: 'POST',
    data,
  });
}

// get 免费领商品游戏 - 任务列表
export async function fetchTaskGetTaskList(params) {
  return request('/user/game/task/getTaskList', {
    params,
  });
}

// get 免费领商品游戏 - 获取口令
export async function fetchCommandGetCommand(params) {
  return request('/user/command/getCommand', {
    params,
  });
}

// post 免费领商品游戏 - 完成任务
export async function fetchTaskDoneTask(data) {
  return request('/user/game/task/doneTask', {
    method: 'POST',
    data,
  });
}

// get 免费领商品游戏 - 领取任务奖励
export async function fetchTaskReceiveTaskReward(data) {
  return request('/user/game/task/receiveTaskReward', {
    method: 'POST',
    data,
  });
}

// post 免费领商品游戏 - 领取奖励
export async function fetchFreeGoodReceiveGameReward(data) {
  return request('/user/game/freeGood/receiveGameReward', {
    method: 'POST',
    data,
  });
}

// get 免费领商品游戏 - 游戏弹幕
export async function fetchListGameRewardBarrage(params) {
  return request('/common/dictionary/listGameRewardBarrage', {
    params,
  });
}

//权益商品
export const fetchUserShareCommission = (params) => {
  return request('/user/userInfo/getUserShareCommission', {
    params,
  });
};
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
