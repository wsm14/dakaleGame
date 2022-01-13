import React, { useEffect } from 'react';
import { getToken, hideTitle, closeAnimate } from '@/utils/birdgeContent';
import Rules from '@/components/Rules';

import './index.less';

function index() {
  useEffect(() => {
    hideTitle();
    closeAnimate();
  }, []);

  return (
    <>
      <Rules></Rules>
      <div className="load">
        <div className="loadBottom"></div>
      </div>
    </>
  );
}

export default index;
