import React, { useState, useEffect } from 'react';
import Mask from '@/components/mask';
import { linkTo } from '@/utils/birdgeContent';
import className from 'classnames';
import './index.less';
export default (props) => {
  const { onClose } = props;
  const [checkIndex, setChenkIndex] = useState(0);
  const list = [
    { key: 0, val: 10 },
    { key: 0, val: 50 },
    { key: 0, val: 100 },
    { key: 0, val: 200 },
    { key: 0, val: 2000 },
    { key: 0, val: 5000 },
  ];
  return (
    <Mask {...props}>
      <div className="save_bean_mask">
        <div className="save_bean_title">捐赠数量</div>
        <div className="save_bean_select">
          {list.map((item, index) => {
            return (
              <div
                className={className(
                  checkIndex === index
                    ? 'save_bean_selectBox save_bean_selectColor2'
                    : 'save_bean_selectBox save_bean_selectColor1',
                )}
              >
                {item.val}
              </div>
            );
          })}
        </div>
        <div className="save_bean_video">卡豆不足，可刷视频捡豆</div>
        <div className="save_bean_btn">我要捐赠</div>
        <div className="save_bean_yn">卡豆余额：3000000</div>
      </div>
    </Mask>
  );
};
