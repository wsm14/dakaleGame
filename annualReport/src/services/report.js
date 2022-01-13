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
