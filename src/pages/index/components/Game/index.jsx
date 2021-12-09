import React, { useRef, useEffect, useState } from 'react';
import './index.less';
import Hilo from 'hilojs';
import { Button } from 'antd-mobile';
import { HiloBeanInfo, HiloPlane, HiloBeanHand } from '@/components/spite';
import {
  setAnimate,
  createStar,
  createBitmap,
  createBottomStar,
  setPlaneAnimation,
  setPlanePuls,
} from '@/utils/game';
import { planeSence } from './components/Scene/plane';
import { bigTruckSence } from './components/Scene/bigTruck';
import { smallTruckSence } from './components/Scene/smallTruck';
import { expressCarSence } from './components/Scene/expressCar';
import Rules from '@/components/Rules';
import InvitaRanksModal from '@/components/InvitaRanksModal';

import TaskCloumn from './components/TaskCloumn';
import InvitationModal from './components/InvitationModal';
import Speed from './components/Speed';

const timesWeight = ((window.innerWidth * 2) / 750).toFixed(2);
const timesHeight = ((window.innerHeight * 2) / 1624).toFixed(2);

function index(props) {
  const { imgObj } = props;
  const containerRef = useRef();
  const [invateVisible, setInvateVisible] = useState('');
  const [taskVisible, setTaskVisible] = useState('');
  let spiritObj = {};
  let beanSprite = null;
  let bigStar = null;
  let speedSetTimeout = null; //飞机加速的定时器
  useEffect(() => {
    initStage();
  }, []);

  //创建舞台
  const initStage = () => {
    const stage = new Hilo.Stage({
      container: containerRef.current,
      width: window.innerWidth * 2,
      height: window.innerHeight * 2,
      scaleX: 0.5,
      scaleY: 0.5,
    });
    stage.enableDOMEvent(Hilo.event.POINTER_START, true);
    tickerStage(stage);

    //飞机动画
    // planeObj = planeSence(stage, imgObj);

    //大卡车动画
    spiritObj = bigTruckSence(stage, imgObj);

    //小卡车动画
    // smallTruckSence(stage, imgObj);

    //快递车动画
    // expressCarSence(stage, imgObj);

    //添加下方图标之类的
    addAnimationStage(stage);

    //添加豆瓶的动画
    createBean(stage);
  };

  //监听舞台
  const tickerStage = (stage) => {
    const ticker = new Hilo.Ticker(60);
    ticker.addTick(stage);
    ticker.addTick(Hilo.Tween);
    ticker.start();
  };

  //添加任务和邀请
  const addAnimationStage = (stage) => {
    const list = [
      {
        id: 'starBord',
        type: 'Bitmap',
        image: imgObj.starBord.src,
        x: 195 * timesWeight,
        y: 1450 * timesHeight,
        width: 360,
        height: 120,
      },
      {
        id: 'bigStar',
        type: 'Bitmap',
        image: imgObj.bigStar.src,
        x: 305 * timesWeight,
        y: 1381 * timesHeight,
        width: 140,
        height: 140,
      },
      {
        id: 'invateIcon',
        type: 'Bitmap',
        image: imgObj.invateIcon.src,
        x: 32 * timesWeight,
        y: 1450 * timesHeight,
        width: 120,
        height: 120,
      },
      {
        id: 'starBean',
        type: 'Bitmap',
        image: imgObj.starBean.src,
        x: 598 * timesWeight,
        y: 1450 * timesHeight,
        width: 120,
        height: 120,
      },
      {
        id: 'rectangle1',
        type: 'Bitmap',
        text: '1111',
        image: imgObj.rectangle1.src,
        x: 32 * timesWeight,
        y: 1400 * timesHeight,
        width: 120,
        height: 42,
      },
      {
        id: 'rectangle2',
        type: 'Bitmap',
        text: '1111',
        image: imgObj.rectangle2.src,
        x: 608 * timesWeight,
        y: 1400 * timesHeight,
        width: 100,
        height: 42,
      },
    ];
    const mapItem = createBitmap({
      list,
    });
    bigStar = mapItem[1];
    mapItem[1].on(Hilo.event.POINTER_START, () => {
      starAnimate(stage);
    });
    mapItem[2].on(Hilo.event.POINTER_START, () => {
      setInvateVisible(true);
    });
    mapItem[3].on(Hilo.event.POINTER_START, () => {
      setTaskVisible(true);
      0;
      0;
    });

    stage.addChild(...mapItem);
    setAnimate(mapItem, list);
  };

  //添加领豆动画
  const createBean = (stage) => {
    beanSprite = new Hilo.Sprite({
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      y: 125 * timesHeight,
      x: 558 * timesWeight,
    });
    let beanAnimate = HiloBeanInfo(imgObj);
    beanSprite.addFrame(beanAnimate.getSprite('beanBottle'));
    beanSprite.on(Hilo.event.POINTER_START, () => {
      createStar(stage, imgObj, bigStar);
    });
    stage.addChild(beanSprite);
  };

  //设置大星星的动画
  const starAnimate = (stage) => {
    Hilo.Tween.remove(bigStar);
    Hilo.Tween.fromTo(
      bigStar,
      {
        x: 305 * timesWeight,
        y: 1381 * timesHeight,
        scaleX: 1,
        scaleY: 1,
      },
      {
        x: 320 * timesWeight,
        y: 1400 * timesHeight,
        scaleX: 0.8,
        scaleY: 0.8,
      },
      {
        duration: 200,
        ease: Hilo.Ease.Linear.EaseNone,
        reverse: true,
        loop: false,
        onComplete: () => {
          createBottomStar(stage, imgObj, AnimatePlus);
        },
      },
    );
  };

  //飞机加速动画
  const AnimatePlus = () => {
    // const { plane1, plane2, planeSprite, beanHandSprite } = planeObj;
    // clearTimeout(speedSetTimeout);
    // setPlaneAnimation(planeSprite, 500, { y: 320 * timesHeight }, { y: 350 * timesHeight });
    // setPlaneAnimation(beanHandSprite, 500, { y: 500 * timesHeight }, { y: 530 * timesHeight });
    // speedSetTimeout = setTimeout(() => {
    //   setPlaneAnimation(planeSprite, 1500, { y: 320 * timesHeight }, { y: 350 * timesHeight });
    //   setPlaneAnimation(beanHandSprite, 1500, { y: 500 * timesHeight }, { y: 530 * timesHeight });
    // }, 2000);

    const { background1, background2, bigTruckSpirite } = spiritObj;

    spiritPlus(background1, background2, bigTruckSpirite);
  };

  //精灵图加速动画
  const spiritPlus = (background1, background2, spirit) => {
    clearTimeout(speedSetTimeout);
    spirit.interval = 10;
    background1.duration = 3000;
    background2.duration = 3000;
    speedSetTimeout = setTimeout(() => {
      spirit.interval = 24;
      background1.duration = 6000;
      background2.duration = 6000;
    }, 2000);
  };

  return (
    <>
      <div ref={containerRef} className="container"></div>
      <div className="container_rules">
        <Rules></Rules>
      </div>
      {/* <InvitaRanksModal visible={true}></InvitaRanksModal> */}
      {/* 领取文字 */}
      <div className="receiveText">100星豆</div>

      {/* 剩余星豆 */}
      <div className="surplusBean">
        我的星豆 <span>260</span>
      </div>

      {/* 进度 */}
      <Speed percent={50}></Speed>

      {/* 任务弹窗 */}
      <TaskCloumn
        visible={taskVisible}
        onClose={() => {
          setTaskVisible(false);
        }}
      ></TaskCloumn>
      {/* 邀请弹窗 */}
      <InvitationModal
        visible={invateVisible}
        onClose={() => {
          setInvateVisible(false);
        }}
      ></InvitationModal>
    </>
  );
}

export default index;
