import Hilo from 'hilojs';
import { setAnimate, createBitmap, setPlaneAnimation } from '@/utils/game';
import { HiloCreateSpirit } from '@/utils/game';

const windowWith = window.innerWidth;
const windowHiehgt = window.innerHeight;
const timesHeight = ((windowHiehgt * 2) / 1624).toFixed(2);

export const planeSence = (stage, imgObj) => {
  let background1 = null; //飞机对象
  let background2 = null; //飞机切图对象
  let planeSprite = null; //飞机精灵图对象
  let beanHandSprite = null; //豆子挥手精灵图对象
  //添加飞机背景图片
  const addImgStage = () => {
    const list = [
      {
        id: 'planeBg',
        type: 'Bitmap',
        image: imgObj.planeBg.src,
        x: 0,
        y: 0,
        width: 3000,
        height: windowHiehgt * 2,
        animate: {
          x: -3000,
        },
        from: {
          duration: 6000,
        },
      },
      {
        id: 'planeBg1',
        type: 'Bitmap',
        image: imgObj.planeBg.src,
        x: 3000,
        y: 0,
        width: windowWith * 2,
        height: windowHiehgt * 2,
        rect: [0, 0, windowWith * 2, 1624],
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

  //飞机运输
  const createPlane = () => {
    planeSprite = new Hilo.Sprite({
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      x: 40,
      y: 350 * timesHeight,
    });
    let beanAnimate = HiloCreateSpirit(imgObj.plane.src, 4, 5, 692, 680, 'plane');
    planeSprite.addFrame(beanAnimate.getSprite('plane'));
    setPlaneAnimation(planeSprite, 1500, { y: 320 * timesHeight }, { y: 350 * timesHeight });
    stage.addChild(planeSprite);
  };

  //豆子挥手
  const createBeanHand = () => {
    beanHandSprite = new Hilo.Sprite({
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      y: 500 * timesHeight,
      x: 450,
    });
    let beanAnimate = HiloCreateSpirit(imgObj.beanHand.src, 88, 38, 123, 146, 'beanHand');
    beanHandSprite.addFrame(beanAnimate.getSprite('beanHand'));
    setPlaneAnimation(beanHandSprite, 1500, { y: 500 * timesHeight }, { y: 530 * timesHeight });
    stage.addChild(beanHandSprite);
  };
  addImgStage();
  createBeanHand();
  createPlane();
  return { background1, background2, planeSprite, beanHandSprite };
};
