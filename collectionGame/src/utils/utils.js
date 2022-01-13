import cityJson from '@/common/cityJson';
import { cobyText } from '@/utils/birdgeContent';
import { Toast } from 'antd-mobile';

// 获取城市名
export const getCityName = (code) => {
  const cityIndex = cityJson.findIndex((item) => item.id === code);
  return cityJson[cityIndex]?.name;
};
// 根据城市code获取城市名称
export const checkCityName = (code) => {
  if (!code) return;
  const checkCityNull = (val) => (val ? '-' + val : '');
  const codeStr = `${code}`;
  if (codeStr.length === 2) {
    return getCityName(codeStr);
  } else if (codeStr.length === 4) {
    const city = getCityName(codeStr);
    return `${getCityName(codeStr.slice(0, 2))}${checkCityNull(city)}`;
  } else if (codeStr.length === 6) {
    const citySix = getCityName(codeStr.slice(0, 4));
    const district = getCityName(codeStr);
    return `${getCityName(codeStr.slice(0, 2))}${checkCityNull(citySix)}${checkCityNull(district)}`;
  }
};

//复制文字
export const cobyInfo = (data, val, callback) => {
  cobyText(data);
  callback && callback(val);
};

export const reloadTab = (callback) => {
  let hiddenProperty =
    'hidden' in document
      ? 'hidden'
      : 'webkitHidden' in document
      ? 'webkitHidden'
      : 'mozHidden' in document
      ? 'mozHidden'
      : null;
  document.addEventListener('visibilitychange', () => {
    console.log(document[hiddenProperty]);
    if (document[hiddenProperty]) {
      //当离开H5 跳转到app原生的页面时,这里会被触发
    } else {
      //当从原生页面用户一系列操作后,返回H5的时候,这里会被触发
      console.log(1111111);
      callback && callback();
    }
  });
};

//获取年月日
export const formatTime = (time) => {
  if (time) {
    time = time.replace(/\-/g, '/');
    let date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return { year, month, day, hour, minutes };
  }
};

//获取年月日1
export const formatTime1 = (time) => {
  if (time) {
    let date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return { year, month, day, hour, minutes };
  }
};
