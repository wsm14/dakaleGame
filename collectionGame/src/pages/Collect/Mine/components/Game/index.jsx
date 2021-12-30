import React from 'react';
import { KeepAlive } from 'umi';
import CheckCards from './components/CheckCards';
import GetCards from './components/GetCards';

function index() {
  return (
    <>
      {/* <CheckCards></CheckCards> */}
      <GetCards></GetCards>
    </>
  );
}

export default index;
