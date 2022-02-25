import React, { useEffect, useState, useRef } from 'react';
import { Popup, Toast } from 'antd-mobile';
import { fetchTaskGetTaskList, fetchTaskReceiveTaskReward } from '@/services/game';
import { reloadTab } from '@/utils/utils';
import { deviceName, linkTo } from '@/utils/birdgeContent';
import { fetchCommandGetCommand } from '@/services/game';
import { cobyInfo } from '@/utils/utils';
import ShareModal from '@/components/ShareModal';
import './index.less';
import taskTitle from '@/asstes/common/taskTitle.png';
import taskClose from '@/asstes/common/close.png';

function index(props) {
  const { visible, onClose, getGameDetail, processId } = props;
  const [taskList, setTaskList] = useState([]); //任务信息
  const [shareVisible, setShareVisible] = useState({ show: false });

  useEffect(() => {
    getTaskList();
    reloadTab(getTaskList);
  }, []);

  //任务列表
  const getTaskList = async () => {
    const source = deviceName() == 'miniProgram' ? 'miniClock' : 'app';
    const res = await fetchTaskGetTaskList({
      gameName: 'farmGame',
      source: source,
    });
    const { content = {} } = res;
    const { taskList = [] } = content;
    setTaskList([...taskList]);
  };

  //打开弹窗并且复制口令
  const copyCode = async (type, id, taskType) => {
    if (deviceName() != 'miniProgram') {
      const res = await fetchCommandGetCommand({
        commandType: type,
        relateId: id,
        extraParam: processId,
      });
      const { command } = res.content;
      cobyInfo(command, { show: true, type, value: id, taskType }, (val) => {
        setShareVisible(val);
      });
    } else {
      linkTo({
        wechat: {
          url: `/pages/share/gameHelp/index?subType=${btnType}&shareId=${id}`,
        },
      });
    }
  };

  //跳转app
  const goApp = (item) => {
    const { jumpRule, strapId } = item;
    let json = (jumpRule && JSON.parse(jumpRule)) || {};
    const { jumpUrl, param } = json;
    const paramJson = (param && JSON.parse(param)) || {};
    const { browseType } = paramJson;
    const { iosUrl, androidUrl, weChatUrl } = jumpUrl;
    linkTo({
      wechat: { url: '/' + weChatUrl + `?strapId=${strapId}&type=goods&gameType=collect` },
      ios: {
        path: iosUrl,
        param: { strapId, browserType: browseType },
      },
      android: {
        path: androidUrl,
        strapId,
        browseType,
      },
    });
  };

  //判断显示的按钮
  const checkButton = (item) => {
    const { taskStatus, strapId, taskType } = item;
    if (taskStatus === '0') {
      if (taskType === 'invite' || taskType === 'share') {
        return (
          <div>
            <div
              className="taskLine_right taskLine_button1"
              onClick={() => {
                let paramId = strapId;
                if (taskType === 'share') {
                  paramId = taskList.filter((item) => item.taskType === 'share')[0].strapId;
                }
                copyCode('farmTaskHelp', paramId, taskType);
              }}
            >
              去完成
            </div>
          </div>
        );
      } else {
        return (
          <div>
            {' '}
            <div
              className="taskLine_right taskLine_button1"
              onClick={() => {
                goApp(item);
              }}
            >
              去完成
            </div>
          </div>
        );
      }
    } else if (taskStatus === '1') {
      return (
        <div
          className="taskLine_right taskLine_button2"
          onClick={() => {
            receiveRewards(item);
          }}
        >
          领取
        </div>
      );
    } else if (taskStatus === '2') {
      return (
        <div
          className="taskLine_right taskLine_button3"
          onClick={() => {
            goApp(item);
          }}
        >
          已领取
        </div>
      );
    }
  };

  //领取奖励
  const receiveRewards = async (item) => {
    const { strapId, taskId, rewardNum } = item;
    const res = await fetchTaskReceiveTaskReward({
      strapId,
      gameName: 'farmGame',
      taskId,
    });
    if (res.success) {
      getTaskList();
      getGameDetail();
    }
  };

  const popupProps = {
    visible,
    onClose,
    forceRender: true,
    bodyStyle: {
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
    },
    onMaskClick: onClose,
  };
  return (
    <>
      <Popup {...popupProps}>
        <div className="taskPopup">
          {/* 标题 */}
          <img
            src={taskClose}
            alt=""
            className=""
            className="taskPopup_closeImg"
            onClick={onClose && onClose}
          />
          <div className="taskPopup_titleImg">
            <img src={taskTitle} alt="" />
          </div>
          {/* 内容 */}
          <div className="taskContent">
            {/*任务*/}
            {taskList &&
              taskList.map((item) => (
                <div className={`taskLine taskLine_${item?.taskType}`} key={item.strapId}>
                  <div className="taskLine_left">
                    <img src={item.image} alt="" />
                    <div className="taskLine_left_info">
                      <div className="taskLine_left_title">
                        {item.name}({item.hasDoneTimes}/{item.times})
                      </div>
                      <div className="taskLine_left_description">{item.content}</div>
                    </div>
                  </div>
                  {checkButton(item)}
                </div>
              ))}
          </div>
        </div>
      </Popup>

      {/* 赋值口令弹窗 */}
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
