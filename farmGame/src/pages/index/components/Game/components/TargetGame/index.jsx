import React, { useRef, useEffect, useState } from 'react';
import './index.less';
import Hilo, { Tween } from 'hilojs';
import { useSelector, KeepAlive } from 'umi';
import { Swiper } from 'antd-mobile';
import math from '@/utils/math';
import {
  HiloCreateSpirit,
  conversionSize,
  setAnimate,
  createStar,
  createBitmap,
  createBottomStar,
  HiloCreateSpiritbac,
} from '@/utils/game';
import { cobyInfo } from '@/utils/utils';
import { useDebounce } from 'ahooks';
import { planeSence } from '../Scene/plane';
import { bigTruckSence } from '../Scene/bigTruck';
import { smallTruckSence } from '../Scene/smallTruck';
import { expressCarSence } from '../Scene/expressCar';
import {
  fetchFreeGoodGetSupply,
  fetchFreeGoodGameSupply,
  fetchCommandGetCommand,
} from '@/services/game';
import { useUpdateEffect } from 'ahooks';
import Rules from '@/components/Rules';
import TaskCloumn from '../TaskCloumn';
import InvitationModal from '../InvitationModal';
import Speed from '../Speed';
import ShareModal from '@/components/ShareModal';
import { deviceName, nativeShareWork, nativeShareClose, linkTo } from '@/utils/birdgeContent';

const computedY = window.innerHeight * 2;
let ticker = null; //定时器
let spiritObj = []; //动画返回的对象
let beanSprite = null;
let speedSetTimeout = null; //飞机加速的定时器
let stage = null; //舞台
let bigStar = null; //大星星的实例对象
function index(props) {
  const { imgObj, getHomeDetail } = props;
  const containerRef = useRef();
  const [invateVisible, setInvateVisible] = useState(''); //合力弹窗
  const [taskVisible, setTaskVisible] = useState(''); //任务弹窗
  const [shareVisible, setShareVisible] = useState({ show: false });
  //获取所有的数据
  const { homeDetail, gameHeight } = useSelector((state) => state.receiveGoods); //所有的数据
  const { gameInfo = {} } = homeDetail;
  const {
    processId, //进度id
    starBean, //星豆数
    freeGoodInfo = {}, //商品信息
    processInfo = {}, //进度信息
    subsidyFlag, //星豆是否可领
    subsidyNum, //可领取的星豆数
    cityCode,
  } = gameInfo;
  const {
    supplyProcessStr, //进度
    supplyLevel, //等级
  } = processInfo;

  useEffect(() => {
    initStage();
  }, []);

  useEffect(() => {
    addText(stage);
  }, [starBean]);

  useUpdateEffect(() => {
    stage.removeAllChildren();
    ticker.removeTick(stage);
    ticker.removeTick(Hilo.Tween);
    initStage();
  }, [supplyLevel]);

  //创建舞台
  const initStage = () => {
    stage = new Hilo.Stage({
      container: containerRef.current,
      width: window.innerWidth * 2,
      height: window.innerHeight * 2,
      scaleX: 0.5,
      scaleY: 0.5,
    });
    stage.enableDOMEvent(Hilo.event.POINTER_START, true);
    tickerStage(stage);

    //根据等级判断显示什么场景
    checkLevel(stage, imgObj);

    //添加下方图标之类的
    addAnimationStage(stage);

    //添加补给瓶的动画
    createBean(stage);

    //  添加文字
    addText(stage);
  };

  //监听舞台
  const tickerStage = (stage) => {
    ticker = new Hilo.Ticker(60);
    ticker.addTick(stage);
    ticker.addTick(Hilo.Tween);
    ticker.start();
  };

  //根据等级判断场景
  const checkLevel = (stage, imgObj) => {
    stage.removeAllChildren();
    if (supplyLevel == 0) {
      //飞机动画
      spiritObj = planeSence(stage, imgObj, freeGoodInfo);
    } else if (supplyLevel == 1) {
      //大卡车动画
      spiritObj = bigTruckSence(stage, imgObj, freeGoodInfo);
    } else if (supplyLevel == 2) {
      //小卡车动画
      spiritObj = smallTruckSence(stage, imgObj, freeGoodInfo);
    } else if (supplyLevel == 3) {
      //快递车动画
      spiritObj = expressCarSence(stage, imgObj, freeGoodInfo);
    }
  };
  //添加任务和邀请
  const addAnimationStage = (stage) => {
    const list = [
      {
        id: 'starBord',
        type: 'Bitmap',
        image: imgObj.starBord.src,
        x: conversionSize(195),
        y: computedY - conversionSize(152 - gameHeight),
        width: conversionSize(360),
        height: conversionSize(120),
      },
      {
        id: 'bigStar',
        type: 'Bitmap',
        image: imgObj.bigStar.src,
        x: conversionSize(305),
        y: computedY - conversionSize(221 - gameHeight),
        width: conversionSize(140),
        height: conversionSize(140),
      },
      {
        id: 'invateIcon',
        type: 'Bitmap',
        image: imgObj.invateIcon.src,
        x: conversionSize(32),
        y: computedY - conversionSize(152 - gameHeight),
        width: conversionSize(120),
        height: conversionSize(120),
      },
      {
        id: 'starBean',
        type: 'Bitmap',
        image: imgObj.starBean.src,
        x: conversionSize(598),
        y: computedY - conversionSize(152 - gameHeight),
        width: conversionSize(120),
        height: conversionSize(120),
      },
      {
        id: 'rectangle1',
        type: 'Bitmap',
        text: '1111',
        image: imgObj.rectangle1.src,
        x: conversionSize(32),
        y: computedY - conversionSize(192 - gameHeight),
        width: conversionSize(120),
        height: conversionSize(42),
      },
      {
        id: 'rectangle2',
        type: 'Bitmap',
        text: '1111',
        image: imgObj.rectangle2.src,
        x: conversionSize(608),
        y: computedY - conversionSize(192 - gameHeight),
        width: conversionSize(100),
        height: conversionSize(42),
      },
    ];
    const mapItem = createBitmap({
      list,
    });
    bigStar = mapItem[1];
    console.log(mapItem, 'mapItem');
    mapItem[0].on(Hilo.event.POINTER_START, () => {
      starAnimate(mapItem[1], stage);
    });
    mapItem[1].on(Hilo.event.POINTER_START, () => {
      starAnimate(mapItem[1], stage);
    });
    mapItem[2].on(Hilo.event.POINTER_START, (e) => {
      e.preventDefault();
      setInvateVisible(true);
    });
    mapItem[3].on(Hilo.event.POINTER_START, (e) => {
      // e.stopPropagation();
      e.preventDefault();
      setTaskVisible(true);
    });

    stage.addChild(...mapItem);
    setAnimate(mapItem, list);
  };

  //添加补给站
  const createBean = (stage) => {
    beanSprite = new Hilo.Sprite({
      id: 'beanBottle',
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      width: conversionSize(160),
      height: conversionSize(180),
      x: conversionSize(558),
      y: conversionSize(175),
    });
    const beanAnimate = HiloCreateSpirit(imgObj.beanBottle.src, 33, 31, 160, 180, 'beanBottle');
    beanSprite.addFrame(beanAnimate.getSprite('beanBottle'));
    stage.addChild(beanSprite);
  };

  //点击领豆动画
  const collarBean = async () => {
    const res = await fetchFreeGoodGetSupply();
    // console.log(stage, 'stage');
    createStar(stage, imgObj, bigStar, getHomeDetail, gameHeight);
  };

  //设置大星星的动画
  const starAnimate = (bigStar, stage) => {
    Hilo.Tween.remove(bigStar);
    Hilo.Tween.fromTo(
      bigStar,
      {
        x: conversionSize(305),
        y: computedY - conversionSize(221 - gameHeight),
        scaleX: 1,
        scaleY: 1,
      },
      {
        x: conversionSize(320),
        y: computedY - conversionSize(200 - gameHeight),
        scaleX: 0.8,
        scaleY: 0.8,
      },
      {
        duration: 200,
        ease: Hilo.Ease.Linear.EaseNone,
        reverse: true,
        loop: false,
        onComplete: () => {
          gameSupply(stage);
        },
      },
    );
  };

  //补给事件
  const gameSupply = async (stage) => {
    const res = await fetchFreeGoodGameSupply({
      processId: processId,
    });
    if (res.resultCode == 1) {
      createBottomStar(stage, imgObj, spiritPlus, getHomeDetail);
    }
    // createBottomStar(stage, imgObj, spiritPlus, getHomeDetail);
  };
  //背景图加速动画
  const spiritPlus = () => {
    let [background1, background2, Spirite1] = spiritObj;
    clearTimeout(speedSetTimeout);
    console.log(background1);
    const index = background1.currentFrame;
    background2.goto(parseInt(index / 10) - 1);
    background2.visible = true;
    background1.visible = false;
    Spirite1.interval = 1;

    speedSetTimeout = setTimeout(() => {
      background1.goto(parseInt(background2.currentFrame * 10));
      background1.visible = true;
      background2.visible = false;
      Spirite1.interval = 24;
    }, 5000);
    // clearTimeout(speedSetTimeout);
    // const target = stage.getChildById('animationBac');
    // const target1 = stage.getChildById('animationBac1');

    // console.log(target);
    // Hilo.Tween.remove(target);
    // Hilo.Tween.remove(target1);
    // const imgWidth = imgObj.planeBg.width;

    // const num = target.x;
    // const num1 = target1.x;

    // speedSetTimeout = setTimeout(() => {
    //   Spirite1.interval = 1;
    //   Hilo.Tween.to(
    //     target,
    //     {
    //       x: -imgWidth,
    //     },
    //     {
    //       duration: math.divide(math.multiply(math.add(imgWidth, num), 3), 5),
    //       ease: Hilo.Ease.Linear.EaseNone,
    //       onComplete: (tween) => {
    //         Hilo.Tween.fromTo(
    //           tween.target,
    //           {
    //             x: 0,
    //           },
    //           {
    //             x: num,
    //           },
    //           {
    //             duration: math.divide(math.multiply(-num, 3), 5),
    //             ease: Hilo.Ease.Linear.EaseNone,
    //             loop: false,
    //             onComplete: (tween) => {
    //               Spirite1.interval = 24;
    //               Hilo.Tween.to(
    //                 tween.target,
    //                 {
    //                   x: -imgWidth,
    //                 },
    //                 {
    //                   duration: math.multiply(math.add(imgWidth, tween.target.x), 3),
    //                   ease: Hilo.Ease.Linear.EaseNone,
    //                   loop: false,
    //                   onComplete: (tween) => {
    //                     Hilo.Tween.fromTo(
    //                       tween.target,
    //                       {
    //                         x: 0,
    //                       },
    //                       {
    //                         x: -imgWidth,
    //                       },
    //                       {
    //                         duration: 9000,
    //                         ease: Hilo.Ease.Linear.EaseNone,
    //                         loop: true,
    //                       },
    //                     );
    //                   },
    //                 },
    //               );
    //             },
    //           },
    //         );
    //       },
    //     },
    //   );

    //   Hilo.Tween.to(
    //     target1,
    //     {
    //       x: 0,
    //     },
    //     {
    //       duration: math.divide(math.multiply(num1, 3), 5),
    //       ease: Hilo.Ease.Linear.EaseNone,
    //       onComplete: (tween) => {
    //         Hilo.Tween.fromTo(
    //           tween.target,
    //           {
    //             x: imgWidth,
    //           },
    //           {
    //             x: num1,
    //           },
    //           {
    //             duration: math.divide(math.multiply(math.subtract(imgWidth, num1), 3), 5),
    //             ease: Hilo.Ease.Linear.EaseNone,
    //             loop: false,
    //             onComplete: (tween) => {
    //               Hilo.Tween.to(
    //                 tween.target,
    //                 {
    //                   x: 0,
    //                 },
    //                 {
    //                   duration: math.multiply(num1, 3),
    //                   ease: Hilo.Ease.Linear.EaseNone,
    //                   loop: false,
    //                   onComplete: (tween) => {
    //                     Hilo.Tween.fromTo(
    //                       tween.target,
    //                       {
    //                         x: imgWidth,
    //                       },
    //                       {
    //                         x: 0,
    //                       },
    //                       {
    //                         duration: 9000,
    //                         ease: Hilo.Ease.Linear.EaseNone,
    //                         loop: true,
    //                       },
    //                     );
    //                   },
    //                 },
    //               );
    //             },
    //           },
    //         );
    //       },
    //     },
    //   );
    // });
  };

  //改变元素运动

  //打开弹窗并且复制口令
  const openModal = async (type, id) => {
    const btnType = {
      nativeShareWork: 'freeTaskHelp',
      nativeShareClose: 'gameTogether',
    }[type];
    if (deviceName() != 'miniProgram') {
      const res = await fetchCommandGetCommand({
        commandType: { nativeShareWork: 'freeTaskHelp', nativeShareClose: 'freeTogether' }[type],
        relateId: id,
      });
      const { command } = res.content;
      cobyInfo(command, { show: true, type, value: id }, (val) => {
        setShareVisible(val);
      });
    } else {
      linkTo({
        wechat: {
          url: `/pages/share/gameHelp/index?subType=${btnType}&shareId=${id}`,
        },
      });
    }
  };

  const addText = (stage) => {
    stage.removeChildById('myBean1');
    const list = [
      {
        id: 'myBean1',
        type: 'Text',
        color: '#fff',
        font: '28px arial',
        text: `我的星豆${starBean}`,
        maxWidth: conversionSize(400),
        width: conversionSize(400),
        textAlign: 'center',
        x: conversionSize(170),
        y: computedY - conversionSize(80 - gameHeight),
      },
    ];
    const mapItem = createBitmap({
      list,
    });
    stage.addChild(...mapItem);
  };

  return (
    <>
      <div ref={containerRef} className="container"></div>
      <div className="container_rules">
        <Rules></Rules>
      </div>
      {/* 领取文字 */}
      <div className="receiveText" onClick={subsidyFlag === '1' ? collarBean : null}>
        {subsidyFlag === '1' ? (
          `${subsidyNum}星豆`
        ) : (
          <Swiper
            autoplay
            direction="vertical"
            loop
            allowTouchMove={false}
            indicator={() => null}
            className="receiveText_swiper"
          >
            <Swiper.Item>明日领取</Swiper.Item>
            <Swiper.Item>{subsidyNum}星豆</Swiper.Item>
          </Swiper>
        )}
      </div>

      {/* 剩余星豆 */}
      {/* <div className="surplusBean">
        我的星豆 <span>{starBean}</span>
      </div> */}

      {/* 进度 */}
      <Speed processInfo={processInfo} cityCode={cityCode}></Speed>

      {/* 任务弹窗 */}
      <TaskCloumn
        visible={taskVisible}
        onClose={() => {
          setTaskVisible(false);
        }}
        getHomeDetail={getHomeDetail}
        processId={processId}
        openModal={openModal}
      ></TaskCloumn>
      {/* 合力弹窗 */}
      <InvitationModal
        visible={invateVisible}
        onClose={() => {
          setInvateVisible(false);
        }}
        processId={processId}
        openModal={openModal}
        supplyLevel={supplyLevel}
      ></InvitationModal>
      {/* 分享弹窗 */}
      <ShareModal
        data={{ value: shareVisible.value }}
        type={shareVisible.type}
        visible={shareVisible}
        onClose={() => {
          setShareVisible({ show: false });
        }}
      ></ShareModal>
    </>
  );
}

export default index;
