import React, { useState, useEffect } from 'react';
import Drawer from '@/components/drawer';
import { Switch } from 'antd-mobile';
import Signature from './../signature';
import {
  fakeSignInfo,
  fakeUpdateUserPersonalSetting,
  fakefillSign,
  fetchCommand,
} from '@/server/registerServers';
import day from 'dayjs';
import { toast, cobyInfo } from '@/utils/utils';
import './index.less';
export default (props) => {
  const { list, reloadRequest, token, onOpen, onClose, reload, remindFlag, openCommond } = props;
  const [checkFlag, setCheckFlag] = useState(false);
  const [time, setTime] = useState(0);
  const [data, setData] = useState({});
  const [maskVisible, setMaskVisible] = useState(false);
  const [maskData, setMaskData] = useState({
    type: 'success',
    data: {},
  });
  useEffect(() => {
    if (remindFlag === '0') {
      setCheckFlag(false);
    } else {
      setCheckFlag(true);
    }
  }, [remindFlag]);
  const { signRecordInfo = [], hasFillSignFlag } = list;
  useEffect(() => {
    signRecordInfo.forEach((item) => {
      const { currentDayFlag, signFlag } = item;
      if (currentDayFlag === '1') {
        setData(item);
      }
      if (currentDayFlag === '1' && signFlag === '0') {
        savePack(item);
      } else return;
    });
  }, [signRecordInfo]);
  const { rewardBean, rewardGrowthValue } = data;
  const savePack = (item) => {
    const { identification } = item;
    fakeSignInfo({
      token,
      identification,
    }).then(async (val) => {
      if (hasFillSignFlag === '0') {
        setMaskVisible(() => {
          setMaskData({ type: 'success', data: {} });
          return true;
        });
      }
      await reloadRequest();
      await setTime(5);
      await onOpen();
    });
  };
  const fakeSign = (item) => {
    const { identification } = item;
    let num = 0;
    let nowNum = 0;
    signRecordInfo.forEach((val, index) => {
      if (val.identification === identification) {
        num = index;
      }
      if (val.currentDayFlag === '1') {
        nowNum = index;
      }
    });
    let date = day(Date.now() - (nowNum - num) * 86400000).format('YYYY-MM-DD HH:mm:ss');
    fakefillSign({
      signDate: date,
      token,
      fillSignType: 'bean',
    }).then((val) => {
      if (val) {
        reloadRequest();
        setMaskVisible(() => {
          setMaskData({
            type: 'success',
            data: {},
          });
          return false;
        });
      }
    });
  };
  const fetchUserCommand = (item) => {
    const { identification } = item;
    let num = 0;
    let nowNum = 0;
    signRecordInfo.forEach((val, index) => {
      if (val.identification === identification) {
        num = index;
      }
      if (val.currentDayFlag === '1') {
        nowNum = index;
      }
    });
    let date = day(Date.now() - (nowNum - num) * 86400000).format('YYYY-MM-DD HH:mm:ss');
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
              type: 'success',
              data: {},
            });
            setMaskVisible(() => {
              return false;
            });
            return true;
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
                    reload();
                  }
                });
              }}
              checked={checkFlag}
              style={{ '--checked-color': '#FF8900' }}
            />
          </div>
          <div className="checkPop_getContent">
            获得<span className="checkPop_font_color">{rewardBean}</span>卡豆+
            <span className="checkPop_font_color">{rewardGrowthValue}</span>盲盒成长值
          </div>
          <div className="checkPop_reg">
            {signRecordInfo.map((item, index) => {
              const { signFlag, rewardBean, hasFillSignFlag } = item;
              if (index !== signRecordInfo.length - 1) {
                return (
                  <div
                    key={index}
                    className={`checkPop_reg_today ${index + 1 !== 4 && 'checkPop_margin'}`}
                    onClick={() => {
                      if (hasFillSignFlag === '0') {
                        setMaskVisible(() => {
                          setMaskData({ type: 'fail', data: { ...item } });
                          return true;
                        });
                      }
                    }}
                  >
                    {hasFillSignFlag === '1' ? (
                      <div className="checkPop_day">第{index + 1}天</div>
                    ) : (
                      <div className="checkPop_lost">补签</div>
                    )}
                    {signFlag === '1' ? (
                      <div className="checkPop_regFlag_icon"></div>
                    ) : (
                      <div className="checkPop_bean_icon"></div>
                    )}
                    <div className="checkPop_reg_bean">{rewardBean}卡豆</div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="checkPop_reg_last">
                    {hasFillSignFlag === '1' ? (
                      <div className="checkPop_day">第{index + 1}天</div>
                    ) : (
                      <div className="checkPop_lost">补签</div>
                    )}
                    <div className="checkPop_regBig_box">
                      {signFlag === '1' ? (
                        <div className="checkPop_regFlag_icon checkPop_reg_big"></div>
                      ) : (
                        <div className="checkPop_bean_icon checkPop_reg_sm"></div>
                      )}
                      <div className="checkPop_reg_bigBean">{rewardBean}卡豆</div>
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
        beanSign={fakeSign}
        shareSign={fetchUserCommand}
        onClose={() => setMaskVisible(false)}
      ></Signature>
    </div>
  );
};
