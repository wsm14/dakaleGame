import React from 'react';
import './index.less';

function index() {
  const taskList = [1, 2, 3];
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
  return (
    <div className="taskCloumn">
      {taskList.map((item) => (
        <div className="taskLine" key={item.strapId}>
          <div className="taskLine_left">
            <img src={item.image} alt="" />
            <div className="taskLine_left_info">
              <div className="taskLine_left_title">刷视频得抽奖机会</div>
              <div className="taskLine_left_description">刷5个视频，即可获得X次抽奖机会</div>
            </div>
          </div>
          <div className="taskLine_right taskLine_button1">123</div>
          {/* {checkButton(item)} */}
        </div>
      ))}
    </div>
  );
}

export default index;
