import request from '@/utils/request';

// get 年度报告
export async function fetchReportGetAnnualReport(params) {
  return request('/user/annual/report/getAnnualReport', {
    params,
  });
}
