import request from '@/utils/request';

// get 集碎片 - 游戏首页
export async function fetchGatherMainPage(params) {
  return request('/user/game/gather/gatherMainPage', {
    params,
  });
}

// post 集碎片 - 开始游戏
export async function fetchBeginGatherGame(data) {
  return request('/user/game/gather/beginGatherGame', {
    method: 'POST',
    data,
  });
}

// get 集碎片 - 抽奖
export async function fetchGatherLuckDraw(data) {
  return request('/user/game/gather/luckDraw', {
    method: 'POST',
    data,
  });
}

// get 集碎片 - 我的福卡
export async function fetchGatherGetMyHarvest(params) {
  return request('/user/game/gather/getMyHarvest', {
    params,
  });
}

// post 集碎片 - 兑换福卡
export async function fetchGatherExchangeCard(data) {
  return request('/user/game/gather/exchangeCard', {
    method: 'POST',
    data,
  });
}

// get 集碎片 - 开奖
export async function fetchGathergetLuckReward(data) {
  return request('/user/game/gather/getLuckReward', {
    method: 'POST',
    data,
  });
}

// get 集碎片 - 任务列表
export async function fetchTaskGetTaskList(params) {
  return request('/user/game/task/getTaskList', {
    params,
  });
}

// get 集碎片 - 任务卡豆兑换
export async function fetchTaskExchangeBalance(data) {
  return request('/user/game/task/exchangeBalance', {
    method: 'POST',
    data,
  });
}

// get 集碎片 - 获取口令
export async function fetchCommandGetCommand(params) {
  return request('/user/command/getCommand', {
    params,
  });
}

// post 集碎片 - 完成任务
export async function fetchTaskDoneTask(data) {
  return request('/user/game/task/doneTask', {
    method: 'POST',
    data,
  });
}

// get 集碎片 - 领取任务奖励
export async function fetchTaskReceiveTaskReward(data) {
  return request('/user/game/task/receiveTaskReward', {
    method: 'POST',
    data,
  });
}

// get 集碎片 - 游戏弹幕
export async function fetchListGameRewardBarrage(params) {
  return request('/common/dictionary/listGameRewardBarrage', {
    params,
  });
}

// get 集碎片 - 转赠
export async function fetchGatherReceiveOthersCard(data) {
  return request('/user/game/gather/receiveOthersCard', {
    method: 'POST',
    data,
  });
}

// get 集碎片 - 分享接口(新)
export async function fetchShareGetNewShareInfo(params) {
  return request('/common/share/getNewShareInfo', {
    params,
  });
}
