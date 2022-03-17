import React, { useState, useEffect } from 'react';
import Mask from '@/components/mask';
import { linkTo } from '@/utils/birdgeContent';
import className from 'classnames';
import './index.less';
export default (props) => {
  const { onClose, list } = props;
  const keepList = () => {
    return (
      <div className="keep_mask_listBox">
        <div className="keep_mask_one">
          <div className="keep_mask_oneLeft">哒卡乐徐伟峰</div>
          <div className="keep_mask_oneRight">捐赠1000卡豆</div>
        </div>
        <div className="keep_mask_two">2022/03/04 09:20:38</div>
      </div>
    );
  };
  return (
    <Mask {...props}>
      <div className="keep_mask">
        <div className="keep_mask_title">捐赠记录</div>
        {list.map((item) => {
          return keepList();
        })}
      </div>
    </Mask>
  );
};
