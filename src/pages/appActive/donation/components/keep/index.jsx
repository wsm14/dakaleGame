import React, { useState, useEffect } from 'react';
import Mask from '@/components/mask';
import { linkTo } from '@/utils/birdgeContent';
import className from 'classnames';
import './index.less';
export default (props) => {
  const { onClose, data } = props;
  const { list } = data;
  const keepList = (item) => {
    const { userName, donateBean, createTime } = item;
    return (
      <div className="keep_mask_listBox">
        <div className="keep_mask_one">
          <div className="keep_mask_oneLeft">{userName}</div>
          <div className="keep_mask_oneRight">捐赠{donateBean}卡豆</div>
        </div>
        <div className="keep_mask_two">{createTime}</div>
      </div>
    );
  };
  return (
    <Mask {...props}>
      <div className="keep_mask">
        <div className="keep_mask_title">捐赠记录</div>
        {list.map((item) => {
          return keepList(item);
        })}
      </div>
    </Mask>
  );
};
