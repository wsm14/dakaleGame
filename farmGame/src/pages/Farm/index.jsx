import React, { useEffect } from 'react';
import { hideTitle, closeAnimate } from '@/utils/birdgeContent';
import Views from './components/index';
import { KeepAlive } from 'umi';
function index() {
  useEffect(() => {
    hideTitle();
    closeAnimate();
  }, []);

  return (
    <>
      <KeepAlive>
        <Views></Views>
      </KeepAlive>
    </>
  );
}

export default index;
