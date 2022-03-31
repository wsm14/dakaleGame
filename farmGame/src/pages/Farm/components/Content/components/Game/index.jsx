import React, { useState, useEffect, useRef, useMemo } from 'react';
import Hilo from 'hilojs';
import { useUpdateLayoutEffect } from 'ahooks';
import {
  fetchUserShareCommission,
  fetchFarmSpreadManure,
  fetchFarmGetReceiveTravelReward,
} from '@/services/game';
import { nativeClose, linkToMyGoods, deviceName } from '@/utils/birdgeContent';
import { createBitmap, conversionSize, HiloCreateSpirit, getLevel } from '@/utils/game';
import evens from '@/utils/evens';
import { reloadTab } from '@/utils/utils';
import { TrunkScene } from './components/Scene/index';
import { history } from 'umi';
import Track from '@/components/tracking';
import TitleBlock from '@/components/TitleBlock';
import BottomContent from './components/BottomContent';
import TopLayer from './components/TopLayer';
import PrizeModal from './components/PrizeModal';
import LevelModal from './components/LevelModal';
import TravelModal from './components/TravelModal';
import ProgressBar from './components/ProgressBar';
import InvitationModal from './components/InvitationModal';
import TaskCloumn from './components/TaskCloumn';
import title_Img from '@/asstes/image/titleImg.png';
import './index.less';
import { Toast } from 'antd-mobile-v5';

let stage = null;
let SpriteGroup = null;
let fertilizerSprite = null;
let handSprite = null;
let beanSprite = null;
let messageSprite = null;
let whiteGullSprite = null;
let starSprite = null;
let ticker = null;
const index = (props) => {
  const { imgObj, gameDetail, getGameDetail } = props;
  const width = window.innerWidth * 2;
  const height = (window.innerWidth / 375) * 620 * 2;
  const [userInfo, setUserInfo] = useState({});
  const [gameData, setGameData] = useState({});
  const [prizeVisible, setPrizeVisible] = useState(false); //奖品弹窗
  const [levelVisible, setLevelVisible] = useState(false); //等级弹窗
  const [travelVisible, setTravelVisible] = useState(false); //旅行弹窗
  const [travelData, setTravelData] = useState({});
  const [invitaVisible, setInvitaVisible] = useState(false); //合种弹窗
  const [taskVisible, setTaskVisible] = useState(false); //任务弹窗
  const containerRef = useRef(); //canvas的ref
  const numRef = useRef(); //埋点ref
  const {
    gameProcessStrapInfo = {},
    gameInfo = {},
    gameProcessInfo = {}, //奖品信息
    travelStatus, //卡豆旅行状态2 - 待出走1 - 已返回,未领取 0 - 已出走,未返回
  } = gameDetail;
  const {
    progressIdStr, //进度id
  } = gameProcessStrapInfo;

  const {
    gameLevel = 1, //等级
    prizeName, //奖品名称
    prizeImg, //奖品图片
    status, //状态 0 - 已结束 1 - 正在进行
  } = gameProcessInfo;

  const levelType = useMemo(() => getLevel(gameLevel, status), [gameLevel, status]);

  useEffect(() => {
    fetchUserShare();
    initStage();
    reloadTab(
      () => {
        if (ticker) {
          ticker.removeTick(stage);
          ticker.removeTick(Hilo.Tween);
          ticker = null;
        }
        createTick(stage);
      },
      () => {
        ticker.removeTick(stage);
        ticker.removeTick(Hilo.Tween);
        ticker = null;
      },
    );
    history.listen((location, action) => {
      if (location.pathname === '/farm') {
        if (ticker) {
          ticker.removeTick(stage);
          ticker.removeTick(Hilo.Tween);
          ticker = null;
        }
        createTick(stage);
      }
    });
  }, []);

  useEffect(() => {
    if (travelStatus === '0') {
      createBgInit(stage, 6);
      messageSprite && messageSprite.removeFromParent(stage);
      beanSprite && beanSprite.removeFromParent(stage);
    } else if (travelStatus === '1') {
      stage.getChildById('mailBox') && stage.getChildById('mailBox').removeFromParent(stage);
      //信箱精灵图
      creatMessage(stage);
      //添加豆子精灵图
      creatBean(stage);
    } else if (travelStatus === '2') {
      messageSprite && messageSprite.removeFromParent(stage);
      createBgInit(stage, 6);
      //添加豆子精灵图
      creatBean(stage);
    }
  }, [travelStatus]);

  useEffect(() => {
    //树的动画
    SpriteGroup = TrunkScene(stage, imgObj, levelType);
    //添加施肥
    addSpirit();
  }, [levelType]);

  useEffect(() => {
    //手指动画
    if (!localStorage.getItem('hand')) {
      creatHand(stage);
    }
  }, []);

  useUpdateLayoutEffect(() => {
    if (gameLevel % 5 === 0) {
      setLevelVisible(true);
    } else {
      setPrizeVisible(true);
    }
  }, [gameLevel]);

  //初始化舞台
  const initStage = () => {
    stage = new Hilo.Stage({
      renderType: 'canvas',
      container: containerRef.current,
      width: width,
      height: height,
      scaleX: 0.5,
      scaleY: 0.5,
    });
    stage.enableDOMEvent(Hilo.event.POINTER_START, true);
    // stage.enableDOMEvent(Hilo.event.POINTER_MOVE, true);
    stage.enableDOMEvent(Hilo.event.POINTER_END, true);

    createTick(stage);
    initOther(stage);
    evens.$on('tickInit', () => {
      createTick(stage);
    });
  };
  const initOther = (stage) => {
    createBgInit(stage, 0);

    //白鸥动画
    creatWhiteGull(stage);

    const receive = createBgInit(stage, 1);
    const foote = createBgInit(stage, 2);
    const help = createBgInit(stage, 3);
    const task = createBgInit(stage, 4);
    const meng = createBgInit(stage, 5);

    //一段间隔的星星精灵图
    // creatStar(stage);

    receive.on(Hilo.event.POINTER_START, (e) => {
      e.preventDefault();
      clickInEase(receive, () => {
        linkToMyGoods();
      });
    });
    help.on(Hilo.event.POINTER_START, (e) => {
      e.preventDefault();
      clickInEase(help, setInvitaVisible(true));
    });
    task.on(Hilo.event.POINTER_START, (e) => {
      e.preventDefault();
      clickInEase(task, setTaskVisible(true));
    });
    foote.on(Hilo.event.POINTER_START, (e) => {
      e.preventDefault();
      clickInEase(foote, () => {
        ticker.removeTick(stage);
        ticker.removeTick(Hilo.Tween);
        ticker = null;
        numRef.current.setHandleOpen({
          name: 'footPrint',
          args: {
            device: deviceName(),
          },
        });
        history.push('/footer');
      });
    });
  };

  const createTick = (stage) => {
    ticker = new Hilo.Ticker(60);
    ticker.addTick(stage);
    ticker.addTick(Hilo.Tween);
    ticker.start();
  };

  //添加图片
  const createBgInit = (stage, index) => {
    let list = createBitmap({
      list: [
        {
          id: 'bg',
          image: imgObj.get('bg').content,
          x: 0,
          y: 0,
          width: width,
          height: height,
        },
        {
          id: 'receiveIcon',
          image: imgObj.get('receiveIcon').content,
          x: conversionSize(32),
          y: conversionSize(240),
          width: conversionSize(120),
          height: conversionSize(120),
        },
        {
          id: 'footIcon',
          image: imgObj.get('footIcon').content,
          x: conversionSize(32),
          y: conversionSize(380),
          width: conversionSize(120),
          height: conversionSize(120),
        },
        {
          id: 'helpIcon',
          image: imgObj.get('helpIcon').content,
          x: conversionSize(32),
          y: conversionSize(1048),
          width: conversionSize(120),
          height: conversionSize(120),
        },
        {
          id: 'taskIcon',
          image: imgObj.get('taskIcon').content,
          x: conversionSize(598),
          y: conversionSize(1048),
          width: conversionSize(120),
          height: conversionSize(120),
        },
        {
          id: 'meng',
          image: imgObj.get('meng').content,
          x: conversionSize(195),
          y: conversionSize(1048),
          width: conversionSize(360),
          height: conversionSize(120),
        },
        {
          id: 'mailBox',
          image: imgObj.get('mailBox').content,
          x: conversionSize(595),
          y: conversionSize(580),
          width: conversionSize(120),
          height: conversionSize(150),
        },
        {
          id: 'mature',
          image: imgObj.get('mature').content,
          x: conversionSize(305),
          y: conversionSize(720),
          width: conversionSize(150),
          height: conversionSize(112),
        },
      ],
    });
    stage.addChild(list[index]);
    return list[index];
  };

  //点击按钮动效
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

  const addSpirit = () => {
    creatFertilizer(stage);
    if (levelType === 'bigTree') {
      const mature = createBgInit(stage, 7);
      mature.on(Hilo.event.POINTER_START, (e) => {
        e.preventDefault();
        clickInEase(mature, () => {
          setPrizeVisible(true);
        });
      });
    } else {
      stage.getChildById('mature') && stage.getChildById('mature').removeFromParent(stage);
    }
  };

  //白鹭精灵图
  const creatWhiteGull = (stage) => {
    if (whiteGullSprite) {
      whiteGullSprite.removeFromParent(stage);
    }

    whiteGullSprite = new Hilo.Sprite({
      id: 'whiteGull',
      currentFrame: 0,
      interval: 50,
      timeBased: true,
      width: conversionSize(80),
      height: conversionSize(78),
      x: 0 - 80,
      y: conversionSize(170),
    });

    let whiteGullAnimate = HiloCreateSpirit(
      imgObj.get('whiteGull').content,
      11,
      12,
      80,
      78,
      'whiteGull',
    );
    whiteGullSprite.addFrame(whiteGullAnimate.getSprite('whiteGull'));
    Hilo.Tween.to(
      whiteGullSprite,
      {
        x: width + 80,
        y: conversionSize(170),
      },
      {
        duration: 10000,
        delay: 0,
        loop: true,
        repeatDelay: 3000,
        ease: Hilo.Ease.Quad.EaseIn,
      },
    );
    stage.addChild(whiteGullSprite);
  };

  //添加施肥精灵图
  const creatFertilizer = async (stage, reload = false) => {
    // if (reload) {
    //   let test = new Hilo.Sprite({
    //     id: 'fertilizer',
    //     currentFrame: 0,
    //     loop: false,
    //     interval: 24,
    //     timeBased: true,
    //     width: conversionSize(320),
    //     height: conversionSize(458),
    //     x: conversionSize(215),
    //     y: conversionSize(660),
    //   });
    //   let fertilizerAnimate = HiloCreateSpirit(
    //     imgObj.get('fertilizer').content,
    //     46,
    //     15,
    //     320,
    //     458,
    //     'fertilizer',
    //   );
    //   test.addFrame(fertilizerAnimate.getSprite('fertilizer'));
    //   test.stop();
    //   test.on(Hilo.event.POINTER_START, (e) => {
    //     if (status == 1) {
    //       e.preventDefault();
    //       localStorage.setItem('hand', '1');
    //       handSprite && handSprite.removeFromParent(stage);
    //       fertilizerSprite.play();
    //       fertilizerSprite.setFrameCallback(fertilizerSprite.getNumFrames() - 1, async () => {
    //         SpriteGroup.creatTrunkEnd();
    //         fertilizerSprite.goto(0);
    //         fertilizerSprite.stop();
    //         const res = await fetchFarmSpreadManure({
    //           gameProgressIdStr: progressIdStr,
    //         });
    //         if (res.success) {
    //           getGameDetail();
    //         } else {
    //           setTaskVisible(true);
    //         }
    //       });
    //     } else {
    //       Toast.show({
    //         content: '游戏已结束',
    //       });
    //     }
    //   });
    //   stage.addChild(test);
    //   setTimeout(() => {
    //     fertilizerSprite.removeFromParent(stage);
    //     fertilizerSprite = test;
    //   }, 100);
    //   return;
    // }
    fertilizerSprite && fertilizerSprite.removeFromParent(stage);
    let stageX = 0;

    fertilizerSprite = new Hilo.Sprite({
      id: 'fertilizer',
      currentFrame: 0,
      loop: false,
      interval: 24,
      timeBased: true,
      width: conversionSize(320),
      height: conversionSize(458),
      x: conversionSize(215),
      y: conversionSize(660),
    });
    let fertilizerAnimate = HiloCreateSpirit(
      imgObj.get('fertilizer').content,
      46,
      15,
      320,
      458,
      'fertilizer',
    );
    fertilizerSprite.addFrame(fertilizerAnimate.getSprite('fertilizer'));
    fertilizerSprite.stop();

    fertilizerSprite.on(Hilo.event.POINTER_START, (e) => {
      stageX = e.stageX;
    });
    fertilizerSprite.on(Hilo.event.POINTER_END, (e) => {
      e.preventDefault();
      let difference = stageX - e.stageX;
      console.log(difference);
      if (difference === 0) {
        if (status == 1) {
          console.log(deviceName());
          // 施肥埋点
          numRef.current.setHandleOpen({
            name: 'fertilizer',
            args: {
              device: deviceName(),
            },
          });
          e.preventDefault();
          localStorage.setItem('hand', '1');
          handSprite && handSprite.removeFromParent(stage);
          fertilizerSprite.play();
          fertilizerSprite.setFrameCallback(fertilizerSprite.getNumFrames() - 1, async () => {
            SpriteGroup.endClick();
            fertilizerSprite.goto(0);
            fertilizerSprite.stop();
            const res = await fetchFarmSpreadManure({
              gameProgressIdStr: progressIdStr,
            });
            if (res.resultDesc === '肥料不足') {
              Toast.show({
                content: res.resultDesc,
              });
              setTaskVisible(true);
            }
            getGameDetail();
          });
        } else {
          Toast.show({
            content: '游戏已结束',
          });
        }
      }
    });

    stage.addChild(fertilizerSprite);
  };

  //信箱精灵图
  const creatMessage = (stage) => {
    if (messageSprite) {
      messageSprite.removeFromParent(stage);
    }

    messageSprite = new Hilo.Sprite({
      id: 'message',
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      width: conversionSize(120),
      height: conversionSize(150),
      x: conversionSize(595),
      y: conversionSize(580),
    });
    let messageAnimate = HiloCreateSpirit(
      imgObj.get('message').content,
      74,
      41,
      120,
      150,
      'message',
    );
    messageSprite.addFrame(messageAnimate.getSprite('message'));
    messageSprite.on(Hilo.event.POINTER_START, (e) => {
      e.preventDefault();
      getMessage();
    });
    stage.addChild(messageSprite);
  };

  const getMessage = async () => {
    const res = await fetchFarmGetReceiveTravelReward({
      gameProgressIdStr: progressIdStr,
      needDoubleFlag: '0',
    });
    if (res.success) {
      const { rewardInfo = {} } = res.content;
      setTravelData(rewardInfo);
      setTravelVisible(true);
    }
  };

  //豆子精灵图
  const creatBean = (stage) => {
    if (beanSprite) {
      beanSprite.removeFromParent(stage);
    }

    beanSprite = new Hilo.Sprite({
      id: 'beanImg1',
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      width: conversionSize(180),
      height: conversionSize(220),
      x: conversionSize(555),
      y: conversionSize(650),
    });
    let messageAnimate = HiloCreateSpirit(
      imgObj.get('beanImg1').content,
      71,
      27,
      180,
      220,
      'beanImg1',
    );
    beanSprite.addFrame(messageAnimate.getSprite('beanImg1'));
    // beanSprite.setFrameCallback(beanSprite.getNumFrames() - 1, () => {
    //   creatBeanLoop(stage);
    //   beanSprite.removeFromParent(stage);
    // });
    stage.addChild(beanSprite);
  };

  //豆子循环状态精灵图
  const creatBeanLoop = (stage) => {
    let beanLoopSprite = new Hilo.Sprite({
      id: 'beanImg2',
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      width: conversionSize(180),
      height: conversionSize(220),
      x: conversionSize(555),
      y: conversionSize(650),
    });
    let beanLoopAnimate = HiloCreateSpirit(imgObj.beanImg2.src, 21, 22, 180, 220, 'beanImg2');
    beanLoopSprite.addFrame(beanLoopAnimate.getSprite('beanImg2'));
    stage.addChild(beanLoopSprite);
  };

  //手指精灵图
  const creatHand = (stage) => {
    handSprite = new Hilo.Sprite({
      id: 'hand',
      currentFrame: 0,
      interval: 40,
      timeBased: true,
      width: conversionSize(159),
      height: conversionSize(109),
      x: conversionSize(420),
      y: conversionSize(1000),
    });
    let handAnimate = HiloCreateSpirit(imgObj.get('hand').content, 15, 16, 159, 109, 'hand');
    handSprite.addFrame(handAnimate.getSprite('hand'));
    handSprite.on(Hilo.event.POINTER_START, (e) => {
      e.preventDefault();
    });
    stage.addChild(handSprite);
  };

  //星星精灵图
  const creatStar = (stage) => {
    if (starSprite) {
      starSprite.removeFromParent(stage);
    }
    starSprite = new Hilo.Sprite({
      id: 'star',
      currentFrame: 0,
      interval: 30,
      timeBased: true,
      width: conversionSize(582),
      height: conversionSize(370),
      x: conversionSize(50),
      y: conversionSize(450),
    });
    let starAnimate = HiloCreateSpirit(imgObj.get('star').content, 26, 8, 582, 370, 'star');
    starSprite.addFrame(starAnimate.getSprite('star'));
    starSprite.setFrameCallback(starSprite.getNumFrames() - 1, () => {
      starSprite.removeFromParent(stage);
      setTimeout(() => {
        creatStar(stage);
      }, 4000);
    });
    stage.addChild(starSprite);
  };

  //获取权益商品
  const fetchUserShare = () => {
    fetchUserShareCommission({}).then((val = {}) => {
      if (val) {
        const { content = {} } = val;
        const { configUserLevelInfo = {} } = content;
        setUserInfo({ ...configUserLevelInfo });
      }
    });
  };

  const removeAll = () => {
    stage.removeAllChildren();
    ticker.removeTick(stage);
    ticker.removeTick(Hilo.Tween);
  };
  return (
    <>
      <TitleBlock src={title_Img} back={nativeClose}></TitleBlock>
      <TopLayer data={gameDetail} type={levelType}></TopLayer>
      <div ref={containerRef} className="content_scene"></div>

      {/* 通知信息 */}
      <div
        className={`messageTips ${travelStatus === '1' ? 'messageTips_animation' : ''}`}
        onClick={getMessage}
      >
        你有一封信
      </div>

      {/* 空邮箱 */}

      {/* {travelStatus !== '1' && <img src={mailbox} alt="" className="emptyMessage" />} */}

      {/* 通知信息  不在家 */}
      <div
        className={`messageTipsEmpty ${travelStatus === '0' ? 'messageTipsEmpty_animation' : ''}`}
      >
        我去旅行啦~
      </div>

      {/*进度条*/}
      <ProgressBar data={gameProcessInfo}></ProgressBar>

      {/* 商品信息 */}

      <div
        className={`myGoods myGoods_${levelType}`}
        onClick={() => {
          setPrizeVisible(true);
        }}
      >
        <div className="myGoods_img">
          <img src={prizeImg} alt="" />
        </div>
        <div className="myGoods_nickName">{prizeName}</div>
      </div>

      {/* 我的肥料 */}
      <div className="myFertilizer">我的肥料 {gameInfo.gameBalance}</div>

      <BottomContent userInfo={userInfo}></BottomContent>

      {/* 奖品弹窗 */}
      <PrizeModal
        prizeData={gameProcessInfo}
        visible={prizeVisible}
        onClose={() => {
          setPrizeVisible(false);
        }}
        status={status}
        addressData={gameProcessStrapInfo}
        getGameDetail={getGameDetail}
        removeAll={removeAll}
      ></PrizeModal>

      {/* 等级弹窗 */}
      <LevelModal
        levelData={gameProcessInfo}
        visible={levelVisible}
        onClose={() => {
          setLevelVisible(false);
        }}
      ></LevelModal>

      {/* 旅行弹窗 */}
      <TravelModal
        visible={travelVisible}
        onClose={() => {
          setTravelVisible(false);
          getGameDetail();
        }}
        travelInfo={travelData}
      ></TravelModal>

      {/* 合种弹窗 */}
      <InvitationModal
        visible={invitaVisible}
        onClose={() => {
          setInvitaVisible(false);
        }}
        processId={progressIdStr}
        getGameDetail={getGameDetail}
      ></InvitationModal>

      {/* 任务弹窗 */}
      <TaskCloumn
        visible={taskVisible}
        onClose={() => {
          setTaskVisible(false);
        }}
        processId={progressIdStr}
        getGameDetail={getGameDetail}
      ></TaskCloumn>
      {/* 埋点数据 */}
      <Track cRef={numRef}></Track>
    </>
  );
};

export default index;
