import React, { useState, useEffect } from 'react';
import './index.less';
import { useLocation } from 'umi';
import BasicModal from '@/components/BasicModal';
import { Toast } from 'antd-mobile';
import { fetchFarmJoinTeam, fetchTaskDoneTask, fetchFarmGetFarmReward } from '@/services/game';

function index(props) {
  const { getGameDetail } = props;
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState({});
  const location = useLocation();
  const { query = {} } = location;
  const { userId, relateId, commandType, extraParam } = query;

  useEffect(() => {
    if (userId && relateId) {
      getDetail();
      setVisible(true);
    }
  }, []);

  const getDetail = async () => {
    const res = await fetchFarmGetFarmReward({
      progressIdStr: commandType == 'farmTaskHelp' ? extraParam : relateId,
    });
    if (res.success) {
      setDetail(res.content.rewardInfo);
    }
  };

  const helpOther = async () => {
    if (commandType === 'farmTaskHelp') {
      const res = await fetchTaskDoneTask({
        taskStrapId: relateId,
        userId: userId,
      });
      if (res.success) {
        Toast.show({
          content: '助力成功',
        });
        setVisible(false);
      }
    } else if (commandType === 'farmTogether') {
      const res = await fetchFarmJoinTeam({
        gameProgressIdStr: relateId,
        shareUserIdStr: userId,
      });
      if (res.success) {
        Toast.show({
          content: '加入成功',
        });
        getGameDetail();
        setVisible(false);
      }
    }
  };

  const modalProps = {
    visible: visible,
    onClose: () => {
      setVisible(false);
    },
    opacity: 0.8,
  };

  return (
    <>
      <BasicModal modalProps={{ ...modalProps }}>
        <div className="InvitaModal_content">
          <div className="InvitaModal_content_img">
            <img src={detail?.rewardImg} alt="" />
          </div>
          <div className="InvitaModal_content_title">
            我正在种果树免费领商品
            <br />
            快来帮我助力
          </div>
          <div className="InvitaModal_content_button" onClick={helpOther}>
            {commandType === 'farmTaskHelp' ? '帮TA助力' : '加入合种'}
          </div>
        </div>
      </BasicModal>
    </>
  );
}

export default index;
