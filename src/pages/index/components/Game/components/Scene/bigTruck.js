import Hilo from 'hilojs';
import { setAnimate, createBitmap } from '@/utils/game';
import { HiloCreateSpirit, conversionSize, HiloCreateSpiritbac } from '@/utils/game';
import { weappHeight } from '@/utils/game';

export const bigTruckSence = (stage, imgObj, freeGoodInfo = {}) => {
  let background1 = null; //大卡车对象
  let background2 = null; //大卡车对象
  let bigTruckSpirite = null; //大卡车精灵图对象
  //添加大卡车背景图片
  const addImgStage = () => {
    const list = [
      {
        id: 'animationBac',
        type: 'Bitmap',
        image: imgObj.bigTruck.src,
        x: 0,
        y: 0,
        width: imgObj.bigTruck.width,
        height: window.innerHeight * 2,
        animate: {
          x: -imgObj.bigTruck.width,
        },
        from: {
          duration: 9000,
        },
      },
      {
        id: 'animationBac1',
        type: 'Bitmap',
        image: imgObj.bigTruck.src,
        x: imgObj.bigTruck.width,
        y: 0,
        width: window.innerWidth * 2,
        height: window.innerHeight * 2,
        rect: [0, 0, window.innerWidth * 2 + 10, imgObj.bigTruck.height],
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
  };

  const createBackgroundSprit = () => {
    background1 = new Hilo.Sprite({
      id: 'planeBac',
      currentFrame: 0,
      interval: 12,
      timeBased: true,
      width: window.innerWidth * 2,
      height: window.innerHeight * 2,
    });
    const beanAnimatebac = HiloCreateSpiritbac(
      imgObj.bigTruck1.src,
      1001,
      1000,
      imgObj.bigTruck1.width,
      imgObj.bigTruck1.height,
      'bigTruck1',
    );
    background1.addFrame(beanAnimatebac.getSprite('bigTruck1'));
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
      imgObj.bigTruck1.src,
      101,
      100,
      imgObj.bigTruck1.width,
      imgObj.bigTruck1.height,
      'bigTruck2',
    );
    background2.addFrame(beanAnimatebac.getSprite('bigTruck2'));
    stage.addChild(background2);
  };

  //大卡车运输
  const createBigTruck = () => {
    bigTruckSpirite = new Hilo.Sprite({
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      width: conversionSize(750),
      height: conversionSize(488),
      x: 0,
      y: conversionSize(conversionSize(_, 600) - weappHeight),
    });
    const beanAnimate = HiloCreateSpirit(imgObj.bigTruckSpirit.src, 28, 6, 750, 488, 'bigTuck');
    bigTruckSpirite.addFrame(beanAnimate.getSprite('bigTuck'));
    stage.addChild(bigTruckSpirite);
  };
  //添加商品图片
  const createPackage = () => {
    const list = [
      {
        id: 'packageImg',
        type: 'Bitmap',
        image: freeGoodInfo.packageImg,
        x: conversionSize(183),
        y: conversionSize(713 - weappHeight - (600 - conversionSize(_, 600))),
        width: conversionSize(120),
        height: conversionSize(120),
      },
      {
        id: 'text',
        type: 'Text',
        color: '#333',
        font: '24px arial',
        text: freeGoodInfo.packageName,
        textAlign: 'center',
        maxWidth: conversionSize(400),
        width: conversionSize(400),
        textAlign: 'center',
        x: conversionSize(35),
        y: conversionSize(870 - weappHeight - (600 - conversionSize(_, 600))),
      },
    ];
    const mapItem = createBitmap({
      list,
    });
    stage.addChild(...mapItem);
  };
  // addImgStage();
  createBackgroundSprit();
  createBackgroundSprit1();
  createBigTruck();
  createPackage();
  return [background1, background2, bigTruckSpirite];
};
