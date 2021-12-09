import React from 'react';
import PopupModal from '@/components/PopupModal';
import { Button } from 'antd-mobile';
import './index.less';
import taskTitle from '@public/usual/taskTitle.png';
import taskClose from '@public/usual/taskClose.png';
import starOn from '@public/usual/starOn.png';
import starOff from '@public/usual/starOff.png';
import taskOn from '@public/usual/taskOn.png';
import task1 from '@public/usual/task1.png';
import task2 from '@public/usual/task2.png';
import task3 from '@public/usual/task3.png';
import task4 from '@public/usual/task4.png';
import task5 from '@public/usual/task5.png';

function index(props) {
  const { visible, onClose } = props;

  const taskList = [
    {
      type: 'invate',
      title: '邀请好友助力（0/2）',
      instru: '邀请好友助力得100补给星豆',
      status: '0',
    },
    {
      type: 'look',
      title: '看精选商品得补给',
      instru: '浏览15秒得300补给星豆',
      status: '1',
    },
    {
      type: 'guang',
      title: '逛精选视频',
      instru: '浏览15秒得300补给星豆',
      status: '0',
    },
    {
      type: 'buy',
      title: '买实惠好物送1万补给星豆',
      instru: '下单即得，产生任何退款均收回',
      status: '2',
    },
    {
      type: 'ling',
      title: '免费领补给（0/6）',
      instru: '免费奖励10补给，每天6次',
      status: '1',
    },
  ];

  const checkImg = (type) => {
    switch (type) {
      case 'invate':
        return task4;
        break;
      case 'look':
        return task1;
        break;
      case 'guang':
        return task2;
        break;
      case 'buy':
        return task3;
        break;
      case 'ling':
        return task5;
        break;
      default:
        break;
    }
  };

  const checkButton = (status) => {
    if (status === '0') {
      return <div className="taskLine_right taskLine_button1">去完成</div>;
    } else if (status === '1') {
      return <div className="taskLine_right taskLine_button2">领取</div>;
    } else if (status === '2') {
      return <div className="taskLine_right taskLine_button3">已领取</div>;
    }
  };

  const popupProps = {
    visible,
    onClose,
  };

  return (
    <>
      <PopupModal {...popupProps}>
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
                {[1, 2, 3, 4, 5].map((item) => (
                  <div className="taskSteps_strip">
                    <div className="taskSteps_speed"></div>
                    <div className="taskSteps_line">
                      <div className="taskSteps_line_num">10</div>
                      <img src={starOn} alt="" className="" className="taskSteps_line_img1" />
                      <div className="taskSteps_line_days">
                        {/* <img src={taskOn} alt="" className="" className="taskSteps_line_img2" /> */}
                        第{item}天
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="progress_button">已领取</div>
            </div>

            {/*任务*/}
            {taskList.map((item) => (
              <div className="taskLine">
                <div className="taskLine_left">
                  <img src={checkImg(item.type)} alt="" />
                  <div className="taskLine_left_info">
                    <div className="taskLine_left_title">{item.title}</div>
                    <div className="taskLine_left_description">{item.instru}</div>
                  </div>
                </div>
                {checkButton(item.status)}
              </div>
            ))}
          </div>
        </div>
      </PopupModal>
    </>
  );
}

export default index;
