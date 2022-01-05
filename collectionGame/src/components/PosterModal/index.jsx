import React from 'react';
import { forwardRef } from 'react';
import './index.less';

const index = forwardRef((props, ref) => {
  return <div className="posterBox" ref={ref}></div>;
});

export default index;
