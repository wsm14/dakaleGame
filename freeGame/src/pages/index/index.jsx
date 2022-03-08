import React from 'react';
import View from './components/index';
import { KeepAlive } from 'umi';

const index = () => {
  return (
    <>
      <KeepAlive>
        <View></View>
      </KeepAlive>
    </>
  );
};

export default index;
