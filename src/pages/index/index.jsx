import React, { useEffect } from 'react';
import { connect } from 'umi';
import './index.less';
const LoginForm = ({ dispatch, loading }) => {
  useEffect(() => {}, []);

  return <div className="test"></div>;
};

export default connect(({ loading }) => ({ loading }))(LoginForm);
