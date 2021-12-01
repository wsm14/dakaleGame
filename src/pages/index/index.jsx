import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Button } from 'antd-mobile-v5';
import './index.less';
const LoginForm = ({ dispatch, loading }) => {
  useEffect(() => {}, []);

  return (
    <div>
      <Button className="test">23123</Button>
    </div>
  );
};

export default connect(({ loading }) => ({ loading }))(LoginForm);
