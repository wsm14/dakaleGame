import Hilo from 'hilojs';
import { setAnimate, createBitmap, setPlaneAnimation } from '@/utils/game';
import { HiloCreateSpirit, conversionSize, HiloCreateSpiritbac } from '@/utils/game';
import { weappHeight } from '@/utils/game';

export const planeSence = (stage, imgObj, freeGoodInfo = {}) => {
  //stage -- canvas     imgobj -- 图片集合    packageImg --产品信息
  let background1 = null; //飞机对象
  let background2 = null; //飞机对象
  let planeSprite = null; //飞机精灵图对象
  let beanHandSprite = null; //豆子挥手精灵图对象
  //添加飞机背景图片
  const addImgStage = () => {
    const list = [
      {
        id: 'animationBac',
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
          duration: 9000,
        },
      },
      {
        id: 'animationBac1',
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
          duration: 9000,
        },
      },
    ];
    const mapItem = createBitmap({
      list,
    });
    stage.addChild(...mapItem);
    const tweenList = setAnimate(mapItem, list);
    background1 = tweenList[0];
  };

  const createBackgroundSprit = (index = 0, scale) => {
    background1 = new Hilo.Sprite({
      id: 'planeBac',
      currentFrame: 0,
      interval: 12,
      timeBased: true,
      width: window.innerWidth * 2,
      height: window.innerHeight * 2,
    });
    const beanAnimatebac = HiloCreateSpiritbac(
      imgObj.back11.src,
      1001,
      1000,
      imgObj.back11.width,
      imgObj.back11.height,
      'planeBac111',
    );
    background1.addFrame(beanAnimatebac.getSprite('planeBac111'));
    stage.addChild(background1);
  };

  const createBackgroundSprit1 = () => {
    background2 = new Hilo.Sprite({
      id: 'planeBac1',
      currentFrame: 0,
      interval: 1,
      timeBased: true,
      width: window.innerWidth * 2,
      height: window.innerHeight * 2,
      visible: false,
    });
    const beanAnimatebac = HiloCreateSpiritbac(
      imgObj.back11.src,
      101,
      100,
      imgObj.back11.width,
      imgObj.back11.height,
      'planeBac222',
    );
    background2.addFrame(beanAnimatebac.getSprite('planeBac222'));
    stage.addChild(background2);
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
      y: conversionSize(conversionSize(_, 330) - weappHeight),
    });
    let beanAnimate = HiloCreateSpirit(imgObj.plane.src, 4, 5, 692, 680, 'plane');
    planeSprite.addFrame(beanAnimate.getSprite('plane'));
    stage.addChild(planeSprite);
    setPlaneAnimation(
      planeSprite,
      1500,
      { y: conversionSize(conversionSize(_, 330) - weappHeight) },
      { y: conversionSize(conversionSize(_, 340) - weappHeight) },
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
      y: conversionSize(490 - weappHeight - (330 - conversionSize(_, 330))),
    });
    let beanAnimate = HiloCreateSpirit(imgObj.beanHand.src, 88, 38, 123, 146, 'beanHand');
    beanHandSprite.addFrame(beanAnimate.getSprite('beanHand'));
    setPlaneAnimation(
      beanHandSprite,
      1500,
      { y: conversionSize(490 - weappHeight - (330 - conversionSize(_, 330))) },
      { y: conversionSize(490 - weappHeight - (330 - conversionSize(_, 330))) },
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
        x: conversionSize(323),
        y: conversionSize(842 - weappHeight - (330 - conversionSize(_, 330))),
        width: conversionSize(120),
        height: conversionSize(120),
      },
      {
        id: 'text',
        type: 'Text',
        color: '#333',
        font: '24px arial',
        text: freeGoodInfo.packageName,
        maxWidth: conversionSize(400),
        width: conversionSize(400),
        textAlign: 'center',
        x: conversionSize(180),
        y: conversionSize(790 - weappHeight - (330 - conversionSize(_, 330))),
      },
    ];
    const mapItem = createBitmap({
      list,
    });
    stage.addChild(...mapItem);
    // setPlaneAnimation(mapItem[0], 1500, { y: conversionSize(790) }, { y: conversionSize(810) });
  };

  // addImgStage();
  createBackgroundSprit();
  createBackgroundSprit1();
  createBeanHand();
  createPlane();
  createPackage();
  return [background1, background2, planeSprite];
};
