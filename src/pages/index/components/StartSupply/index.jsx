import React, { useRef, useEffect } from 'react';
import './index.less';
import Hilo from 'hilojs';
import { useDispatch } from 'umi';
import { planeSence } from '../Game/components/Scene/plane';
import { HiloCreateSpirit } from '@/utils/game';
import { createBitmap } from '@/utils/game';
import Rules from '@/components/Rules';

const timesWeight = ((window.innerWidth * 2) / 750).toFixed(2);
const timesHeight = ((window.innerHeight * 2) / 1624).toFixed(2);

function index(props) {
  const { imgObj } = props;
  const containerRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    initStage();
  }, []);

  let HandSpirite = null;
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

    //画出动画
    planeSence(stage, imgObj);

    //画按钮
    addButtonStage(stage);

    // //画手
    addHandSpirit(stage);
  };

  //监听舞台
  const tickerStage = (stage) => {
    const ticker = new Hilo.Ticker(60);
    ticker.addTick(stage);
    ticker.addTick(Hilo.Tween);
    ticker.start();
  };

  //添加图片
  const addButtonStage = (stage) => {
    let list = [
      {
        id: 'button',
        type: 'Bitmap',
        image: imgObj.button.src,
        width: 480,
        height: 90,
        x: 135 * timesWeight,
        y: 1250 * timesHeight,
      },
    ];
    let mapItem = createBitmap({
      list,
    });
    console.log(mapItem[0]);
    mapItem[0].on(Hilo.event.POINTER_START, btnUpdata);
    stage.addChild(...mapItem);
  };

  const addHandSpirit = (stage) => {
    HandSpirite = new Hilo.Sprite({
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      x: 420 * timesWeight,
      y: 1250 * timesHeight,
    });
    const beanAnimate = HiloCreateSpirit(imgObj.hand.src, 27, 27, 152, 136, 'hand');
    HandSpirite.addFrame(beanAnimate.getSprite('hand'));
    stage.addChild(HandSpirite);
  };

  const btnUpdata = () => {
    dispatch({
      type: 'receiveGoods/save',
      payload: {
        type: 'game',
      },
    });
  };

  return (
    <>
      <div ref={containerRef} className="container"></div>
      <div className="container_rules">
        <Rules></Rules>
      </div>
      <div className="container_text">商品已打包完毕，准备配送</div>
      <div className="container_text1">送你100星豆，快去补给运输吧</div>
    </>
  );
}

export default index;
