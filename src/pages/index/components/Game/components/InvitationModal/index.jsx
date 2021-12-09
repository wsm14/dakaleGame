import React from 'react';
import PopupModal from '@/components/PopupModal';
import { Button } from 'antd-mobile-v5';
import './index.less';
import friends from '@public/usual/friends.png';
import taskClose from '@public/usual/taskClose.png';
import invite from '@public/usual/invite.png';

function index(props) {
  const { visible, onClose } = props;
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
            <div className="invita_one">
              <img src={invite} alt="" />
              <div className="invita_one_button">加速5%</div>
            </div>
            <div className="invita_one">
              <img src={invite} alt="" />
              <div className="invita_one_button">加速5%</div>
            </div>
          </div>

          {/* 规则 */}
          <div className="invita_rules">
            · 每邀请一名成员，运输加速5% <br />· 运输成功之后，成员每人均可获得本次包裹，包邮到家
            <br /> · 运输期间可随时邀请成员或者退出小队
          </div>

          <Button className="invita_button">退出小队</Button>
        </div>
      </PopupModal>
    </>
  );
}

export default index;
