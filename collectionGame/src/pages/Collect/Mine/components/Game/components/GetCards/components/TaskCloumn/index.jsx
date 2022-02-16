import React, { useState, useEffect, useRef, useMemo } from 'react';
import { reloadTab, formatTime1 } from '@/utils/utils';
import { deviceName, linkTo } from '@/utils/birdgeContent';
import { useUpdateEffect } from 'ahooks';
import {
  fetchTaskGetTaskList,
  fetchTaskDoneTask,
  fetchTaskReceiveTaskReward,
} from '@/services/game';
import { Toast } from 'antd-mobile';
import ExchangeModal from '@/components/ExchangeModal';
import './index.less';
let timer = null;
function index(props) {
  const { getGameDetail } = props;
  const [taskList, setTaskList] = useState([]); //任务列表
  const [downTime, setDownTime] = useState(0); //倒计时时间
  const [timeFlag, setTimeFlag] = useState(false); //是否是明天再领
  const [nextTime, setNextTime] = useState(0); //下一阶段时间的显示
  const [visible, setVisible] = useState({ show: false });
  const timeRef = useRef(false);

  useEffect(() => {
    reloadTab(getTaskList);
    if (sessionStorage.getItem('dakaleToken')) {
      getTaskList();
    }
  }, []);
  useUpdateEffect(() => {
    clearInterval(timer);
    countDown();
    return () => {
      clearInterval(timer);
    };
  }, [timeRef.current]);
  const countDown = () => {
    timer = setInterval(() => {
      setDownTime((n) => {
        if (n) {
          // 3.1 倒计时每秒减少1
          return n - 1;
        } else {
          // 3.2 倒计时为0时，清空倒计时
          clearInterval(timer);
          downTask();
          return 0;
        }
      });
    }, 1000);
  };

  //完成任务

  const downTask = async (id, lastTime) => {
    const res = await fetchTaskDoneTask({
      taskStrapId: id || nextTime.strapId,
      extraParam: lastTime || nextTime.lastTime,
    });
    getTaskList();
  };

  const getTaskList = async () => {
    const source = deviceName() == 'miniProgram' ? 'miniClock' : 'app';
    const res = await fetchTaskGetTaskList({
      gameName: 'gatherCardGame',
      source: source,
    });
    const { taskList = [] } = res.content;

    //获取一条的数据
    const timeInfo = taskList.filter((item) => item.taskType === 'timing')[0];

    let {
      receiveRule,
      systemDate,
      taskStatus,
      strapId,
      hasDoneTimes, //已经领取的次数
      times, //总可以领取的次数
      extraParam, //请求的时间
    } = timeInfo;

    if (taskStatus === '0') {
      const jsonRule = (receiveRule && JSON.parse(receiveRule)) || {};
      //获取时间数组
      let { condition } = jsonRule;
      //当前时间
      condition = (condition && JSON.parse(condition)) || [];
      let nowTime = new Date(systemDate.replace(/\-/g, '/')).getTime();
      condition = condition.map((item) => new Date(item.replace(/\-/g, '/')).getTime());
      //最后的时间
      let lastTime;
      for (let i = 0; i < condition.length; i++) {
        if (nowTime <= condition[i]) {
          lastTime = condition[i];
          break;
        } else if (condition[i] < nowTime && nowTime <= condition[i + 1]) {
          lastTime = condition[i + 1];
          console.log(condition[i], condition[i]);
          //判断请求的时间和下一阶段时间是否一致
          if (extraParam != condition[i]) {
            downTask(strapId, condition[i]);
            return;
          }
          //如果时间等于最后的时间的话
          if (lastTime == condition[condition.length - 1]) {
            lastTime = null;
          }
          break;
        }
      }

      if (hasDoneTimes === times) {
        lastTime = null;
      }
      if (lastTime) {
        setDownTime((lastTime - nowTime) / 1000);
        setNextTime({
          time: `${formatTime1(lastTime).hour}:${formatTime1(lastTime).minutes}`,
          strapId: strapId,
          lastTime: lastTime,
        });
        timeRef.current = !timeRef.current;
      } else {
        clearInterval(timer);
        setTimeFlag(true);
      }
    }
    setTaskList([...taskList]);
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
  //领取奖励
  const receiveRewards = async (item) => {
    const { strapId, taskId } = item;

    const res = await fetchTaskReceiveTaskReward({
      strapId,
      gameName: 'gatherCardGame',
      taskId,
    });
    if (res.success) {
      Toast.show({
        content: '领取成功',
      });
      getTaskList();
      getGameDetail();
    }
  };

  //判断显示的按钮
  const checkButton = (item) => {
    const { taskStatus, taskType, strapId } = item;
    if (taskStatus === '0') {
      if (taskType === 'exchange') {
        return (
          <div>
            <div
              className="taskLine_right taskLine_button1"
              onClick={() => {
                setVisible(item);
              }}
            >
              去兑换
            </div>
          </div>
        );
      } else if (taskType === 'timing') {
        return (
          <div>
            <div className="taskLine_right taskLine_button1">
              {timeFlag ? '明日可领' : `${nextTime.time}可领`}
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
      if (taskType === 'timing') {
        return (
          <div>
            <div className="taskLine_right taskLine_button1">明日可领</div>
          </div>
        );
      } else {
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
    }
  };
  const modalRender = useMemo(
    () => (
      <ExchangeModal
        visible={visible}
        getTaskList={getTaskList}
        getGameDetail={getGameDetail}
        onClose={() => {
          setVisible({ show: false });
        }}
      ></ExchangeModal>
    ),
    [visible.show],
  );
  return (
    <>
      <div className="taskCloumn">
        {taskList.map((item) => (
          <div className="taskLine" key={item.strapId}>
            <div className="taskLine_left">
              <img src={item.image} alt="" />
              <div className="taskLine_left_info">
                <div className="taskLine_left_title">{item.name}</div>
                <div className="taskLine_left_description">{item.content}</div>
              </div>
            </div>
            {checkButton(item)}
          </div>
        ))}
      </div>
      {modalRender}
    </>
  );
}

export default index;
