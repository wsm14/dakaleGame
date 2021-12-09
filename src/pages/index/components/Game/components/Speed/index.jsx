import React from 'react';
import './index.less';
import { ProgressBar } from 'antd-mobile';
import address from '@public/usual/address.png';

function index(props) {
  const { percent = 10 } = props;
  return (
    <div className="speed_box">
      <ProgressBar percent={percent} className="speed_progress" />
      <div className="speed_info">
        <div>再加10次补给，即可到达</div>
        <div className="speed_address">
          <img src={address} alt="" />
          杭州集散中心
        </div>
      </div>
    </div>
  );
}

export default index;
