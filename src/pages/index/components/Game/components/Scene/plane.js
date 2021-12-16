import Hilo from 'hilojs';
import { setAnimate, createBitmap, setPlaneAnimation } from '@/utils/game';
import { HiloCreateSpirit, conversionSize } from '@/utils/game';
import { gameHeight } from '@/utils/utils';

export const planeSence = (stage, imgObj, freeGoodInfo = {}) => {
  //stage -- canvas     imgobj -- 图片集合    packageImg --产品信息

  let background1 = null; //飞机对象
  let background2 = null; //飞机切图对象
  let background3 = null; //商品切图对象
  let planeSprite = null; //飞机精灵图对象
  let beanHandSprite = null; //豆子挥手精灵图对象
  //添加飞机背景图片
  const addImgStage = () => {
    const list = [
      {
        id: 'planeBg1',
        type: 'Bitmap',
        image: imgObj.planeBg.src,
        x: 0,
        y: 0,
        width: imgObj.planeBg.width,
        height: window.innerHeight * 2,
        animate: {
          x: -imgObj.planeBg.width,
        },
        from: {
          duration: 10000,
        },
      },
      {
        id: 'planeBg2',
        type: 'Bitmap',
        image: imgObj.planeBg.src,
        x: imgObj.planeBg.width,
        y: 0,
        width: window.innerWidth * 2,
        height: window.innerHeight * 2,
        rect: [0, 0, window.innerWidth * 2, imgObj.planeBg.height],
        animate: {
          x: 0,
        },
        from: {
          duration: 10000,
        },
      },
    ];
    const mapItem = createBitmap({
      list,
    });
    stage.addChild(...mapItem);
    const tweenList = setAnimate(mapItem, list);
    background1 = tweenList[0];
    background2 = tweenList[1];
  };

  //飞机运输
  const createPlane = () => {
    planeSprite = new Hilo.Sprite({
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      width: conversionSize(692),
      height: conversionSize(680),
      x: conversionSize(40),
      y: conversionSize(280 + gameHeight),
    });
    let beanAnimate = HiloCreateSpirit(imgObj.plane.src, 4, 5, 692, 680, 'plane');
    planeSprite.addFrame(beanAnimate.getSprite('plane'));
    stage.addChild(planeSprite);
    background3 = setPlaneAnimation(
      planeSprite,
      1500,
      { y: conversionSize(280 + gameHeight) },
      { y: conversionSize(290 + gameHeight) },
    );
  };

  //豆子挥手
  const createBeanHand = () => {
    beanHandSprite = new Hilo.Sprite({
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      width: conversionSize(123),
      height: conversionSize(146),
      x: conversionSize(450),
      y: conversionSize(440 - gameHeight),
    });
    let beanAnimate = HiloCreateSpirit(imgObj.beanHand.src, 88, 38, 123, 146, 'beanHand');
    beanHandSprite.addFrame(beanAnimate.getSprite('beanHand'));
    setPlaneAnimation(
      beanHandSprite,
      1500,
      { y: conversionSize(440 + gameHeight) },
      { y: conversionSize(450 + gameHeight) },
    );
    stage.addChild(beanHandSprite);
  };

  //添加商品图片
  const createPackage = () => {
    const list = [
      {
        id: 'packageImg',
        type: 'Bitmap',
        image: freeGoodInfo.packageImg,
        x: conversionSize(325),
        y: conversionSize(792 + gameHeight),
        width: conversionSize(120),
        height: conversionSize(120),
      },
    ];
    const mapItem = createBitmap({
      list,
    });
    stage.addChild(...mapItem);
    // setPlaneAnimation(mapItem[0], 1500, { y: conversionSize(790) }, { y: conversionSize(810) });
  };

  addImgStage();
  createBeanHand();
  createPlane();
  createPackage();
  return [background1, background2, planeSprite, background3];
};
