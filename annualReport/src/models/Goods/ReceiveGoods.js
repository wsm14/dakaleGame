const LoginForm = {
  namespace: 'receiveGoods',

  state: {
    addressObj: {}, //地址信息
    addressBol: false,
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
