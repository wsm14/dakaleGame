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

export const reloadTab = (callback, callback1) => {
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
      callback1 && callback1();
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
export const filterLimit = (number) => {
  if (number < 1) {
    return number * 1000 + 'm';
  } else return number + 'km';
};
function Rad(d) {
  return (d * Math.PI) / 180.0; //经纬度转换成三角函数中度分表形式。
}
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

// 打开地图
export const openMap = (lat, lnt, name) => {
  if (!lat || !lnt) return;
  window.location.href = `https://uri.amap.com/marker?position=${lnt},${lat}&name=${name}`;
};

//换算价格计算
export const computedPrice = (price, scale) => {
  let size = (price * (scale / 100)).toFixed(3);
  size = size.substring(0, size.length - 1);
  if (size === '0.00') {
    return 0.01;
  } else return size;
};

//获取随机数
export const getNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

function isAndroid() {
  var u = navigator.userAgent;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('Adr') > -1) {
    return true;
  }
  return false;
}
function isIos() {
  var u = navigator.userAgent;
  if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1 || u.indexOf('Mac OS') > -1) {
    return true;
  }
  return false;
}
export function getDownload() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    alert('请点击右上角打开浏览器下载');
    return;
  } else {
    if (isAndroid()) {
      if (environment == 'dev') {
        return (window.location.href =
          'https://bundle.dakale.net/android/dev/dakale-android-lastest.apk');
      }
      return (window.location.href =
        'https://buddle-new.dakale.net/android/product/dakale-android-lastest.apk');
    } else if (isIos()) {
      window.location.href = 'https://itunes.apple.com/cn/app/id1521276175?mt=8';
    }
  }
}

export const backgroundObj = function (url) {
  if (url) {
    return {
      background: `url(${url}) no-repeat center/cover`,
    };
  }
  return {};
};

//邀请人的数组
export const filterList = (oldList, count = 2) => {
  let list = [];
  for (let i = 0; i < count; i++) {
    if (oldList[i]) {
      list.push(oldList[i]);
    } else list.push({});
  }
  return list;
};
