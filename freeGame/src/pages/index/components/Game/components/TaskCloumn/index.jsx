import React, { useEffect, useState, useRef } from 'react';
import PopupModal from '@/components/PopupModal';
import { Popup, Toast } from 'antd-mobile';
import { linkTo } from '@/utils/birdgeContent';
import { useUpdateEffect } from 'ahooks';
import {
  fetchFreeGoodGetSignRecord,
  fetchFreeGoodSaveSign,
  fetchTaskGetTaskList,
  fetchTaskDoneTask,
  fetchTaskReceiveTaskReward,
} from '@/services/game';
import { reloadTab } from '@/utils/utils';
import { deviceName } from '@/utils/birdgeContent';
import './index.less';
import taskTitle from '@public/usual/taskTitle.png';
import taskClose from '@public/usual/taskClose.png';
import starOn from '@public/usual/starOn.png';
import starOff from '@public/usual/starOff.png';
import taskOn from '@public/usual/taskOn.png';

let timer = null;

function index(props) {
  const { visible, onClose, getHomeDetail, openModal, countDistance } = props;
  const [signContent, setSignContent] = useState({}); //签到信息
  const [taskList, setTaskList] = useState([]); //任务信息
  const [count, setCount] = useState(30); //倒计时
  const [taskStrapId, setTaskStrapId] = useState(''); //倒计时id
  const [timeBol, setTimeBol] = useState(false);
  const scrollRef = useRef();
  const timerRef = useRef(1);

  useEffect(() => {
    setTimeout(() => {
      document.getElementById('scrollId').scrollLeft = 10000;
    }, 100);
  }, [visible, signContent.length]);
  useEffect(() => {
    getTaskList();
    reloadTab(getTaskList);
    getSignContent();
  }, []);
  useUpdateEffect(() => {
    // console.log(timeBol, 'setTimeBol');
    if (timerRef.current === 1) {
      timerRef.current = 2;
      timeOut();
    }
  }, [timeBol]);

  //签到信息
  const getSignContent = async () => {
    const res = await fetchFreeGoodGetSignRecord();
    const { content = {} } = res;
    // content.signDay = 29;
    if (content.signDay > 5) {
      for (let i = 1; i <= content.signDay - 5; i++) {
        content.signInfo.push({ number: 5 + i, rewardStar: 15 });
      }
      content.signInfo = content.signInfo.slice(content.signInfo.length - 5);
    }
    // if (content.signDay > 5) {
    //   content.signInfo[content.signInfo.length - 1].number = content.signDay;
    // }
    setSignContent(content);
  };

  //签到
  const signEvent = async () => {
    const res = await fetchFreeGoodSaveSign();
    getSignContent();
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
        // times = condition[hasDoneTimes];
        // strapId1 = strapId;
        setTaskStrapId(strapId);
        if (timerRef.current === 1) {
          clearInterval(timer);
          setCount(condition[hasDoneTimes]);
        }

        setTimeBol(!timeBol);
        // countRef.current = !countRef.current;
      }
    });
    // setTaskStrapId(strapId1);
    // setCount(times);
    setTaskList([...taskList]);
  };
  //判断显示的按钮
  const checkButton = (item) => {
    const { taskStatus, receiveRule, strapId, jumpRule } = item;
    let json = (jumpRule && JSON.parse(jumpRule)) || {};
    const { iosUrl, androidUrl, weChatUrl } = json;
    const rule = JSON.parse(receiveRule);
    const { type } = rule;
    if (taskStatus === '0') {
      if (type === 'free') {
        return (
          <div className="taskLine_right taskLine_button1">
            {parseInt(count / 60) < 10 ? `0${parseInt(count / 60)}` : parseInt(count / 60)}:
            {count % 60 < 10 ? `0${count % 60}` : count % 60}
          </div>
        );
      } else if (type === 'invite') {
        return (
          <div>
            <div
              className="taskLine_right taskLine_button1"
              onClick={() => {
                openModal('nativeShareWork', strapId);
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

  const {
    signFlag, //签到标识 0 - 未签到 1 - 已签到
    signInfo = [], //签到数组
    signDay, //连续签到的天数
  } = signContent;
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
            <div className="progress">
              <div className="taskSteps">
                <div className="taskSteps_scroll" ref={scrollRef} id="scrollId">
                  {[...signInfo].map((item, index) => {
                    const flag = item.number <= signDay;
                    return (
                      <div className="taskSteps_strip" key={`${item.number}${index}`}>
                        <div
                          className={`taskSteps_speed ${
                            flag ? 'taskSteps_speed_color1' : 'taskSteps_speed_color2'
                          }`}
                        ></div>
                        <div className="taskSteps_line">
                          <div
                            className={`taskSteps_line_num ${
                              flag ? 'taskSteps_color1' : 'taskSteps_color2'
                            }`}
                          >
                            {item.rewardStar}
                          </div>
                          <img
                            src={flag ? starOn : starOff}
                            alt=""
                            className=""
                            className="taskSteps_line_img1"
                          />
                          <div className="taskSteps_line_days">
                            {['1'].includes(signFlag) && signDay == item.number ? (
                              <div className="taskSteps_line_today">
                                <img
                                  src={taskOn}
                                  alt=""
                                  className=""
                                  className="taskSteps_line_img2"
                                />
                                <div>今天</div>
                              </div>
                            ) : (
                              <div>第{item.number}天</div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                className={`taskLine_right ${
                  ['0'].includes(signFlag) ? 'taskLine_button2' : 'taskLine_button3'
                }`}
                onClick={signFlag === '0' ? signEvent : null}
              >
                {['0'].includes(signFlag) ? '签到' : '已领取'}
              </div>
            </div>

            {/*任务*/}
            {taskList &&
              taskList.map((item) => (
                <div className="taskLine" key={item.strapId}>
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
