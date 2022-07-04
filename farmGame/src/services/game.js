import request from '@/utils/request';

// get 卡豆农场 - 首页
export async function fetchFarmMainPage(params) {
  return request('/user/game/farm/mainPage', {
    params,
  });
}
// post 卡豆农场 - 开始游戏
export async function fetchFarmBeginGame(data) {
  return request('/user/game/farm/beginGame', {
    method: 'POST',
    data,
  });
}

// get 卡豆农场 - 获取合力列表
export async function fetchFarmGetTeamList(params) {
  return request('/user/game/farm/getTeamList', {
    params,
  });
}

// post 卡豆农场 - 退出小队
export async function fetchFarmQuitTeam(data) {
  return request('/user/game/farm/quitTeam', {
    method: 'POST',
    data,
  });
}

// get 卡豆农场 - 查看卡豆旅行奖励(分页)

export async function fetchFarmGetTravelRewardListPage(params) {
  return request('/user/game/farm/getTravelRewardListPage', {
    params,
  });
}

// POST 卡豆农场 - 施肥

export async function fetchFarmSpreadManure(data) {
  return request('/user/game/farm/spreadManure', {
    method: 'POST',
    data,
  });
}

// POST 卡豆农场 - 领取奖励

export async function fetchFarmReceiveReward(data) {
  return request('/user/game/farm/receiveReward', {
    method: 'POST',
    data,
  });
}

// Post 卡豆农场 - 查看卡豆旅行奖励

export async function fetchFarmGetReceiveTravelReward(data) {
  return request('/user/game/farm/receiveTravelReward', {
    method: 'POST',
    data,
  });
}

// Post 卡豆农场 - 加入队伍

export async function fetchFarmJoinTeam(data) {
  return request('/user/game/farm/joinTeam', {
    method: 'POST',
    data,
  });
}

// post 游戏 - 完成任务
export async function fetchTaskDoneTask(data) {
  return request('/user/game/task/doneTask', {
    method: 'POST',
    data,
  });
}

// get 卡豆农场 - 获取奖品信息

export async function fetchFarmGetFarmReward(params) {
  return request('/user/game/farm/getFarmReward', {
    params,
  });
}

// get 卡豆农场 - 分享接口(新)
export async function fetchShareGetNewShareInfo(params) {
  return request('/common/share/getNewShareInfo', {
    params,
  });
}
//
//
//
//
//
//
//
//
//
//
//

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

// get 免费领商品游戏 - 领取任务奖励
export async function fetchTaskReceiveTaskReward(data) {
  return request('/user/game/task/receiveTaskReward', {
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

//数据埋点
export const fakeOperatingLog = (params, headerOther) => {
  return request('/common/operatingLog/saveOperatingSystemLog', {
    params,
    headerOther,
  });
};

export const fetchEsOnlineGoodsByDisplay = (params) => {
  return request('/user/online/goods/listEsOnlineGoodsByDisplay', {
    params,
  });
};
//线上电商品商品列表
export const fetchEsOfflineGoodsByDisplay = (params) => {
  return request('/user/offline/goods/listEsOfflineGoodsByDisplay', {
    params,
  });
};
//本地生活品商品列表;
