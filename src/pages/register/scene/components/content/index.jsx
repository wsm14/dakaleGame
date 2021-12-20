import React, { useEffect, useState, useRef } from 'react';
import Hilo, { Stage, Tween, Sprite } from 'hilojs';
import { history } from 'umi';
import { createBitmap } from '@/components/createBitMap';
import {
  HiloBeanInfo,
  HiloTree,
  HiloSnowTree,
  HiloFlow,
  HiloEatBean,
  HiloRightTree,
  HiloLevel,
  HiloKeys,
} from './components/spite';
import {
  fetchSignInfo,
  fetchGameInfo,
  fakeReceiveFeedReward,
  fetchUserShareCommission,
  fakeBlindBoxKeys,
} from '@/server/registerServers';
import TopLayer from './components/topLayer';
import CheckPop from './components/checkPop';
import PackPop from './components/packPop';
import EatPop from './components/eatPop';
import GrowPop from './components/growPop';
import CobyMask from '@/components/cobyMask';
import BottomContent from './components/BottomContent';
import { getToken } from '@/utils/birdgeContent';
import { toast, computedSeconds, pxComputed, reloadTab } from '@/utils/utils';
import './index.less';
let beanSprite = null;
let bubble = null;
let textBean = null;
let textDesc = null;
let level = null;
let key = null;
let stageObj = null;
let token = '';
export default ({ responent }) => {
  const [visible, setVisible] = useState(false);
  const [packVisible, setPackVisible] = useState(false);
  const [eatVisible, setEatVisible] = useState(false);
  const [growVisible, setGrowVisible] = useState(false);
  const [cobyVisible, setCobyVisible] = useState({
    time: null,
    visible: false,
  });
  const [WorkVisible, setWorkVisible] = useState({
    work: null,
    visible: false,
  });
  const [userInfo, setUserInfo] = useState({});
  const [gameData, setGameData] = useState({});
  const [packData, setPackData] = useState({});
  const [loseCreateTime, setCreateTime] = useState({
    timeLose: null,
    computedTime: 0,
    times: null,
  });
  const {
    gameBalance = 0,
    growValueLimit = 0,
    feedReward = 0,
    loseTime = 0,
    remindFlag = '0',
  } = gameData;
  const width = window.innerWidth * 2;
  const height = (window.innerWidth / 375) * 520 * 2;
  const ticker = new Hilo.Ticker(60);
  useEffect(() => {
    initStage();
  }, []);
  useEffect(() => {
    if (feedReward > 0) {
      createBubble(stageObj);
    }
  }, [feedReward]);
  useEffect(() => {
    if (gameBalance > 0) {
      createKeys(stageObj);
    }
  }, [gameBalance]);
  useEffect(() => {
    if (loseCreateTime.timeLose) {
      return;
    } else {
      setCreateTime({
        timeLose: loseTime > 0 ? loseTime : null,
        computedTime: 0,
      });
    }
    if (loseTime && loseTime >= 0) {
      createEatBean(stageObj);
    } else {
      createBean(stageObj);
    }
  }, [loseTime]);
  useEffect(() => {
    const { timeLose, computedTime, times } = loseCreateTime;
    if (times) {
      return;
    } else {
      if (timeLose) {
        let num = 0;
        let time = setInterval(() => {
          num += 1;
          if (timeLose && timeLose - num <= 0) {
            createBean(stageObj);
            clearInterval(time);
            setCreateTime({
              timeLose: null,
              times: null,
              computedTime: 0,
            });
            fetchGame();
          } else {
            if (timeLose && timeLose - num > 0) {
              setCreateTime({
                timeLose,
                computedTime: num,
                times: time,
              });
            }
          }
        }, 1000);
      } else {
        return;
      }
    }
  }, [loseCreateTime]);

  const initStage = () => {
    let stage = new Stage({
      renderType: 'canvas',
      container: 'content_scene',
      width: width,
      height: height,
      scaleX: 0.5,
      scaleY: 0.5,
      zIndex: 10,
    });
    stageObj = stage;
    initOther(stage);
    stage.enableDOMEvent(Hilo.event.POINTER_START, true);
    getToken((res) => {
      token = res;
      if (res) {
        fetchPack();
        fetchGame();
        fetchUserShare();
      } else return;
    });
    reloadTab(() => {
      if (!sessionStorage.getItem('dakale_token')) {
        getToken((res) => {
          fetchPack();
          fetchGame();
          fetchUserShare();
        });
      } else {
        fetchPack();
        fetchGame();
        fetchUserShare();
      }
    });
  };
  //创建舞台
  const clickInEase = (id, fn) => {
    Hilo.Tween.from(
      id,
      {
        scaleX: 0.8,
        scaleY: 0.8,
        x: id.x + 20,
        y: id.y + 20,
      },
      {
        ease: Hilo.Ease.Linear.EaseNone,
        duration: 100,
        onComplete: function (e) {
          Hilo.Tween.remove(e);
          fn && fn();
        },
      },
    );
  };
  const initOther = (stageinfo) => {
    createTick(stageinfo);
    createBgInit(stageinfo, 0);
    createSnowTree(stageinfo);
    createBgInit(stageinfo, 1);
    createFlow(stageinfo);
    createCloud(stageinfo);
    createRightTree(stageinfo);
    createTree(stageinfo);
    createBgInit(stageinfo, 2);
    createBgInit(stageinfo, 3);
    createLevel(stageinfo);
    const pack = createBgInit(stageinfo, 4);
    const eat = createBgInit(stageinfo, 5);
    const grow = createBgInit(stageinfo, 6);
    eat.on(Hilo.event.POINTER_START, (e) => {
      e.preventDefault();
      clickInEase(eat, () => setEatVisible(true));
    });
    pack.on(Hilo.event.POINTER_START, (e) => {
      e.preventDefault();
      clickInEase(pack, () => setPackVisible(true));
    });
    grow.on(Hilo.event.POINTER_START, (e) => {
      e.preventDefault();
      clickInEase(grow, () => setGrowVisible(true));
    });
  };
  //舞台其他元素添加进舞台
  const createTick = (stage) => {
    //把舞台加入到tick队列
    ticker.addTick(stage);
    ticker.addTick(Tween);
    //启动ticker
    ticker.start();
  };
  //实时渲染舞台
  const createCloud = (stage) => {
    let list = [
      {
        id: 'cloud',
        image: responent.get('cloud').content,
        x: -165,
        y: 114,
        width: 165,
        height: 88,
        rect: [250, 43, 82.5, 44],
        animate: {
          x: 750 + 165,
        },
        from: {
          duration: 10000,
          delay: 4000,
        },
      },
      {
        id: 'cloud',
        image: responent.get('cloud').content,
        x: -132,
        y: 161,
        width: 112,
        height: 60,
        rect: [381, 55, 60, 30],
        animate: {
          x: 750 + 112,
        },
        from: {
          duration: 9000,
          delay: 0,
        },
      },
      {
        id: 'cloud',
        image: responent.get('cloud').content,
        x: -133,
        y: 230,
        width: 133,
        height: 70,
        rect: [147, 55, 67, 36],
        animate: {
          x: 750 + 133,
        },
        from: {
          duration: 9000,
          delay: 2000,
        },
      },
      {
        id: 'cloud',
        image: responent.get('cloud').content,
        x: -90,
        y: 78,
        width: 90,
        height: 48,
        rect: [500, 55, 45, 24],
        animate: {
          x: 750 + 90,
        },
        from: {
          duration: 9000,
          delay: 5000,
        },
      },
    ];
    let mapItem = createBitmap({
      list,
    });
    stage.addChild(...mapItem);
    mapItem.forEach((item, index) => {
      const { animate, from } = list[index];
      Hilo.Tween.to(
        item,
        {
          ...animate,
        },
        {
          loop: true,
          ease: Hilo.Ease.Linear.EaseNone,
          ...from,
          onComplete: function () {
            console.log('complete');
          },
        },
      );
    });
  };
  //设置云朵并且给云朵添加动画

  const createBubble = (stage) => {
    if (bubble) {
      bubble.removeFromParent(stage);
    }
    bubble = createBitmap({
      list: [
        {
          id: 'bubble',
          image: responent.get('bubble').content,
          x: 98,
          y: 375,
          width: 130,
          height: 130,
        },
      ],
    })[0];
    stage.addChild(bubble);
    createInEase(bubble);
    createTextBean(stage);
    createTextDesc(stage);
  };
  //有成长值的浮层
  const createTextBean = (stage) => {
    if (textBean) {
      textBean.removeFromParent(stage);
    }
    textBean = new Hilo.Text({
      color: '#38BD21',
      textWidth: 130,
      x: bubble.x,
      y: bubble.y + 36,
      text: feedReward,
      textAlign: 'center',
      width: 130,
    });
    textBean.setFont('32px arial');
    textBean.addTo(stage);
    textBean.on(Hilo.event.POINTER_START, () => {
      let list = [
        {
          key: bubble,
          data: {
            y: 860,
            x: 32,
            scaleX: 0.4,
            scaleY: 0.4,
            alpha: 0,
          },
          fn: () => {
            createLevel(stageObj, true);
            fakeFeedReward();
          },
        },
        {
          key: textBean,
          data: {
            y: 880,
            x: 36,
            scaleX: 0.4,
            scaleY: 0.4,
            alpha: 0,
          },
        },
        {
          key: textDesc,
          data: {
            y: 920,
            x: 36,
            scaleX: 0.4,
            scaleY: 0.4,
            alpha: 0,
          },
        },
      ];
      list.forEach((val) => {
        createOutEase(val.key, { ...val.data }, val.fn);
      });
    });
    createInEase(textBean);
  };
  //有成长值的浮层的数量
  const createTextDesc = (stage) => {
    if (textDesc) {
      textDesc.removeFromParent(stage);
    }
    textDesc = new Hilo.Text({
      color: '#38BD21',
      x: bubble.x,
      y: bubble.y + 71,
      text: '成长值',
      textAlign: 'center',
      width: 130,
    });
    textDesc.on(Hilo.event.POINTER_START, () => {
      let list = [
        {
          key: bubble,
          data: {
            y: 860,
            x: 32,
            alpha: 0,
            scaleX: 0.4,
            scaleY: 0.4,
          },
          fn: () => {
            createLevel(stageObj, true);
            fakeFeedReward();
          },
        },
        {
          key: textBean,
          data: {
            y: 880,
            x: 36,
            scaleX: 0.4,
            scaleY: 0.4,
            alpha: 0,
          },
        },
        {
          key: textDesc,
          data: {
            y: 920,
            x: 36,
            scaleX: 0.4,
            scaleY: 0.4,
            alpha: 0,
          },
        },
      ];
      list.forEach((val) => {
        createOutEase(val.key, { ...val.data }, val.fn);
      });
    });
    textDesc.setFont('24px arial');
    textDesc.addTo(stage);
    createInEase(textDesc);
  };
  //有成长值的标题
  const createInEase = (val) => {
    Hilo.Tween.remove(val);
    Hilo.Tween.to(
      val,
      {
        y: val.y + 40,
      },
      {
        ease: Hilo.Ease.Linear.EaseNone,
        duration: 2000,
        reverse: true,
        loop: true,
        onComplete: function (e) {},
      },
    );
  };
  const createOutEase = (val, data, fn) => {
    Hilo.Tween.to(
      val,
      {
        ...data,
      },
      {
        ease: Hilo.Ease.Quad.EaseIn,
        duration: 800,
        loop: false,
        onComplete: function (e) {
          val.removeFromParent(stageObj);
          fn && fn();
        },
      },
    );
  };
  //成长值浮层点击动画
  const createEatBean = (stage, falg) => {
    if (beanSprite) {
      beanSprite.removeFromParent(stage);
      beanSprite = new Sprite({
        currentFrame: 0,
        interval: 24,
        timeBased: true,
        y: pxComputed(328),
        x: pxComputed(248),
        width: pxComputed(252),
        height: pxComputed(370),
        loop: true,
      });
      let beanAnimate = HiloEatBean(responent);
      beanSprite.addFrame(beanAnimate.getSprite('eatBean'));
      beanSprite.setFrameCallback(90, (res) => {
        beanSprite.goto(42);
      });
      stage.addChild(beanSprite);
    }
  };

  //创建卡豆吃食物动画
  const createBgInit = (stage, index) => {
    let list = createBitmap({
      list: [
        {
          id: 'bg',
          image: responent.get('scene').content,
          x: 0,
          y: 0,
          width: width,
          height: height,
        },
        {
          id: 'qianScene',
          image: responent.get('qianScene').content,
          x: 0,
          y: 0,
          width: width,
          height: height,
        },
        {
          id: 'res_icon',
          image: responent.get('res_icon').content,
          x: pxComputed(-70),
          y: pxComputed(570),
          width: pxComputed(200),
          height: pxComputed(130),
          rect: [137, 30, 200, 130],
        },
        {
          id: 'res_icon',
          image: responent.get('res_icon').content,
          x: pxComputed(616),
          y: pxComputed(594),
          width: pxComputed(233),
          height: pxComputed(172),
          rect: [379, 10, 233, 172],
        },
        {
          id: 'btn_icon1',
          image: responent.get('btn_icon').content,
          x: pxComputed(32),
          y: pxComputed(725),
          width: pxComputed(120),
          height: pxComputed(120),
          rect: [179, 36, 120, 120],
        },
        {
          id: 'btn_icon2',
          image: responent.get('btn_icon').content,
          x: pxComputed(168),
          y: pxComputed(725),
          width: pxComputed(120),
          height: pxComputed(120),
          rect: [315, 36, 120, 120],
          fn: () => {
            console.log(111);
          },
        },
        {
          id: 'btn_icon3',
          image: responent.get('btn_icon').content,
          x: pxComputed(304),
          y: pxComputed(725),
          width: pxComputed(120),
          height: pxComputed(120),
          rect: [451, 36, 120, 120],
        },
      ],
    });
    stage.addChild(list[index]);
    return list[index];
  };
  //创建背景图片
  const createKeys = (stage) => {
    if (key) {
      key.removeFromParent(stageObj);
      key = null;
    }
    key = new Sprite({
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      y: (window.innerWidth / 375) * 862,
      x: (window.innerWidth / 375) * 510,
      width: pxComputed(123),
      height: pxComputed(127),
      loop: Number(gameBalance) / Number(growValueLimit) < 1 ? false : true,
    });
    let beanAnimate = HiloKeys(responent);
    key.addFrame(beanAnimate.getSprite('key'));
    if (Number(gameBalance) / Number(growValueLimit) < 1) {
      key.goto(0);
      key.stop();
    } else {
      key.setFrameCallback(32, (res) => {
        key.goto(5);
      });
    }
    stage.addChild(key);
  };
  // 钥匙
  const createLevel = (stage, flag = false) => {
    if (level) {
      level.removeFromParent(stage);
    }
    level = new Sprite({
      currentFrame: 0,
      interval: 60,
      timeBased: true,
      y: pxComputed(891),
      x: pxComputed(48),
      width: pxComputed(86),
      height: pxComputed(76),
      loop: false,
    });
    let beanAnimate = HiloLevel(responent);
    level.addFrame(beanAnimate.getSprite('level'));
    level.goto(0);
    if (!flag) {
      level.stop();
    }
    stage.addChild(level);
  };
  // 成长值
  const createBean = (stage) => {
    if (beanSprite) {
      beanSprite.removeFromParent(stage);
    }
    beanSprite = new Sprite({
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      y: pxComputed(320),
      x: pxComputed(214),
      width: pxComputed(300),
      height: pxComputed(400),
    });
    let beanAnimate = HiloBeanInfo(responent);
    beanSprite.addFrame(beanAnimate.getSprite('beanInfo'));
    stage.addChild(beanSprite);
  };
  //创建卡豆任务动画
  const createSnowTree = (stage) => {
    let scene = new Sprite({
      currentFrame: 0,
      interval: 60,
      timeBased: true,
      y: pxComputed(420),
      x: pxComputed(68),
      width: pxComputed(232),
      height: pxComputed(252),
    }).addFrame(HiloSnowTree(responent).getSprite('snow_tree'));
    stage.addChild(scene);
  };
  //创建带雪的树
  const createTree = (stage) => {
    let scene = new Sprite({
      currentFrame: 0,
      interval: 60,
      timeBased: true,
      y: pxComputed(398),
      x: 0,
      width: pxComputed(162),
      height: pxComputed(232),
    }).addFrame(HiloTree(responent).getSprite('left_tree'));
    stage.addChild(scene);
  };
  //创建左边的树

  const createFlow = (stage) => {
    let scene = new Sprite({
      currentFrame: 0,
      interval: 60,
      timeBased: true,
      y: pxComputed(754),
      x: pxComputed(513),
      width: pxComputed(156),
      height: pxComputed(90),
    }).addFrame(HiloFlow(responent).getSprite('flow'));
    stage.addChild(scene);
  };
  //创建花

  const createRightTree = (stage) => {
    let scene = new Sprite({
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      y: pxComputed(457),
      x: pxComputed(656),
      width: pxComputed(192),
      height: pxComputed(203),
    }).addFrame(HiloRightTree(responent).getSprite('rightTree'));
    stage.addChild(scene);
  };
  //创建右边的树
  const fetchPack = () => {
    fetchSignInfo({}).then((val) => {
      if (val) {
        let { hasFillSignFlag, signRecordInfo = [] } = val.content;
        let listIndex = signRecordInfo
          .map((item, index) => {
            return { ...item, index };
          })
          .filter((item) => {
            const { currentDayFlag } = item;
            return currentDayFlag === '1';
          })[0];
        listIndex = listIndex && listIndex.index;
        signRecordInfo = signRecordInfo.map((item, index) => {
          const { signFlag } = item;
          return {
            ...item,
            hasFillSignFlag:
              listIndex > index && hasFillSignFlag === '0' && signFlag === '0' ? '0' : '1',
          };
        });
        setPackData({
          signRecordInfo,
          hasFillSignFlag,
        });
      }
    });
  };
  const fetchGame = () => {
    fetchGameInfo({}).then((val) => {
      if (val) {
        const { content } = val;
        setGameData({
          ...content,
        });
      }
    });
  };
  const fakeFeedReward = () => {
    fakeReceiveFeedReward({}).then((val) => {
      if (val) {
        fetchGame();
      }
    });
  };
  const fetchUserShare = () => {
    fetchUserShareCommission({}).then((val = {}) => {
      if (val) {
        const { content = {} } = val;
        const { configUserLevelInfo = {} } = content;
        setUserInfo({ ...configUserLevelInfo });
      }
    });
  };
  const linkToBox = () => {
    if (gameBalance / growValueLimit >= 1) {
      fakeBlindBoxKeys({}).then((val) => {
        if (val) {
          toast('领取成功');
          fetchGame();
          setTimeout(() => {
            history.push('/blind');
          }, 1000);
        }
      });
    } else {
      history.push('/blind');
    }
  };
  return (
    <div className="content_box">
      <TopLayer data={gameData} regOpen={() => setVisible(true)} img={responent}></TopLayer>
      <div id="content_scene" className="content_scene"></div>
      <CheckPop
        show={visible}
        bodyClassName={'checkPop_radius'}
        position={'top'}
        className="drawer_box"
        remindFlag={remindFlag}
        openCommond={setCobyVisible}
        reloadRequest={() => {
          fetchPack();
        }}
        reload={() => {
          fetchGame();
        }}
        list={packData}
        onOpen={() => {
          setVisible(true);
        }}
        token={token}
        onClose={() => {
          setVisible(false);
        }}
      ></CheckPop>
      {/* //签到弹窗*/}
      <PackPop
        show={packVisible}
        position={'bottom'}
        className="checkPop_pack_box"
        bodyClassName={'checkPop_pack_radius'}
        onClose={() => {
          setPackVisible(false);
        }}
      ></PackPop>
      {/* //背包弹窗*/}
      <EatPop
        show={eatVisible}
        position={'bottom'}
        className="eatPop_pack_box"
        eatTimes={loseCreateTime.times}
        reload={() => {
          fetchGame();
        }}
        token={token}
        bodyClassName={'eatPop_pack_radius'}
        onClose={() => {
          setEatVisible(false);
        }}
      ></EatPop>
      {/*食物弹窗*/}
      <GrowPop
        show={growVisible}
        position={'bottom'}
        className="growPop_pack_box"
        bodyClassName={'growPop_pack_radius'}
        openWork={setWorkVisible}
        reload={() => {
          fetchGame();
        }}
        token={token}
        onClose={() => {
          setGrowVisible(false);
        }}
      ></GrowPop>
      {/*成长值弹窗*/}
      {!loseCreateTime.timeLose || loseCreateTime.timeLose <= 0 ? (
        <div className="eatPop_house_layer"></div>
      ) : (
        <div className="eatPop_house_box">
          <div className="eatPop_house_time">
            {computedSeconds(loseCreateTime.timeLose - loseCreateTime.computedTime)}
          </div>
          <div className="eatPop_house_icon"></div>
        </div>
      )}

      <div
        className="level_layer"
        onClick={() => {
          linkToBox();
        }}
      >
        <div className="level_layer_content">
          <div className="level_liner_infoBox">
            <div
              className="level_liner_info"
              style={{ width: (gameBalance / growValueLimit) * 100 + '%' }}
            ></div>
          </div>

          <div className="level_layer_num">
            {gameBalance} / {growValueLimit}
          </div>
        </div>
      </div>
      <CobyMask
        data={{ value: cobyVisible.time }}
        type="sign"
        onClose={() =>
          setCobyVisible({
            time: null,
            visible: false,
          })
        }
        show={cobyVisible.visible}
      ></CobyMask>
      <CobyMask
        data={{ value: WorkVisible.work }}
        type="nativeShareWork"
        onClose={() =>
          setWorkVisible({
            work: null,
            visible: false,
          })
        }
        show={WorkVisible.visible}
      ></CobyMask>
      <BottomContent userInfo={userInfo}></BottomContent>
    </div>
  );
};
