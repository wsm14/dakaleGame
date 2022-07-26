import React, { useState, useEffect, useMemo } from 'react';
import PopupModal from '@/components/PopupModal';
import { Button, Toast } from 'antd-mobile';
import { fetchFarmGetTeamList } from '@/services/game';
import { deviceName, linkTo } from '@/utils/birdgeContent';
import { fetchCommandGetCommand } from '@/services/game';
import { filterList } from '@/utils/game';
import { cobyInfo } from '@/utils/utils';
import Track from '@/components/tracking';
import SignOutModal from '@/components/SignOutModal';
import ShareModal from '@/components/ShareModal';
import './index.less';
import friends from '@/asstes/common/friends.png';
import taskClose from '@/asstes/common/close.png';
import invite from '@/asstes/common/invite.png';

function index(props = {}) {
  const {
    visible, //显示关闭
    onClose, //关闭事件
    processId, //进度id
    getGameDetail,
  } = props;
  const [outVisible, setOutVisible] = useState(false);
  const [invitaList, setInvitaList] = useState([]); //邀请列表
  const [shareVisible, setShareVisible] = useState({ show: false });
  useEffect(() => {
    if (visible) {
      getInvitaInfo();
    }
  }, [visible]);

  //获取助力列表
  const getInvitaInfo = async () => {
    const res = await fetchFarmGetTeamList({
      progressIdStr: processId,
    });
    const { content = {} } = res;
    let { teamMemberList = [] } = content;
    teamMemberList = filterList(teamMemberList, 3);
    setInvitaList(teamMemberList);
  };

  //赋值口令
  //打开弹窗并且复制口令
  const copyCode = async (type, id) => {
    console.log(type, id);
    if (deviceName() != 'miniProgram') {
      const res = await fetchCommandGetCommand({
        commandType: type,
        relateId: id,
      });
      const { command } = res.content;
      cobyInfo(command, { show: true, type, value: id }, (val) => {
        setShareVisible(val);
      });
    } else {
      linkTo({
        wechat: {
          url: `/pages/share/gameHelp/index?subType=${type}&shareId=${id}`,
        },
      });
    }
  };

  //是否有自己的小组成员
  const groupFlag = useMemo(() => invitaList.some((item) => item.profile), [invitaList.length]);
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
                  !item.profile && copyCode('farmTogether', processId);
                }}
              >
                <img src={item.profile ? item.profile : invite} alt="" />
                <div className={`invita_one_button  invita_one_gray}`}>加速5%</div>
              </div>
            ))}
          </div>

          {/* 规则 */}
          <div className="invita_rules">
            · 每邀请一名成员，运输加速5% <br />· 运输成功之后，成员每人均可获得本次包裹，包邮到家
            <br /> · 运输期间可随时邀请成员或者退出小队
          </div>

          <Button
            className="invita_button"
            disabled={!groupFlag}
            onClick={() => {
              groupFlag ? setOutVisible(true) : null;
            }}
          >
            退出小队
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
        getGameDetail={getGameDetail}
      ></SignOutModal>

      {/* 邀请合力弹窗 */}
      <ShareModal
        visible={shareVisible}
        onClose={() => {
          setShareVisible({ show: false });
        }}
      ></ShareModal>
    </>
  );
}

export default index;
