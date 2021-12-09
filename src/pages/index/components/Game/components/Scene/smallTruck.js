import Hilo from 'hilojs';
import { setAnimate, createBitmap } from '@/utils/game';
import { HiloCreateSpirit } from '@/utils/game';

const timesWeight = ((window.innerWidth * 2) / 750).toFixed(2);
const timesHeight = ((window.innerHeight * 2) / 1624).toFixed(2);

export const smallTruckSence = (stage, imgObj) => {
  let background1 = null; //大卡车对象
  let background2 = null; //大卡车切图对象
  let smallTruckSpirite = null; //大卡车精灵图对象
  //添加大卡车背景图片
  const addImgStage = () => {
    const list = [
      {
        id: 'smallTruck1',
        type: 'Bitmap',
        image: imgObj.smallTruck.src,
        x: 0,
        y: 0,
        width: imgObj.smallTruck.width,
        height: windowHiehgt * 2,
        animate: {
          x: -imgObj.smallTruck.width,
        },
        from: {
          duration: 6000,
        },
      },
      {
        id: 'smallTruck2',
        type: 'Bitmap',
        image: imgObj.smallTruck.src,
        x: imgObj.smallTruck.width,
        y: 0,
        width: windowWith * 2,
        height: windowHiehgt * 2,
        rect: [0, 0, windowWith * 2, imgObj.smallTruck.height],
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
    smallTruckSpirite = new Hilo.Sprite({
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      x: 0,
      y: 600 * timesHeight,
    });
    let beanAnimate = HiloCreateSpirit(imgObj.smallTruckSpirit.src, 28, 6, 750, 488, 'bigTuck');
    smallTruckSpirite.addFrame(beanAnimate.getSprite('bigTuck'));
    stage.addChild(smallTruckSpirite);
  };
  addImgStage();
  createBigTruck();
  return { background1, background2, smallTruckSpirite };
};
