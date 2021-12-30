import React from 'react';
import { KeepAlive } from 'umi';
import Mine from './Mine';

function index() {
  return (
    <>
      <KeepAlive>
        <Mine></Mine>
      </KeepAlive>
    </>
  );
}

export default index;
