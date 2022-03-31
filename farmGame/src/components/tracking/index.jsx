/*
  children 要记录埋点事件的按钮 note
  type 埋点类型 String
  args 携带埋点参数 object
  name 按钮映射的标注  
*/
import React, { useImperativeHandle } from 'react';
import { fakeOperatingLog } from '@/services/game';
import { history } from 'umi';
export default ({ children, type = 'click', args = {}, name, style, blockName, cRef = null }) => {
  useImperativeHandle(cRef, () => ({
    setHandleOpen: (e) => {
      handleOpen(e);
    },
  }));
  const handleOpen = (obj) => {
    const pageName = history;
    const userData = {
      channel: 'wechat',
      actionType: type,
      blockName: blockName,
      time: Date.parse(new Date()),
      extraParams: JSON.stringify(args),
      actionName: name,
      pageName: pageName,
      ...obj,
    };
    const list =
      (window.sessionStorage.getItem('operatingLog') &&
        JSON.parse(window.sessionStorage.getItem('operatingLog'))) ||
      [];

    list.push(userData, cRef);
    if (list.length > 20) {
      fakeOperatingLog({
        wechatLogObjectList: list,
      }).then((val) => {
        window.sessionStorage.removeItem('operatingLog');
      });
    } else {
      window.sessionStorage.setItem('operatingLog', JSON.stringify(list));
    }
  };
  //埋点执行函数
  return (
    <div
      style={style}
      onClick={() => {
        handleOpen();
      }}
    >
      {children}
    </div>
  );
};
