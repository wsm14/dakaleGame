import React, { useState, useEffect } from 'react';
import PopupModal from '@/components/PopupModal';
import { Button } from 'antd-mobile';
import { fetchFreeGoodGetTogetherList, fetchFreeGoodQuitTeam } from '@/services/game';
import { filterList } from '@/utils/game';
import ShareModal from '@/components/ShareModal';
import './index.less';
import friends from '@public/usual/friends.png';
import taskClose from '@public/usual/taskClose.png';
import invite from '@public/usual/invite.png';

function index(props) {
  const {
    visible, //显示关闭
    onClose, //关闭事件
    processId, //进度id
    openModal,
  } = props;
  const [invitaList, setInvitaList] = useState([]); //邀请列表

  useEffect(() => {
    getInvitaInfo();
  }, []);

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

  //退出小队
  const signOut = async () => {
    const res = await fetchFreeGoodQuitTeam({
      processIdStr: processId,
    });
    getInvitaInfo();
    onClose();
  };

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
                  !item.profile && openModal('nativeShareClose', processId);
                }}
              >
                <img src={item.profile ? item.profile : invite} alt="" />
                <div className="invita_one_button">加速5%</div>
              </div>
            ))}
          </div>

          {/* 规则 */}
          <div className="invita_rules">
            · 每邀请一名成员，运输加速5% <br />· 运输成功之后，成员每人均可获得本次包裹，包邮到家
            <br /> · 运输期间可随时邀请成员或者退出小队
          </div>

          <Button className="invita_button" onClick={signOut}>
            退出小队
          </Button>
        </div>
      </PopupModal>
    </>
  );
}

export default index;
