import React, { useState, useEffect, useMemo } from 'react';
import PopupModal from '@/components/PopupModal';
import { Button, Toast } from 'antd-mobile';
import { fetchFreeGoodGetTogetherList } from '@/services/game';
import { filterList } from '@/utils/game';
import SignOutModal from '@/components/SignOutModal';
import './index.less';
import friends from '@public/usual/friends.png';
import taskClose from '@public/usual/taskClose.png';
import invite from '@public/usual/invite.png';
import lock from '@public/usual/lock.png';

function index(props) {
  const {
    visible, //显示关闭
    onClose, //关闭事件
    processId, //进度id
    openModal,
    supplyLevel, //等级
  } = props;
  const [outVisible, setOutVisible] = useState(false);
  const [invitaList, setInvitaList] = useState([]); //邀请列表

  useEffect(() => {
    if (visible) {
      getInvitaInfo();
    }
  }, [visible]);

  //获取助力列表
  const getInvitaInfo = async () => {
    const res = await fetchFreeGoodGetTogetherList({
      processId,
    });
    const { content = {} } = res;
    let { userList = [] } = content;
    userList = filterList(userList, 2);
    setInvitaList(userList);
  };

  //判断等于是否到达第二阶段
  const levelFlag = useMemo(() => supplyLevel > 0, [supplyLevel]);
  //是否有自己的小组成员
  const groupFlag = useMemo(() => invitaList.every((item) => item.profile), [invitaList.length]);

  const popupProps = {
    visible,
    onClose,
  };
  return (
    <>
      <PopupModal {...popupProps}>
        <div className="invitaPopup">
          {/* 标题 */}
          <img
            src={taskClose}
            alt=""
            className=""
            className="invitaPopup_closeImg"
            onClick={onClose && onClose}
          />
          <div className="invitaPopup_titleImg">
            <img src={friends} alt="" />
          </div>

          {/* 邀请人 */}
          <div className="invita_people">
            {invitaList.map((item, index) => (
              <div
                className="invita_one"
                key={index + 1}
                onClick={() => {
                  if (levelFlag) {
                    !item.profile && openModal('nativeShareClose', processId);
                  } else {
                    Toast.show({ content: '达到第二阶段即可合力' });
                  }
                }}
              >
                <img src={item.profile ? item.profile : levelFlag ? invite : lock} alt="" />
                <div className={`invita_one_button ${levelFlag ? null : 'invita_one_gray'}`}>
                  加速5%
                </div>
              </div>
            ))}
          </div>

          {/* 规则 */}
          <div className="invita_rules">
            · 每邀请一名成员，运输加速5% <br />· 运输成功之后，成员每人均可获得本次包裹，包邮到家
            <br /> · 运输期间可随时邀请成员或者退出小队
            <br />· 只有在第二阶段才能邀请好友合力，前一级邀请无效
          </div>

          <Button
            className="invita_button"
            onClick={() => {
              levelFlag ? (groupFlag ? setOutVisible(true) : null) : null;
            }}
          >
            {levelFlag ? '退出小队' : '下一阶段即可发起合力'}
          </Button>
        </div>
      </PopupModal>
      {/* 是否退出助力的弹窗 */}
      <SignOutModal
        visible={outVisible}
        onClose={() => {
          setOutVisible(false);
        }}
        getInvitaInfo={getInvitaInfo}
        processId={processId}
      ></SignOutModal>
    </>
  );
}

export default index;
