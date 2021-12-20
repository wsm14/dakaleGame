import { Toast } from 'antd-mobile';
import { cobyText } from './birdgeContent';
export const toast = (val, fn) => {
  Toast.show({
    content: val,
    afterClose: () => {
      fn && fn();
    },
  });
};

export const computedSeconds = (s) => {
  if (s < 0) {
    return;
  }
  var sTime = parseInt(s); // 秒
  var mTime = 0; // 分
  var hTime = 0; // 时
  if (sTime > 60) {
    //如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    mTime = parseInt(sTime / 60);
    //获取秒数，秒数取佘，得到整数秒数
    sTime = parseInt(sTime % 60);
    //如果分钟大于60，将分钟转换成小时
    if (mTime > 60) {
      //获取小时，获取分钟除以60，得到整数小时
      hTime = parseInt(mTime / 60);
      //获取小时后取佘的分，获取分钟除以60取佘的分
      mTime = parseInt(mTime % 60);
    }
  }
  var result = '';
  if (sTime >= 0 && sTime < 10) {
    result = '0' + parseInt(sTime) + '';
  } else {
    result = '' + parseInt(sTime) + '';
  }
  if (mTime >= 0 && mTime < 10) {
    result = '0' + parseInt(mTime) + ':' + result;
  } else {
    result = '' + parseInt(mTime) + ':' + result;
  }
  if (hTime >= 0 && hTime < 10) {
    result = '0' + parseInt(hTime) + ':' + result;
  } else {
    result = '' + parseInt(hTime) + ':' + result;
  }
  if (result) {
    return result;
  } else {
    return null;
  }
};
export const pxComputed = (val) => {
  return (window.innerWidth / 375) * val;
};
export const cobyInfo = (text, callback) => {
  cobyText(text);
  callback && callback();
};
export const backgroundObj = function (url) {
  if (url) {
    return {
      background: `url(${url}) no-repeat center/cover`,
    };
  }
  return {};
};
function Rad(d) {
  return (d * Math.PI) / 180.0; //经纬度转换成三角函数中度分表形式。
}
export const filterLimit = (number) => {
  if (number < 1) {
    return number * 1000 + 'm';
  } else return number + 'km';
};
export const GetDistance = function (lat1, lng1, lat2, lng2) {
  let radLat1 = Rad(lat1) || Rad(30.264561);
  let radLat2 = Rad(lat2);
  let radLng1 = Rad(lng1) || Rad(120.170189);
  let radLng2 = Rad(lng2);
  let a = radLat1 - radLat2;
  let b = radLng1 - radLng2;
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2),
      ),
    );
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000; //输出为公里
  s = s.toFixed(2);
  if (s && s !== 'NaN') {
    return filterLimit(s);
  } else {
    return null;
  }
};
////地理位置

export const computedLimit = function (lat1, lng1, lat2, lng2) {
  let radLat1 = Rad(lat1) || Rad(30.264561);
  let radLat2 = Rad(lat2);
  let radLng1 = Rad(lng1) || Rad(120.170189);
  let radLng2 = Rad(lng2);
  let a = radLat1 - radLat2;
  let b = radLng1 - radLng2;
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2),
      ),
    );
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000; //输出为公里
  s = s.toFixed(2);
  return s * 1000;
};
export const computedPrice = (price, scale) => {
  let size = (price * (scale / 100)).toFixed(3);
  size = size.substring(0, size.length - 1);
  if (size === '0.00') {
    return 0.01;
  } else return size;
};
//换算价格计算

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
    if (document[hiddenProperty]) {
      //当离开H5 跳转到app原生的页面时,这里会被触发
    } else {
      //当从原生页面用户一系列操作后,返回H5的时候,这里会被触发
      callback && callback();
    }
  });
};
