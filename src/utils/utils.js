import { Toast } from 'antd-mobile';
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
export const cobyInfo = (data, callback) => {
  const copyDOMs = document.createElement('span');
  copyDOMs.innerHTML = data;
  document.body.appendChild(copyDOMs);
  const range = document.createRange();
  window.getSelection().removeAllRanges();
  range.selectNode(copyDOMs);
  window.getSelection().addRange(range);
  const suessUrl = document.execCommand('copy');
  if (suessUrl) {
    callback && callback();
  } else {
    toast('复制失败');
  }
  document.body.removeChild(copyDOMs);
};
