const LoginForm = {
  namespace: 'login',

  state: {
    status: undefined,
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, status: 'ok', type: payload.type };
    },
  },
  effects: {
    *login({ payload, callback }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      if (!response) return;

      const {
        content: { adminAccount },
      } = response;
      window.sessionStorage.setItem('token', adminAccount.token);
      callback();
    },
  },
};

export default LoginForm;
