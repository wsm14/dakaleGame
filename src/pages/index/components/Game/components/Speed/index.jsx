import React from 'react';
import './index.less';
import { ProgressBar } from 'antd-mobile';
import { ARRIVEL_ADDRESS } from '@/common/goods';
import address from '@public/usual/address.png';
import { getCityName } from '@/utils/utils';

function index(props) {
  const { processInfo, cityCode } = props;
  const {
    supplyProcess, //进度
    supplyLevel, //等级
    supplyLimit, //上限
  } = processInfo;

  return (
    <div className="speed_box">
      <ProgressBar
        percent={
          supplyLevel > 0
            ? (supplyProcess / 100).toFixed(2)
            : (supplyProcess / supplyLimit).toFixed(2) * 100
        }
        className="speed_progress"
      />
      <div className="speed_info">
        {supplyLevel > 0 ? (
          <div>运输再补给{(100 - supplyProcess / 100).toFixed(2)}%,即可到达</div>
        ) : (
          <div>再加{10 - supplyProcess}次补给，即可到达</div>
        )}

        <div className="speed_address">
          <img src={address} alt="" />
          {getCityName(cityCode)}
          {ARRIVEL_ADDRESS[supplyLevel]}
        </div>
      </div>
    </div>
  );
}

export default index;
