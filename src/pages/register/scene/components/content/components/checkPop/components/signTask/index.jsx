import React, { useState, useEffect } from 'react';
import Drawer from '@/components/drawer';
import classNames from 'classnames';
import { deviceName, linkToShipCardPage } from '@/utils/birdgeContent';
import './index.less';
export default (props) => {
  const { onClose, onOpenSign, data, fetchUserCommand } = props;
  const { fillBean } = data;
  const list = [
    {
      label: '邀请好友',
      desc: '每日邀请1位新用户可得1次补签机会',
      iconStyle: 'sign_shareFriend',
      bgStyle: 'taskLine_browers',
      btnName: '去完成',
      visible: true,
      fn: () => {
        fetchUserCommand(data);
      },
    },
    {
      label: '卡豆兑换',
      desc: `每周可使用${fillBean}卡豆兑换1次补签机会`,
      iconStyle: 'sign_shareBean',
      bgStyle: 'taskLine_free',
      btnName: '去兑换',
      visible: true,
      fn: () => {
        onOpenSign();
      },
    },
    {
      label: '开通周卡',
      desc: '开通周卡可获得免费补签1次',
      iconStyle: 'sign_shareCard',
      bgStyle: 'taskLine_free',
      visible: deviceName() === 'miniProgram' ? false : true,
      btnName: '去完成',
      fn: () => {
        linkToShipCardPage();
      },
    },
  ];
  return (
    <Drawer className="growPop_pack_radius" bodyClassName="growPop_pack_radius" {...props}>
      <div className="signTask_box">
        <div
          className="signTask_close"
          onClick={() => {
            onClose();
          }}
        ></div>
        <div className="signTask_title"></div>
        <div className="signTask_content">
          {list.map((item, index) => {
            const { bgStyle, label, desc, iconStyle, btnName, fn, visible } = item;
            if (visible) {
              return (
                <div
                  onClick={() => fn && fn()}
                  className={`growPop_content_list ${bgStyle}`}
                  key={index}
                >
                  <div className={classNames('growPop_content_profile', iconStyle)}></div>
                  <div className="growPop_content_body">
                    <div className="growPop_body_name">{label}</div>
                    <div className="growPop_body_desc">{desc}</div>
                  </div>
                  <div className="growPop_body_btn growPop_body_btn1">{btnName}</div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </Drawer>
  );
};
