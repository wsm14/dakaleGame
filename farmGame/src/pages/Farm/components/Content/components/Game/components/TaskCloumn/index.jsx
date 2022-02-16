import React, { useEffect, useState, useRef } from 'react';
import { Popup, Toast } from 'antd-mobile';
import { linkTo } from '@/utils/birdgeContent';
import { useUpdateEffect } from 'ahooks';
import {
  fetchFreeGoodSaveSign,
  fetchTaskGetTaskList,
  fetchTaskDoneTask,
  fetchTaskReceiveTaskReward,
} from '@/services/game';
import { reloadTab } from '@/utils/utils';
import { deviceName } from '@/utils/birdgeContent';
import './index.less';
import taskTitle from '@/asstes/common/taskTitle.png';
import taskClose from '@/asstes/image/close.png';

let timer = null;

function index(props) {
  const { visible, onClose, getHomeDetail, openModal, countDistance } = props;
  const [taskList, setTaskList] = useState([]); //任务信息
  const [count, setCount] = useState(30); //倒计时
  const [taskStrapId, setTaskStrapId] = useState(''); //倒计时id
  const [timeBol, setTimeBol] = useState(false);
  const timerRef = useRef(1);

  useEffect(() => {
    getTaskList();
    reloadTab(getTaskList);
  }, []);
  useUpdateEffect(() => {
    // console.log(timeBol, 'setTimeBol');
    if (timerRef.current === 1) {
      timerRef.current = 2;
      timeOut();
    }
  }, [timeBol]);

  //签到
  const signEvent = async () => {
    const res = await fetchFreeGoodSaveSign();
    getHomeDetail();
  };

  //任务列表
  const getTaskList = async () => {
    const source = deviceName() == 'miniProgram' ? 'miniClock' : 'app';
    const res = await fetchTaskGetTaskList({
      gameName: 'freeGoodGame',
      source: source,
    });
    const { content = {} } = res;
    const { taskList = [] } = content;
    let times, strapId1;
    taskList.forEach((item = {}) => {
      const { receiveRule, hasDoneTimes, taskStatus, strapId } = item;
      const rule = JSON.parse(receiveRule) || {};
      const { condition = [] } = rule;
      if (condition.length && taskStatus == 0) {
        setTaskStrapId(strapId);
        if (timerRef.current === 1) {
          clearInterval(timer);
          setCount(condition[hasDoneTimes]);
        }
        setTimeBol(!timeBol);
      }
    });
    setTaskList([...taskList]);
  };
  //判断显示的按钮
  const checkButton = (item) => {
    const { taskStatus, strapId, jumpRule, taskType } = item;
    let json = (jumpRule && JSON.parse(jumpRule)) || {};
    const { iosUrl, androidUrl, weChatUrl } = json;
    if (taskStatus === '0') {
      if (taskType === 'free') {
        return (
          <div className="taskLine_right taskLine_button1">
            {parseInt(count / 60) < 10 ? `0${parseInt(count / 60)}` : parseInt(count / 60)}:
            {count % 60 < 10 ? `0${count % 60}` : count % 60}
          </div>
        );
      } else if (taskType === 'invite' || taskType === 'share') {
        return (
          <div>
            <div
              className="taskLine_right taskLine_button1"
              onClick={() => {
                let paramId = strapId;
                if (taskType === 'share') {
                  paramId = taskList.filter((item) => item.taskType === 'share')[0].strapId;
                }
                console.log(paramId, 'paramId');
                openModal('nativeShareWork', paramId, taskType);
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
                linkTo({
                  wechat: { url: '/' + weChatUrl + `?strapId=${strapId}&type=goods&gameType=free` },
                  ios: {
                    path: iosUrl,
                    param: { strapId },
                  },
                  android: {
                    path: androidUrl,
                    strapId,
                  },
                });
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
            linkTo({
              wechat: { url: '/' + weChatUrl + `?strapId=${strapId}&type=goods&gameType=free` },
              ios: {
                path: iosUrl,
                param: { strapId },
              },
              android: {
                path: androidUrl,
                strapId,
              },
            });
          }}
        >
          已领取
        </div>
      );
    }
  };

  const timeOut = () => {
    timer = setInterval(() => {
      setCount((n) => {
        if (n) {
          // 3.1 倒计时每秒减少1
          return n - 1;
        } else {
          // 3.2 倒计时为0时，清空倒计时
          clearInterval(timer);
          timerRef.current = 1;
          downTask();
          return 0;
        }
      });
    }, 1000);
  };

  //完成任务

  const downTask = async () => {
    const res = await fetchTaskDoneTask({
      taskStrapId,
    });
    getTaskList();
  };

  //领取奖励
  const receiveRewards = async (item) => {
    const { strapId, taskId, rewardNum } = item;
    const res = await fetchTaskReceiveTaskReward({
      strapId,
      gameName: 'freeGoodGame',
      taskId,
    });
    if (res.success) {
      countDistance(rewardNum);
      getTaskList();
      getHomeDetail();
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
    </>
  );
}

export default index;
