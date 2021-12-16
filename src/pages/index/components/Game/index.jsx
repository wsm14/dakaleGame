import React from 'react';
import { KeepAlive } from 'umi';
import TargetGame from './components/TargetGame';

function index(props) {
  const { imgObj, getHomeDetail } = props;

  return (
    <div>
      <KeepAlive>
        <TargetGame imgObj={imgObj} getHomeDetail={getHomeDetail}></TargetGame>
      </KeepAlive>
    </div>
  );
}

export default index;
