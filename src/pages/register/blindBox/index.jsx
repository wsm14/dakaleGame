import React from 'react';
import { history } from 'umi';
import { fetchBoxList, fetchOpenBlindBox, fetchCommand } from '@/server/registerServers';
import { getToken } from '@/utils/birdgeContent';
import { backgroundObj, toast, cobyInfo, reloadTab, filterStrList } from '@/utils/utils';
import classNames from 'classnames';
import Pop from './components/blindPop';
import { linkToCoupon, linkToWallet, linkToPrize, deviceName, linkTo } from '@/utils/birdgeContent';
import CobyMask from '@/components/cobyMask';
import Lottie from 'react-lottie';
import animationData from './components/lottie/blindBox/data.json';
import './index.less';
class Index extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      prizeInfoList: [],
      hasKeys: 0,
      noUseKeys: 0,
      data: {},
      visible: false,
      gameBalance: 0,
      growValueLimit: 0,
      cobyVisible: false,
    };
  }
  fetchList() {
    fetchBoxList({}).then((val) => {
      if (val) {
        const { prizeInfoList = [], noUseKeys, hasKeys, gameBalance, growValueLimit } = val.content;
        this.setState({
          prizeInfoList,
          noUseKeys,
          hasKeys,
          gameBalance,
          growValueLimit,
        });
      }
    });
  }
  cobyOpenInfo() {
    if (deviceName() === 'miniProgram') {
      linkTo({
        wechat: {
          url: `/pages/share/gameHelp/index?subType=blindBoxHelp`,
        },
      });
      return;
    }
    fetchCommand({
      commandType: 'blindBoxHelp',
      token: this.token,
    }).then((val) => {
      if (val) {
        const { command } = val.content;
        cobyInfo(command, () => {
          this.setState({
            cobyVisible: true,
          });
        });
      }
    });
  }
  linkBridge(item) {
    const { prizeType } = item;
    const callback = {
      bean: linkToWallet,
      commerce: linkToPrize,
      rightGood: linkToCoupon,
    }[prizeType];
    callback && callback();
  }
  fetchBlindBox(index, item) {
    fetchOpenBlindBox({
      token: this.token,
      blindNum: index,
    }).then((val) => {
      if (val) {
        this.fetchList();
        this.setState({
          data: {
            ...item,
          },
          visible: true,
        });
      }
    });
  }
  componentDidMount() {
    this.fetchList();
    reloadTab(() => {
      this.fetchList();
    });
  }

  render() {
    const {
      hasKeys,
      noUseKeys,
      prizeInfoList,
      visible,
      data,
      growValueLimit,
      gameBalance,
      cobyVisible,
    } = this.state;
    let keys = hasKeys - noUseKeys;
    const telplateStyle = [
      {
        noStyle: 'blind_bean_boxStyle1 blind_bean_fail',
        checkStyle: 'blind_bean_success blind_bean_failStyle1',
        littSTyle: 'blind_bean_lottie blind_bean_failStyle1',
      },
      {
        noStyle: 'blind_bean_boxStyle2 blind_bean_fail',
        checkStyle: 'blind_bean_success blind_bean_failStyle2',
        littSTyle: 'blind_bean_lottie blind_bean_failStyle2',
      },
      {
        noStyle: 'blind_bean_boxStyle3 blind_bean_fail',
        checkStyle: 'blind_bean_success blind_bean_failStyle3',
        littSTyle: 'blind_bean_lottie blind_bean_failStyle3',
      },
      {
        noStyle: 'blind_bean_boxStyle4 blind_bean_fail',
        checkStyle: 'blind_bean_success blind_bean_failStyle4',
        littSTyle: 'blind_bean_lottie blind_bean_failStyle4',
      },
    ];

    return (
      <div className="blind_box">
        <div
          className="blind_title"
          onClick={() => {
            history.goBack();
          }}
        >
          <div className="blind_titleName"></div>
        </div>
        <div className="blind_key_info">
          {noUseKeys > 0 ? (
            <div className="blind_key_left">你有{noUseKeys}把金钥匙，快去拆盲盒大礼吧～</div>
          ) : hasKeys - noUseKeys === 4 ? (
            <div className="blind_key_left">所有盲盒都被你开启了，等待新盲盒吧~</div>
          ) : growValueLimit - gameBalance > 0 ? (
            <div className="blind_key_left">
              已解锁{hasKeys - noUseKeys}个，还差{growValueLimit - gameBalance}成长值解锁盲盒
              <div
                className="blind_key_btn"
                onClick={() => {
                  history.goBack();
                }}
              >
                去获取
              </div>
            </div>
          ) : (
            <div className="blind_key_left">
              您有钥匙暂未领取
              <div
                className="blind_key_btn"
                onClick={() => {
                  history.goBack();
                }}
              >
                去领取
              </div>
            </div>
          )}
          <div
            onClick={() => {
              history.goBack();
            }}
            className="blind_key_right"
          >
            {noUseKeys}
          </div>
        </div>
        {prizeInfoList.map((item, index) => {
          const { noStyle, checkStyle, littSTyle } = telplateStyle[index];
          const { prizeImg } = item;
          if (index === keys) {
            if (noUseKeys > 0) {
              return (
                <div
                  onClick={() => {
                    if (noUseKeys > 0 && index === keys) {
                      setTimeout(() => {
                        this.fetchBlindBox(index, item);
                      }, 1000);
                    } else if (index < keys) {
                      this.linkBridge(item);
                    }
                  }}
                  key={index}
                  className={classNames(littSTyle)}
                >
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: animationData,
                      rendererSettings: {},
                    }}
                  />

                  <div
                    className={
                      noUseKeys > 0
                        ? index < 3
                          ? 'blind_bean_toastCheckPosition1 animate_1 blind_bean_toast blind_bean_two'
                          : 'blind_bean_toastCheckPosition2 animate_2 blind_bean_toast blind_bean_three'
                        : index < 3
                        ? 'blind_bean_toastCheckPosition1 animate_1 blind_bean_toast blind_bean_own'
                        : 'blind_bean_toastPosition2 animate_2 blind_bean_toast blind_bean_four'
                    }
                  >
                    {noUseKeys > 0 ? '点击拆盲盒' : `还需${growValueLimit - gameBalance}成长值`}
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  style={backgroundObj(index < keys ? filterStrList(prizeImg)[0] : null)}
                  className={classNames(index < keys ? checkStyle : noStyle)}
                  onClick={() => {
                    if (noUseKeys > 0 && index === keys) {
                      this.fetchBlindBox(index, item);
                    } else if (index < keys) {
                      this.linkBridge(item);
                    }
                  }}
                >
                  {index === keys && (
                    <div
                      className={
                        noUseKeys > 0
                          ? index < 3
                            ? 'blind_bean_toastPosition1 blind_bean_toast blind_bean_two'
                            : 'blind_bean_toastPosition2 blind_bean_toast blind_bean_three'
                          : index < 3
                          ? 'blind_bean_toastPosition1 blind_bean_toast blind_bean_own'
                          : 'blind_bean_toastPosition2 blind_bean_toast blind_bean_four'
                      }
                    >
                      {noUseKeys > 0 ? '点击拆盲盒' : `还需${growValueLimit - gameBalance}成长值`}
                    </div>
                  )}
                </div>
              );
            }
          } else {
            return (
              <div
                key={index}
                style={backgroundObj(index < keys ? filterStrList(prizeImg)[0] : null)}
                className={classNames(index < keys ? checkStyle : noStyle)}
                onClick={() => {
                  if (noUseKeys > 0 && index === keys) {
                    this.fetchBlindBox(index, item);
                  } else if (index < keys) {
                    this.linkBridge(item);
                  }
                }}
              ></div>
            );
          }
        })}
        <Pop
          data={data}
          show={visible}
          onOpenCoby={this.cobyOpenInfo.bind(this)}
          onClose={() => {
            this.setState({
              visible: false,
              data: {},
            });
          }}
        ></Pop>
        <CobyMask
          data={{ value: '' }}
          type="nativeShareBlind"
          onClose={() =>
            this.setState({
              cobyVisible: false,
            })
          }
          show={cobyVisible}
        ></CobyMask>
      </div>
    );
  }
}

export default Index;
