import React, { useRef, useEffect, useState } from 'react';
import './index.less';
import Hilo from 'hilojs';
import { useDispatch, useSelector } from 'umi';
import { planeSence } from '../Game/components/Scene/plane';
import { HiloCreateSpirit } from '@/utils/game';
import { createBitmap, conversionSize } from '@/utils/game';
import { fetchFreeGoodBeginGame } from '@/services/game';
import Rules from '@/components/Rules';
let HandSpirite = null;
let ticker = null;
function index(props) {
  const { imgObj, getHomeDetail } = props;
  const [stage, setStage] = useState(''); //舞台
  const containerRef = useRef();
  const dispatch = useDispatch();
  const { packageObj, addressObj } = useSelector((state) => state.receiveGoods); //商品信息

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
    setStage(stage);
    stage.enableDOMEvent(Hilo.event.POINTER_START, true);
    tickerStage(stage);

    //画出动画
    planeSence(stage, imgObj, packageObj);

    //画按钮
    addButtonStage(stage);

    // //画手
    addHandSpirit(stage);
  };

  //监听舞台
  const tickerStage = (stage) => {
    ticker = new Hilo.Ticker(60);
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
        width: conversionSize(480),
        height: conversionSize(90),
        x: conversionSize(135),
        y: conversionSize(_, 1250),
      },
    ];
    let mapItem = createBitmap({
      list,
    });
    mapItem[0].on(Hilo.event.POINTER_START, () => {
      begainGame(stage);
    });
    stage.addChild(...mapItem);
  };

  //手的精灵图动画
  const addHandSpirit = (stage) => {
    HandSpirite = new Hilo.Sprite({
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      width: conversionSize(152),
      height: conversionSize(136),
      x: conversionSize(420),
      y: conversionSize(_, 1250),
    });
    const beanAnimate = HiloCreateSpirit(imgObj.hand.src, 27, 27, 152, 136, 'hand');
    HandSpirite.addFrame(beanAnimate.getSprite('hand'));
    stage.addChild(HandSpirite);
  };

  //开始游戏
  const begainGame = async (stage) => {
    const res = await fetchFreeGoodBeginGame({
      packageId: packageObj.packageId,
      addressId: addressObj.userAddressId,
    });
    getHomeDetail();
    stage.removeAllChildren();
    ticker.removeTick(stage);
    ticker.removeTick(Hilo.Tween);
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
