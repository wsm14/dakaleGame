import React, { useState, useEffect } from 'react';
import Drawer from '@/components/drawer';
import Switch from './components/Switch';
import Signature from './../signature';
import {
  fakeSignInfo,
  fakeUpdateUserPersonalSetting,
  fakefillSign,
  fetchCommand,
  fakeSignGift,
} from '@/server/registerServers';
import { deviceName, linkTo, getUrlKey } from '@/utils/birdgeContent';
import { toast, cobyInfo } from '@/utils/utils';
import Imper from './components/signSuccess';
import SignTask from './components/signTask';
import SignPrize from './components/blindPop';
import day from 'dayjs';
import './index.less';
export default (props) => {
  const {
    list,
    reloadRequest,
    token,
    onOpen,
    onClose,
    reload,
    remindFlag,
    openCommond,
    tomorrowBean,
    closeImper,
  } = props;
  const [checkFlag, setCheckFlag] = useState(false);
  const [time, setTime] = useState(0);
  const [data, setData] = useState({});
  const [imperMask, setImperMask] = useState(false);
  const [maskVisible, setMaskVisible] = useState(false);
  const [signPrize, setSignPrize] = useState({
    show: false,
    type: 'fail',
  });
  const [saveSignCount, setSignCount] = useState({
    show: false,
    data: {},
  });
  const [maskData, setMaskData] = useState({
    type: 'bean',
    data: {},
  });
  useEffect(() => {
    if (remindFlag === '0') {
      setCheckFlag(false);
    } else {
      setCheckFlag(true);
    }
  }, [remindFlag]);
  const {
    signRecordList = [],
    hasUseWeeklyCardFlag = '0',
    ableReceiveFlag = '0',
    currentSignFlag = '0',
  } = list;
  useEffect(() => {
    if (signRecordList.length > 0) {
      signRecordList.forEach((item) => {
        const { currentDayFlag } = item;
        if (currentDayFlag === '1') {
          setData(item);
        }
      });
    }
    if (currentSignFlag === '0' && signRecordList.length > 0) {
      savePack();
    }
  }, [list]);
  const { fillBean, rewardGrowthValue } = data;
  const savePack = () => {
    fakeSignInfo({}).then(async (val) => {
      if (val) {
        await reloadRequest();
        await reload();
        await setTime(5);
        await onOpen();
        if (deviceName() === 'miniProgram' && !getUrlKey('device')) {
          await setImperMask(true);
        }
      }
    });
  };
  const fakeSign = (item, type) => {
    const { weekIndex } = item;
    let num = weekIndex;
    let nowNum = 0;
    signRecordList.forEach((val, index) => {
      if (val.currentDayFlag === '1') {
        nowNum = val.weekIndex;
      }
    });
    let date = day(Date.now() - (nowNum - num) * 86400000).format('YYYY-MM-DD HH:mm:ss');
    fakefillSign({
      fillSignDate: date,
      token,
      fillSignWay: type,
    }).then((val) => {
      if (val) {
        reloadRequest();
        reload();
        setMaskVisible(() => {
          setMaskData({
            type: 'card',
            data: {},
          });
          return false;
        });
      }
    });
  };
  const fetchUserCommand = (item) => {
    const { weekIndex } = item;
    let num = weekIndex;
    let nowNum = 0;
    signRecordList.forEach((val, index) => {
      if (val.currentDayFlag === '1') {
        nowNum = val.weekIndex;
      }
    });
    let date = day(Date.now() - (nowNum - num) * 86400000).format('YYYY-MM-DD HH:mm:ss');
    if (deviceName() === 'miniProgram') {
      linkTo({
        wechat: {
          url: `/pages/share/gameHelp/index?subType=fillSign&fillSignTime=${date}`,
        },
      });
      return;
    }
    fetchCommand({
      commandType: 'fillSign',
      extraParam: date,
      token,
    }).then((val) => {
      if (val) {
        const { command } = val.content;
        cobyInfo(command, () => {
          openCommond(() => {
            setMaskData({
              type: 'card',
              data: {},
            });
            setMaskVisible(() => {
              return false;
            });
            return {
              visible: true,
              time: date,
            };
          });
        });
      }
    });
  };
  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(() => {
          return time - 1;
        });
      }, 1000);
    } else {
      onClose();
    }
  }, [time]);

  return (
    <div>
      <Drawer {...props}>
        <div className="checkPop_box">
          <div className="checkPop_right_check">
            提醒我{' '}
            <Switch
              className="checkPop_right_btn"
              defaultChecked
              onChange={(e) => {
                fakeUpdateUserPersonalSetting({
                  token,
                  signReminder: e ? '1' : '0',
                }).then((val) => {
                  if (val) {
                    toast(`${e ? '开启成功' : '关闭成功'}`);
                    reload();
                  }
                });
              }}
              checked={checkFlag}
              style={{ '--checked-color': '#FF8900' }}
            />
          </div>
          <div className="checkPop_getContent">
            获得<span className="checkPop_font_color">{fillBean}</span>卡豆+
            <span className="checkPop_font_color">{rewardGrowthValue}</span>盲盒成长值
          </div>
          <div className="checkPop_reg">
            {signRecordList.map((item, index) => {
              const { signStatus, needSubscribe, prizeBean } = item;
              if (index !== signRecordList.length - 1) {
                return (
                  <div
                    key={index}
                    className={`checkPop_reg_today ${index + 1 !== 4 && 'checkPop_margin'}`}
                    onClick={() => {
                      if (needSubscribe === '1') {
                        if (hasUseWeeklyCardFlag === '1') {
                          setMaskVisible(() => {
                            setMaskData({
                              type: 'card',
                              data: { ...item },
                            });
                            return true;
                          });
                        } else {
                          setSignCount({
                            show: true,
                            data: { ...item },
                          });
                        }
                      } else {
                        return;
                      }
                    }}
                  >
                    {needSubscribe === '0' ? (
                      <div className="checkPop_day">第{index + 1}天</div>
                    ) : (
                      <div className="checkPop_lost">补签</div>
                    )}
                    {signStatus === '1' ? (
                      <div className="checkPop_regFlag_icon"></div>
                    ) : (
                      <div className="checkPop_bean_icon"></div>
                    )}
                    <div className="checkPop_reg_bean">{prizeBean}卡豆</div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className={ableReceiveFlag === '1' ? 'checkPop_reg_gif' : 'checkPop_reg_last'}
                    onClick={() => {
                      if (ableReceiveFlag === '0') {
                        setSignPrize({
                          show: true,
                          type: 'fail',
                        });
                      } else {
                        fakeSignGift({}).then((val) => {
                          if (val) {
                            setSignPrize({
                              show: true,
                              type: 'success',
                            });
                          }
                        });
                      }
                    }}
                  >
                    {needSubscribe === '0' ? (
                      <div className="checkPop_day">第{index + 1}天</div>
                    ) : (
                      <div className="checkPop_lost">补签</div>
                    )}
                    <div className="checkPop_regBig_box">
                      {signStatus === '1' ? (
                        <div className="checkPop_regFlag_icon checkPop_reg_big"></div>
                      ) : (
                        <div className="checkPop_bean_icon checkPop_reg_sm"></div>
                      )}
                      <div className="checkPop_reg_bigBean">{prizeBean}卡豆</div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div
            className="checkPop_closeLayer"
            onClick={() => {
              onClose();
            }}
          >
            收起{time > 0 && `(${time})`}
          </div>
        </div>
      </Drawer>
      <Signature
        val={maskData}
        show={maskVisible}
        fakeSign={fakeSign}
        onClose={() => setMaskVisible(false)}
      ></Signature>
      <SignTask
        {...saveSignCount}
        fetchUserCommand={fetchUserCommand}
        onOpenSign={() => {
          setSignCount(() => {
            setMaskVisible(() => {
              setMaskData({
                type: 'bean',
                data: { ...saveSignCount.data },
              });
              return true;
            });
            return {
              show: false,
              data: {},
            };
          });
        }}
        onClose={() =>
          setSignCount({
            show: false,
            data: {},
          })
        }
      ></SignTask>
      <Imper
        onClose={() => {
          setImperMask(false);
          closeImper(false);
        }}
        show={imperMask}
        tomorrowBean={tomorrowBean}
      ></Imper>
      <SignPrize
        data={list}
        onClose={() => {
          setSignPrize({
            show: false,
            type: 'fail',
          });
        }}
        {...signPrize}
      ></SignPrize>
    </div>
  );
};
