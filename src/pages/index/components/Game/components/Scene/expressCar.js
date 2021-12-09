import Hilo from 'hilojs';
import { setAnimate, createBitmap } from '@/utils/game';
import { HiloCreateSpirit } from '@/utils/game';

const windowWith = window.innerWidth;
const windowHiehgt = window.innerHeight;
const timesHeight = ((windowHiehgt * 2) / 1624).toFixed(2);

export const expressCarSence = (stage, imgObj) => {
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
        height: windowHiehgt * 2,
        animate: {
          x: -imgObj.expressCar.width,
        },
        from: {
          duration: 6000,
        },
      },
      {
        id: 'expressCar2',
        type: 'Bitmap',
        image: imgObj.expressCar.src,
        x: imgObj.expressCar.width,
        y: 0,
        width: windowWith * 2,
        height: windowHiehgt * 2,
        rect: [0, 0, windowWith * 2, imgObj.expressCar.height],
        animate: {
          x: 0,
        },
        from: {
          duration: 6000,
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
      x: 0,
      y: 600 * timesHeight,
    });
    let beanAnimate = HiloCreateSpirit(imgObj.expressCarSpirit.src, 28, 6, 750, 488, 'bigTuck');
    expressCarSpirite.addFrame(beanAnimate.getSprite('bigTuck'));
    stage.addChild(expressCarSpirite);
  };
  addImgStage();
  createBigTruck();
  return { background1, background1, expressCarSpirite };
};
