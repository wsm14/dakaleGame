import request from '@/utils/request';

// get 年度报告
export async function fetchReportGetAnnualReport(params) {
  return request('/user/annual/report/getAnnualReport', {
    params,
  });
}

// get 年度报告 - 分享接口(新)
export async function fetchShareGetNewShareInfo(params) {
  return request('/common/share/getNewShareInfo', {
    params,
  });
}

// get 美莱商品信息接口
export async function fetchGetMeilaiActivity(params) {
  return request('/user/activity/meilaiActivity', {
    params,
  });
}

// get 哒人比例
export async function fetchGetUserShareCommission(params) {
  return request('/user/userInfo/getUserShareCommission', {
    params,
  });
}

// get 微信SDK
export async function fetchWechatTicket(params) {
  return request('/user/wechat/fetchWechatTicket', {
    params,
  });
}
