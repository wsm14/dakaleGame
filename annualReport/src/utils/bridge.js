import { Toast } from 'antd-mobile';
/*
 * bridge android桥接库
 * nativeOther 封装
 * this.ios，
 * this.android调用方法名称
 * getPhone 获取设备型号
 * dsBridgeSynchro 安卓同步桥接
 * dsBridgeAsyc 安卓异步桥接
 * nativeInit 安卓通用方法
 * */
var bridge = {
  default: this,
  call: function (b, a, c) {
    var e = '';
    'function' == typeof a && ((c = a), (a = {}));
    a = { data: void 0 === a ? null : a };
    if ('function' == typeof c) {
      var g = 'dscb' + window.dscb++;
      window[g] = c;
      a._dscbstub = g;
    }
    a = JSON.stringify(a);
    if (window._dsbridge) e = _dsbridge.call(b, a);
    else if (window._dswk || -1 != navigator.userAgent.indexOf('_dsbridge'))
      e = prompt('_dsbridge=' + b, a);
    return JSON.parse(e || '{}').data;
  },
  register: function (b, a, c) {
    c = c ? window._dsaf : window._dsf;
    window._dsInit ||
      ((window._dsInit = !0),
      setTimeout(function () {
        bridge.call('_dsb.dsinit');
      }, 0));
    'object' == typeof a ? (c._obs[b] = a) : (c[b] = a);
  },
  registerAsyn: function (b, a) {
    this.register(b, a, !0);
  },
  hasNativeMethod: function (b, a) {
    return this.call('_dsb.hasNativeMethod', { name: b, type: a || 'all' });
  },
  disableJavascriptDialogBlock: function (b) {
    this.call('_dsb.disableJavascriptDialogBlock', { disable: !1 !== b });
  },
};
!(function () {
  if (!window._dsf) {
    var b = {
        _dsf: { _obs: {} },
        _dsaf: { _obs: {} },
        dscb: 0,
        dsBridge: bridge,
        close: function () {
          bridge.call('_dsb.closePage');
        },
        _handleMessageFromNative: function (a) {
          var e = JSON.parse(a.data),
            b = { id: a.callbackId, complete: !0 },
            c = this._dsf[a.method],
            d = this._dsaf[a.method],
            h = function (a, c) {
              b.data = a.apply(c, e);
              bridge.call('_dsb.returnValue', b);
            },
            k = function (a, c) {
              e.push(function (a, c) {
                b.data = a;
                b.complete = !1 !== c;
                bridge.call('_dsb.returnValue', b);
              });
              a.apply(c, e);
            };
          if (c) h(c, this._dsf);
          else if (d) k(d, this._dsaf);
          else if (((c = a.method.split('.')), !(2 > c.length))) {
            a = c.pop();
            var c = c.join('.'),
              d = this._dsf._obs,
              d = d[c] || {},
              f = d[a];
            f && 'function' == typeof f
              ? h(f, d)
              : ((d = this._dsaf._obs),
                (d = d[c] || {}),
                (f = d[a]) && 'function' == typeof f && k(f, d));
          }
        },
      },
      a;
    for (a in b) window[a] = b[a];
    bridge.register('_hasJavascriptMethod', function (a, b) {
      b = a.split('.');
      if (2 > b.length) return !(!_dsf[b] && !_dsaf[b]);
      a = b.pop();
      b = b.join('.');
      return (b = _dsf._obs[b] || _dsaf._obs[b]) && !!b[a];
    });
  }
})();

function nativeOther() {
  this.ios = {
    saveFile: 'storeImageAndShare', //保存图片
    close: 'finish', //关闭
    hideTitle: 'hideTitle', //隐藏头部
    linkTo: 'goNativePage', //页面挑战
    getToken: 'getToken', //获取token
    getCode: 'goNativePage', //扫码打卡
    savePay: 'DKLOrderPayInfoController', //支付页 参数 marketCouponId
    goLogin: 'goNativePage', //qu登录
    goShare: 'callUpShare', //分享
    merchatRule: 'userMerchantProtocol', //商家协议
    getNoviteStatus: 'getAnnouncementReadStatus', //获取通知
    setNoviteStatus: 'updateAnnouncementReadStatus', //设置通知
    setRetail: 'setRetail', //是否同意分销权益
    getClientVersion: 'getClientVersion', //获取版本号
    getUserLocationInfo: 'getUserLocationInfo', //获取用户定位信息，
    mapGo: 'showMerchantNavigationLatAndLnt', //调取 app地图
    getTop: 'getIphoneSafeTopHeight',
    tabBar: 'goNativeRootPageFromIndex', //跳转主页
    hideLoadAnimation: 'hideLoadAnimation',
    shareWx: 'skipAnyApplication',
    cobyText: 'copyPasteBoard',
  };
  this.android = {
    saveFile: 'saveFile', //保存图片
    close: 'finish', //关闭
    hideTitle: 'hideTitle', //隐藏头部
    linkTo: 'goNativePage', //路径跳转
    getToken: 'getToken',
    getCode: 'openScan', //唤起扫码
    savePay: 'goNativePage', //支付页 参数 marketCouponId
    goLogin: 'goLogin', //登录
    goShare: 'share', //分享
    merchatRule: 'agreeLoginMerchantsRule', //商家协议
    getNoviteStatus: 'getNotice', //获取通知
    setNoviteStatus: 'saveNotice', //设置通知
    setRetail: 'setRetail', //是否同意分销权益
    getClientVersion: 'getClientVersion', //获取版本号
    getUserLocationInfo: 'getLatAndLnt', //获取用户定位信息
    mapGo: 'getNavi', //调取 app地图
    getTop: 'getTopHeight',
    tabBar: 'goNativeRootPageFromIndex', //跳转主页
    shareWx: 'openWechat',
    hideAnimate: 'hideLoadAnimation', //隐藏开始动画
    cobyText: 'copyPasteBoard',
  };
  this.wechat = {
    linkTo: 'navigateTo', //路径跳转
    getUserLocationInfo: 'getLocation', //获取用户定位信息
    redirectTo: 'redirectTo',
  };
  this.getPhone = function () {
    var u = navigator.userAgent.toLowerCase();
    if (/miniProgram/i.test(u)) return 'miniProgram';
    // 小程序
    else if (u.indexOf('ios/dakale') > -1) return 'dakaleIOS';
    // 用户端ios
    else if (u.indexOf('android/dakale') > -1) return 'dakaleAndroid';
    // 用户端android
    else if (u.indexOf('micromessenger') > -1) return 'wxChatWebView'; // 微信浏览器
    return false;
  };
  this.dsBridgeSynchro = function (fnName, params) {
    if (params && Object.keys(params).length > 0) {
      return bridge.call(fnName, JSON.stringify(params));
    }
    bridge.call(fnName, '');
  }; //同步调用安卓
  this.dsBridgeAsyc = function (fnName, params, callback) {
    if (Object.keys(params).length > 0) {
      return bridge.call(fnName, JSON.stringify(params), function (res) {
        callback(res);
      });
    }
    return bridge.call(fnName, function (res) {
      callback(res);
    });
  }; //异步调用安卓
  this.nativeInit = function (fnName, param, callback) {
    let that = this;
    if (that.getPhone() === 'dakaleAndroid') {
      fnName = that.android[fnName];
      if (callback && typeof callback == 'function') {
        if (param && param.ios && param.android) {
          param = param.android;
        }
        that.dsBridgeAsyc(fnName, param, callback);
      } else {
        if (param && Object.keys(param).length > 0) {
          if (param.ios && param.android) {
            param = param.android;
          }
          try {
            return that.dsBridgeSynchro(fnName, param);
          } catch (e) {
            Toast.show({
              content: '请下载新版APP体验此功能',
            });
          }
        } else {
          try {
            that.dsBridgeSynchro(fnName);
          } catch (e) {
            Toast.show({
              content: '请下载新版APP体验此功能',
            });
          }
        }
      }
    } else if (that.getPhone() === 'miniProgram') {
      fnName = that.wechat[fnName];
      if (fnName) {
        wx.miniProgram[fnName]({ ...param.wechat });
      }
    } else {
      fnName = that.ios[fnName];
      if (callback && typeof callback == 'function') {
        if (param && param.ios && param.android) {
          param = param.ios;
        }
        callback(window.prompt(fnName, JSON.stringify(param)));
      } else {
        if (param && Object.keys(param).length > 0) {
          if (param.ios && param.android) {
            param = param.ios;
          }
          return window.webkit.messageHandlers[fnName].postMessage(JSON.stringify(param));
        }
        window.webkit.messageHandlers[fnName].postMessage('');
      }
    }
  };
  this.getUrlKey = function (name) {
    return (
      decodeURIComponent(
        (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [
          ,
          '',
        ])[1].replace(/\+/g, '%20'),
      ) || null
    );
  };

  this.getNavites = function (obj, callback) {
    let that = this;
    that.nativeInit('getNoviteStatus', obj, callback);
  };
  this.setNavites = function (obj) {
    let that = this;
    that.nativeInit('setNoviteStatus', obj);
  };
}

export default new nativeOther();
