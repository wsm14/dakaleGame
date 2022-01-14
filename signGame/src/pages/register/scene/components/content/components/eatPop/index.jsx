import React, { useState, useEffect } from 'react';
import Drawer from '@/components/drawer';
import classNames from 'classnames';
import { fetchFoodList, fakeFeedFood } from '@/server/registerServers';
import { toast } from '@/utils/utils';
import './index.less';
export default (props) => {
  const { onClose, show, token, reload, eatTimes } = props;
  const [current, setCurrent] = useState(0);
  const setEatFlag = (list) => {
    let obj = {
      flag: false,
      index: 0,
    };
    list.forEach((item, index) => {
      if (item.eatFlag === '1') {
        obj.eatFlag = true;
        obj.index = index;
      }
    });

    return obj;
  };
  useEffect(() => {
    if (show) {
      fetchlist();
    }
  }, [show]);
  useEffect(() => {
    const { eatFlag, index } = setEatFlag(list);
    if (eatFlag) {
      setCurrent(index);
    }
  }, [list]);
  const filterTime = (time) => {
    if (time < 60) {
      return '吃' + time + '分钟';
    } else {
      return (
        '吃' +
        parseInt(time) / 60 +
        '小时' +
        (parseInt(time) % 60 > 0 ? (parseInt(time) % 60) + '分钟' : '')
      );
    }
  };

  const [list, setList] = useState([
    {
      time: '吃20分钟',
      bean: 10,
      cz: 2,
      type: 'card',
      name: '薯片',
      icon: 'eat_pack_goodsIcon1',
    },
    {
      time: '吃40分钟',
      bean: 20,
      cz: 4,
      name: '坚果',
      type: 'card',
      icon: 'eat_pack_goodsIcon2',
    },
    {
      time: '吃2小时',
      bean: 50,
      cz: 10,
      name: '牛肉',
      type: 'card',
      icon: 'eat_pack_goodsIcon3',
    },
  ]);

  const fetchlist = () => {
    fetchFoodList({
      token,
    }).then((val) => {
      if (val) {
        const { goodList } = val.content;
        setList([
          ...goodList.map((item) => {
            return {
              ...item,
              type: 'card',
            };
          }),
          {
            type: 'default',
          },
          {
            type: 'default',
          },
          {
            type: 'default',
          },
        ]);
      }
    });
  };
  const saveEat = () => {
    const { eatFlag, index } = setEatFlag(list);
    if (eatFlag) {
      return toast('您已经喂食');
    } else {
      fakeFeedFood({
        token,
        ...list[current],
      }).then((val) => {
        if (val) {
          reload();
          onClose();
        } else {
          onClose();
        }
      });
    }
  };
  return (
    <Drawer {...props}>
      <div className="eatPop_pack_box">
        <div className="eatPop_pack_topIcon"></div>
        <div
          className="eatPop_pack_close"
          onClick={() => {
            onClose();
          }}
        ></div>
        <div className="eatPop_pack_desc">喂食可获得成长值，帮你超前领到盲盒大礼哦～</div>
        <div className="eatPop_pack_content">
          {list.map((val, index) => {
            const { effectiveTime, beanNum, growValue, type, foodImg, foodName } = val;
            if (type === 'card') {
              return (
                <div
                  onClick={() => {
                    setCurrent(index);
                  }}
                  key={index}
                  className={classNames(
                    'eatPop_content_box',
                    (index + 1) % 3 !== 0 && 'eatPop_content_boxMargin',
                    current === index ? 'eatPop_content_checked' : 'eatPop_content_default',
                  )}
                >
                  {current === index && <div className="eat_pack_checked"></div>}
                  <div className="eat_pack_time">{filterTime(effectiveTime)}</div>
                  <div
                    style={{
                      background: `url(${foodImg}) no-repeat center/cover`,
                    }}
                    className={classNames('eat_pack_goods')}
                  ></div>
                  <div className="eat_pack_name">{foodName}</div>
                  <div className="eat_pack_bean">{beanNum}卡豆</div>
                  <div className="eat_pack_cz">成长值+{growValue}</div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className={classNames(
                    'eatPop_content_box eatPop_content_null',
                    (index + 1) % 3 !== 0 && 'eatPop_content_boxMargin',
                  )}
                ></div>
              );
            }
          })}
        </div>
        {eatTimes && <div className="eatPop_desc">等小豆吃完再来喂食吧～</div>}
        <div
          className="eatPop_btn"
          onClick={() => {
            saveEat();
          }}
        >
          喂食
        </div>
      </div>
    </Drawer>
  );
};
