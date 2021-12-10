import React, { useState, useEffect } from 'react';
import Drawer from '@/components/drawer';
import classNames from 'classnames';
import { fetchTaskList } from '@/server/registerServers';
import { linkTo } from '@/utils/birdgeContent';
import './index.less';
export default (props) => {
  const { onClose, token, show } = props;
  useEffect(() => {
    if (show) {
      fetchTask();
    }
  }, [show]);
  const [list, setList] = useState([]);

  const templateBtn = (item) => {
    const { taskStatus, jumpRule = '', strapId } = item;
    let json = (jumpRule && JSON.parse(jumpRule)) || {};
    const { iosUrl, androidUrl, weChatUrl } = json;
    if (taskStatus === '0') {
      return (
        <div
          className="growPop_body_btn growPop_body_btn1"
          onClick={() => {
            try {
              linkTo({
                wechat: { url: weChatUrl + `?strapId=${strapId}` },
                ios: {
                  path: iosUrl,
                  param: { strapId },
                },
                android: {
                  path: androidUrl,
                  strapId,
                },
              });
            } catch (e) {
              console.log(e);
            }
          }}
        >
          去完成
        </div>
      );
    } else if (taskStatus === '1') {
      return <div className="growPop_body_btn growPop_body_btn2">领取</div>;
    } else {
      return <div className="growPop_body_btn growPop_body_btn2">已领取</div>;
    }
  };
  const fetchTask = () => {
    fetchTaskList({
      token,
      gameName: 'signGame',
    }).then((val) => {
      console.log(val);
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
              <div className="growPop_content_list" key={index}>
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
