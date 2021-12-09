const LoginForm = {
  namespace: 'receiveGoods',

  state: {
    type: 'loding', //页面的显示  loading-加载页面 checkGoods-选择商品页面  receiveGoods-开始补给页面
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {},
};

export default LoginForm;
