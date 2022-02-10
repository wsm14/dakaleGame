import React, { useState, useEffect } from 'react';
import Drawer from '@/components/drawer';
import classNames from 'classnames';
import { fetchTaskList, fetchTaskReward } from '@/server/registerServers';
import { linkTo, deviceName } from '@/utils/birdgeContent';
import { fetchCommand } from '@/server/registerServers';
import './index.less';
import { toast, cobyInfo, reloadTab } from '@/utils/utils';
export default (props) => {
  const { onClose, token, show, openWork, reload } = props;
  const [reloading, setReloading] = useState(false);
  useEffect(() => {
    if (show) {
      fetchTask();
      if (!reloading) {
        setReloading(() => {
          reloadTab(() => {
            fetchTask();
          });
          return true;
        });
      }
    }
  }, [show]);
  const [list, setList] = useState([]);

  const templateBtn = (item) => {
    const { taskStatus, jumpRule = '', strapId, taskId, receiveRule = '' } = item;
    let json = (jumpRule && JSON.parse(jumpRule)) || {};
    let receiveJson = (receiveRule && JSON.parse(receiveRule)) || {};
    const { type } = receiveJson;
    const { iosUrl, androidUrl, weChatUrl } = json;
    if (taskStatus === '0') {
      return (
        <div
          className="growPop_body_btn growPop_body_btn1"
          onClick={() => {
            try {
              if (type !== 'invite') {
                linkTo({
                  wechat: { url: '/' + weChatUrl + `?strapId=${strapId}&type=goods` },
                  ios: {
                    path: iosUrl,
                    param: { strapId, browserType: 'pickUpMerge' },
                  },
                  android: {
                    path: androidUrl,
                    browserType: 'pickUpMerge',
                    strapId,
                  },
                });
              } else {
                if (deviceName() === 'miniProgram') {
                  linkTo({
                    wechat: {
                      url: `/pages/share/gameHelp/index?subType=signTaskHelp&shareId=${strapId}`,
                    },
                  });
                  return;
                }
                fetchCommand({
                  commandType: 'signTaskHelp',
                  token: token,
                  relateId: strapId,
                }).then((val) => {
                  if (val) {
                    const { command } = val.content;
                    cobyInfo(command, () => {
                      openWork(() => {
                        return {
                          visible: true,
                          work: strapId,
                        };
                      });
                    });
                  }
                });
              }
            } catch (e) {
              console.log(e);
            }
          }}
        >
          去完成
        </div>
      );
    } else if (taskStatus === '1') {
      return (
        <div
          onClick={() => {
            fetchTaskReward({
              token: token,
              strapId,
              taskId,
              gameName: 'signGame',
            }).then((val) => {
              if (val) {
                toast('领取成功');
                reload();
                fetchTask();
              }
            });
          }}
          className="growPop_body_btn growPop_body_btn2"
        >
          领取
        </div>
      );
    } else {
      return (
        <div
          onClick={() => {
            try {
              if (type !== 'invite') {
                linkTo({
                  wechat: { url: '/' + weChatUrl + `?strapId=${strapId}&type=goods` },
                  ios: {
                    path: iosUrl,
                    param: { strapId },
                  },
                  android: {
                    path: androidUrl,
                    strapId,
                  },
                });
              } else {
                if (deviceName() === 'miniProgram') {
                  linkTo({
                    wechat: {
                      url: `/pages/share/gameHelp/index?subType=signTaskHelp&shareId=${strapId}`,
                    },
                  });
                  return;
                }
                fetchCommand({
                  commandType: 'signTaskHelp',
                  token: token,
                  relateId: strapId,
                }).then((val) => {
                  if (val) {
                    const { command } = val.content;
                    cobyInfo(command, () => {
                      openWork(() => {
                        return {
                          visible: true,
                          work: strapId,
                        };
                      });
                    });
                  }
                });
              }
            } catch (e) {
              console.log(e);
            }
          }}
          className="growPop_body_btn growPop_body_btn3"
        >
          已领取
        </div>
      );
    }
  };
  const fetchTask = () => {
    fetchTaskList({
      source: deviceName() === 'miniProgram' ? 'miniGroup' : 'app',
      token,
      gameName: 'signGame',
    }).then((val) => {
      if (val) {
        const { taskList = [] } = val.content;
        setList(taskList);
      }
    });
  };
  return (
    <Drawer {...props}>
      <div className="growPop_pack_box">
        <div className="growPop_pack_topIcon"></div>
        <div
          className="growPop_pack_close"
          onClick={() => {
            onClose();
          }}
        ></div>
        <div className="growPop_pack_desc">完成任务，可获得成长值</div>
        <div className="growPop_content_auto">
          {list.map((item, index) => {
            const { image, name, content, times, hasDoneTimes } = item;
            return (
              <div className={`growPop_content_list ${'taskLine_' + item.taskType}`} key={index}>
                <div className={classNames('growPop_content_profile')}>
                  <img src={image} className="growPop_content_img" />
                </div>
                <div className="growPop_content_body">
                  <div className="growPop_body_name">
                    {name}
                    {times > 1 ? ` ( ${hasDoneTimes} / ${times} ) ` : null}
                  </div>
                  <div className="growPop_body_desc">{content}</div>
                </div>
                {templateBtn(item)}
              </div>
            );
          })}
        </div>
      </div>
    </Drawer>
  );
};
