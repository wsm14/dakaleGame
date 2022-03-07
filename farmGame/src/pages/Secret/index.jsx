import React from 'react';
import './index.less';

import secret1 from '@/asstes/common/secret1.png';
import secret2 from '@/asstes/common/secret2.png';
import secret3 from '@/asstes/common/secret3.png';
import secret4 from '@/asstes/common/secret4.png';
import secret5 from '@/asstes/common/secret5.png';

function index() {
  return (
    <div className="secretContent">
      <img src={secret1} alt="" />
      <img src={secret2} alt="" />
      <img src={secret3} alt="" />
      <img src={secret4} alt="" />
      <img src={secret5} alt="" />
    </div>
  );
}
import './index.less';

export default index;
