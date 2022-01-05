import React, { useState, useEffect } from 'react';
import { reloadTab } from '@/utils/utils';
import { deviceName, linkTo } from '@/utils/birdgeContent';
import { fetchTaskGetTaskList, fetchTaskExchangeBalance } from '@/services/game';
import { Toast } from 'antd-mobile';
import './index.less';

function index(props) {
  const { getGameDetail } = props;
  const [taskList, setTaskList] = useState([]); //任务列表

  useEffect(() => {
    getTaskList();
    reloadTab(getTaskList);
  }, []);

  const getTaskList = async () => {
    const source = deviceName() == 'miniProgram' ? 'miniClock' : 'app';
    const res = await fetchTaskGetTaskList({
      gameName: 'gatherCardGame',
      source: source,
    });
    const { taskList = [] } = res.content;
    setTaskList([...taskList]);
  };

  //跳转app
  const goApp = (item) => {
    const { jumpRule, strapId } = item;
    let json = (jumpRule && JSON.parse(jumpRule)) || {};
    console.log(json);
    const { jumpUrl } = json;
    const { iosUrl, androidUrl, weChatUrl } = jumpUrl;
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
  };

  //去兑换
  const exchange = async (strapId) => {
    const res = await fetchTaskExchangeBalance({
      strapId,
    });
    if (res.resultCode === '1') {
      Toast.show({
        content: '兑换成功',
      });
      getTaskList();
      getGameDetail();
    }
  };

  //领取奖励
  const receiveRewards = async (item) => {
    const { strapId, taskId } = item;

    const res = await fetchTaskReceiveTaskReward({
      strapId,
      gameName: 'gatherCardGame',
      taskId,
    });
    if (res.resultCode == 1) {
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
                exchange(strapId);
              }}
            >
              去兑换
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
  return (
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
  );
}

export default index;
