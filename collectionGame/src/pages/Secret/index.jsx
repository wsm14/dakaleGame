import React from 'react';
import './index.less';

import secret1 from '@public/image/secret1.png';
import secret2 from '@public/image/secret2.png';
import secret3 from '@public/image/secret3.png';

function index() {
  return (
    <div className="secretContent">
      <img src={secret1} alt="" className="secretImg1" />
      <img src={secret2} alt="" className="secretImg2" />
      <img src={secret3} alt="" className="secretImg3" />
    </div>
  );
}
import './index.less';

export default index;
