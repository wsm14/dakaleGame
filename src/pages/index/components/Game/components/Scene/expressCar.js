import Hilo from 'hilojs';
import { setAnimate, createBitmap } from '@/utils/game';
import { HiloCreateSpirit, conversionSize } from '@/utils/game';
import { gameHeight } from '@/utils/utils';

export const expressCarSence = (stage, imgObj, freeGoodInfo) => {
  let background1 = null; //大卡车对象
  let background2 = null; //大卡车切图对象
  let expressCarSpirite = null; //大卡车精灵图对象
  //添加大卡车背景图片
  const addImgStage = () => {
    const list = [
      {
        id: 'expressCar1',
        type: 'Bitmap',
        image: imgObj.expressCar.src,
        x: 0,
        y: 0,
        width: imgObj.expressCar.width,
        height: window.innerHeight * 2,
        animate: {
          x: -imgObj.expressCar.width,
        },
        from: {
          duration: 10000,
        },
      },
      {
        id: 'expressCar2',
        type: 'Bitmap',
        image: imgObj.expressCar.src,
        x: imgObj.expressCar.width,
        y: 0,
        width: window.innerWidth * 2,
        height: window.innerHeight * 2,
        rect: [0, 0, window.innerWidth * 2, imgObj.expressCar.height],
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

  //大卡车运输
  const createBigTruck = () => {
    expressCarSpirite = new Hilo.Sprite({
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      width: conversionSize(750),
      height: conversionSize(488),
      x: 0,
      y: conversionSize(550 + gameHeight),
    });
    let beanAnimate = HiloCreateSpirit(imgObj.expressCarSpirit.src, 28, 6, 750, 488, 'bigTuck');
    expressCarSpirite.addFrame(beanAnimate.getSprite('bigTuck'));
    stage.addChild(expressCarSpirite);
  };

  //添加商品图片
  const createPackage = () => {
    const list = [
      {
        id: 'packageImg',
        type: 'Bitmap',
        image: freeGoodInfo.packageImg,
        x: conversionSize(178),
        y: conversionSize(677 + gameHeight),
        width: conversionSize(120),
        height: conversionSize(120),
      },
    ];
    const mapItem = createBitmap({
      list,
    });
    stage.addChild(...mapItem);
  };
  addImgStage();
  createBigTruck();
  createPackage();
  return [background1, background2, expressCarSpirite];
};
