const LoginForm = {
  namespace: 'receiveGoods',

  state: {
    type: 'loding', //页面的显示  loading-加载页面 checkGoods-选择商品页面  startSupply--开始补给   game-游戏
    homeDetail: {}, //首页数据
    packageObj: {}, //商品信息
    addressObj: {}, //地址信息
    orderVisible: false,
    gameHeight: 70,
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchSetAddressObj({ payload, callback }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          addressObj: payload.addressObj,
        },
      });
      callback && callback();
    },
  },
};

export default LoginForm;
