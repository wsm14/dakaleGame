import React, { useState, useEffect, useRef } from 'react';
import Hilo, { Stage, Tween, Sprite } from 'hilojs';
import { fetchUserShareCommission } from '@/services/game';
import { nativeClose } from '@/utils/birdgeContent';
import { createBitmap, conversionSize, HiloCreateSpirit } from '@/utils/game';
import { TrunkScene } from './components/Scene/index';
import { history } from 'umi';
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

let stage = null;
let SpriteGroup = null;
let fertilizerSprite = null;
let handSprite = null;
const index = (props) => {
  const { imgObj } = props;
  console.log(imgObj);
  const width = window.innerWidth * 2;
  const height = (window.innerWidth / 375) * 620 * 2;
  const [userInfo, setUserInfo] = useState({});
  const [gameData, setGameData] = useState({});
  const [invitaVisible, setInvitaVisible] = useState(false); //合种弹窗
  const [taskVisible, setTaskVisible] = useState(false); //任务弹窗
  const containerRef = useRef(); //canvas的ref

  useEffect(() => {
    // fetchUserShare();
    initStage();
  }, []);

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
    createTick(stage);
    initOther(stage);
  };
  const initOther = (stage) => {
    createBgInit(stage, 0);

    // //白鹭动画
    // creatWhiteGull(stage);

    const receive = createBgInit(stage, 1);
    const foote = createBgInit(stage, 2);
    const help = createBgInit(stage, 3);
    const task = createBgInit(stage, 4);
    const meng = createBgInit(stage, 5);

    //树的动画
    SpriteGroup = TrunkScene(stage, imgObj);
    //添加施肥
    creatFertilizer(stage);

    //信箱精灵图
    creatMessage(stage);

    //豆子精灵图
    creatBean(stage);

    //一段间隔的星星精灵图
    // creatStar(stage);

    //手指动画
    creatHand(stage);

    receive.on(Hilo.event.POINTER_START, (e) => {
      e.preventDefault();
      clickInEase(receive, () => {});
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
        history.push('/footer');
      });
    });
  };

  const createTick = (stage) => {
    let ticker = new Hilo.Ticker(60);
    //把舞台加入到tick队列
    ticker.addTick(stage);
    ticker.addTick(Tween);
    //启动ticker
    ticker.start();
  };

  //添加图片
  const createBgInit = (stage, index) => {
    let list = createBitmap({
      list: [
        {
          id: 'bg',
          image: imgObj.bg.src,
          x: 0,
          y: 0,
          width: width,
          height: height,
        },
        {
          id: 'receiveIcon',
          image: imgObj.receiveIcon.src,
          x: conversionSize(32),
          y: conversionSize(240),
          width: conversionSize(120),
          height: conversionSize(120),
        },
        {
          id: 'footIcon',
          image: imgObj.footIcon.src,
          x: conversionSize(32),
          y: conversionSize(380),
          width: conversionSize(120),
          height: conversionSize(120),
        },
        {
          id: 'helpIcon',
          image: imgObj.helpIcon.src,
          x: conversionSize(32),
          y: conversionSize(1048),
          width: conversionSize(120),
          height: conversionSize(120),
        },
        {
          id: 'taskIcon',
          image: imgObj.taskIcon.src,
          x: conversionSize(598),
          y: conversionSize(1048),
          width: conversionSize(120),
          height: conversionSize(120),
        },
        {
          id: 'meng',
          image: imgObj.meng.src,
          x: conversionSize(195),
          y: conversionSize(1048),
          width: conversionSize(360),
          height: conversionSize(120),
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

  //白鹭精灵图
  const creatWhiteGull = (stage) => {
    let whiteGullSprite = new Hilo.Sprite({
      id: 'whiteGull',
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      width: conversionSize(750),
      height: conversionSize(188),
      x: 0,
      y: conversionSize(170),
    });

    let whiteGullAnimate = HiloCreateSpirit(imgObj.whiteGull.src, 189, 5, 750, 188, 'whiteGull');
    whiteGullSprite.addFrame(whiteGullAnimate.getSprite('whiteGull'));
    // whiteGullSprite.setFrameCallback(whiteGullSprite.getNumFrames() - 1, () => {
    //   whiteGullSprite.removeFromParent(stage);
    //   setTimeout(() => {
    //     creatWhiteGull(stage);
    //   }, 3000);
    // });
    stage.addChild(whiteGullSprite);
  };

  //添加施肥精灵图
  const creatFertilizer = (stage) => {
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
    let fertilizerAnimate = HiloCreateSpirit(imgObj.fertilizer.src, 46, 15, 320, 458, 'fertilizer');
    fertilizerSprite.addFrame(fertilizerAnimate.getSprite('fertilizer'));
    fertilizerSprite.stop();
    fertilizerSprite.on(Hilo.event.POINTER_START, (e) => {
      e.preventDefault();
      handSprite.removeFromParent(stage);
      fertilizerSprite.play();
      fertilizerSprite.setFrameCallback(fertilizerSprite.getNumFrames() - 1, () => {
        SpriteGroup.endClick();
        fertilizerSprite.goto(0);
        fertilizerSprite.stop();
      });
    });
    stage.addChild(fertilizerSprite);
  };

  //信箱精灵图
  const creatMessage = (stage) => {
    let messageSprite = new Hilo.Sprite({
      id: 'fertilizer',
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      width: conversionSize(120),
      height: conversionSize(150),
      x: conversionSize(595),
      y: conversionSize(580),
    });
    let messageAnimate = HiloCreateSpirit(imgObj.message.src, 74, 41, 120, 150, 'message');
    messageSprite.addFrame(messageAnimate.getSprite('message'));
    messageSprite.on(Hilo.event.POINTER_START, (e) => {
      e.preventDefault();
    });
    stage.addChild(messageSprite);
  };

  //豆子精灵图
  const creatBean = (stage) => {
    let beanFlag = true;
    let beanSprite = new Hilo.Sprite({
      id: 'beanImg1',
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      width: conversionSize(180),
      height: conversionSize(220),
      x: conversionSize(555),
      y: conversionSize(650),
    });
    let messageAnimate = HiloCreateSpirit(imgObj.beanImg1.src, 71, 27, 180, 220, 'beanImg1');
    beanSprite.addFrame(messageAnimate.getSprite('beanImg1'));
    beanSprite.setFrameCallback(beanSprite.getNumFrames() - 1, () => {
      // beanSprite.removeFromParent(stage);
      // creatBeanLoop(stage);
    });
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
    let handAnimate = HiloCreateSpirit(imgObj.hand.src, 15, 16, 159, 109, 'hand');
    handSprite.addFrame(handAnimate.getSprite('hand'));
    handSprite.on(Hilo.event.POINTER_START, (e) => {
      e.preventDefault();
    });
    stage.addChild(handSprite);
  };

  //星星精灵图
  const creatStar = (stage) => {
    let starSprite = new Hilo.Sprite({
      id: 'star',
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      width: conversionSize(746),
      height: conversionSize(452),
      x: 0,
      y: conversionSize(450),
    });
    let starAnimate = HiloCreateSpirit(imgObj.star.src, 23, 6, 746, 452, 'star');
    starSprite.addFrame(starAnimate.getSprite('star'));
    starSprite.setFrameCallback(starSprite.getNumFrames() - 1, () => {
      starSprite.removeFromParent(stage);
      setTimeout(() => {
        creatStar(stage);
      }, 10000);
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

  return (
    <>
      <TitleBlock src={title_Img} back={nativeClose}></TitleBlock>
      <TopLayer data={gameData}></TopLayer>
      <div ref={containerRef} className="content_scene"></div>

      {/* 通知信息 */}
      <div className="messageTips">你有一封信</div>

      {/*进度条*/}
      <ProgressBar></ProgressBar>

      {/* 我的肥料 */}
      <div className="myFertilizer">我的肥料 260</div>

      {/* <BottomContent userInfo={userInfo}></BottomContent> */}

      {/* 奖品弹窗 */}
      {/* <PrizeModal></PrizeModal> */}

      {/* 等级弹窗 */}
      {/* <LevelModal></LevelModal> */}

      {/* 旅行弹窗 */}
      {/* <TravelModal></TravelModal> */}

      {/* 合种弹窗 */}
      <InvitationModal
        visible={invitaVisible}
        onClose={() => {
          setInvitaVisible(false);
        }}
      ></InvitationModal>

      {/* 任务弹窗 */}
      {/* <TaskCloumn
        visible={taskVisible}
        onClose={() => {
          setTaskVisible(false);
        }}
      ></TaskCloumn> */}
    </>
  );
};

export default index;
