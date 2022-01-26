import Hilo, { DOMElement } from 'hilojs';
import { createTextureAtlas } from '@/components/createTextureAtlas';
import { deviceName } from '@/utils/birdgeContent';
import math from '@/utils/math';

const computedY = window.innerHeight * 2;

const timesHeight = math.divide(math.multiply(window.innerHeight, 2), 1624);

export const weappHeight = deviceName() == 'miniProgram' ? 100 : 0;
export const appHeight = deviceName() == 'dakaleIOS' || deviceName() == 'dakaleAndroid' ? 100 : 0;
//画图尺寸换算
export const conversionSize = (width, height) => {
  if (width && Number(width)) {
    return width * (window.innerWidth / 375);
  } else if (height && Number(height)) {
    return math.multiply(height, timesHeight);
  }
};

//添加元素
export const createBitmap = ({ list }) => {
  return list.map((item) => {
    const { type = 'Bitmap', visible } = item;
    const element = new Hilo[type]({
      ...item,
    });
    return !visible && element;
  });
};

//生成精灵图
export const HiloCreateSpirit = (path, length, num, width, height, id) => {
  // path:图片地址
  //length:所有的个数
  //num:精灵图一张的个数
  //width:宽度
  //height:高度
  //id:精灵图的id
  const createList = () => {
    let list = [];
    for (let i = 0; i < length; i++) {
      let x = parseInt(i % num);
      let y = parseInt(i / num);
      list.push([x * width, y * height, width, height]);
    }
    return list;
  };
  return createTextureAtlas({
    image: path,
    frames: createList(),
    sprites: {
      [id]: createList().map((val, index) => {
        return index;
      }),
    },
  });
};

//生成精灵图
export const HiloCreateSpiritbac = (path, length, num, width, height, id) => {
  // path:图片地址
  //length:所有的个数
  //num:精灵图一张的个数
  //width:宽度
  //height:高度
  //id:精灵图的id
  const createList = () => {
    let list = [];
    for (let i = 0; i < length; i++) {
      list.push([i * ((width - 750) / num), 0, 750, height]);
    }
    return list;
  };
  return createTextureAtlas({
    image: path,
    frames: createList(),
    sprites: {
      [id]: createList().map((val, index) => {
        return index;
      }),
    },
  });
};

//生成随机的星星
export const createStar = (stage, imgObj, bigStar, fn) => {
  const list = [];
  for (let i = 0; i < 5; i++) {
    let starObj = {
      id: `star${i}`,
      type: 'Bitmap',
      image: imgObj.star.src,
      x:
        stage.getChildById('beanBottle').x +
        stage.getChildById('beanBottle').width / 2 +
        (i % 2 == 0 ? -10 : 10),
      y: stage.getChildById('beanBottle').y + stage.getChildById('beanBottle').height / 2,
      width: 38,
      height: 37,
      animate: {
        x: stage.getChildById('bigStar').x + stage.getChildById('bigStar').width / 2,
        y: stage.getChildById('bigStar').y,
      },
      from: {
        duration: 500,
        delay: 0 + i * 100,
        loop: false,
        onComplete: (e) => {
          e.target.removeFromParent(stage);
          if (i === 4) {
            Hilo.Tween.remove(bigStar);
            Hilo.Tween.to(
              bigStar,
              {
                x: conversionSize(320),
                y: computedY - conversionSize(230 - appHeight),
                scaleX: 0.8,
                scaleY: 0.8,
              },
              {
                duration: 100,
                ease: Hilo.Ease.Linear.EaseNone,
                repeat: 2,
                loop: true,
                reverse: true,
                onComplete: () => {
                  fn();
                },
              },
            );
          }
        },
      },
    };
    list.push(starObj);
  }
  const mapItem = createBitmap({
    list,
  });
  stage.addChild(...mapItem);
  setAnimate(mapItem, list);
};

//下方随机的星星
export const createBottomStar = (stage, imgObj, fn, fn1) => {
  const list = [];
  for (let i = 0; i < 5; i++) {
    let starObj = {
      id: `star`,
      type: 'Bitmap',
      image: imgObj.star.src,
      x:
        stage.getChildById('bigStar').x +
        stage.getChildById('bigStar').width / 2 +
        (i % 2 == 0 ? -10 : 10),
      y: stage.getChildById('bigStar').y,
      width: 70,
      height: 69,
      alpha: 1,
      animate: {
        x: stage.getChildById('packageImg').x + stage.getChildById('packageImg').width / 2,
        y: stage.getChildById('packageImg').y + stage.getChildById('packageImg').height / 2,
        alpha: 0,
      },
      from: {
        duration: 500,
        delay: 0 + i * 100,
        loop: false,
        onComplete: (e) => {
          stage.removeChild(stage.getChildById('star'));
          e.target.removeFromParent(stage);
          if (i === 4) {
            fn && fn();
            fn1 && fn1();
          }
        },
      },
    };
    list.push(starObj);
  }
  const mapItem = createBitmap({
    list,
  });
  stage.addChild(...mapItem);
  setAnimate(mapItem, list);
};

//设置动画
export const setAnimate = (mapItem, list) => {
  return mapItem.map((item, index) => {
    const { animate, from = {}, animateType = 'to' } = list[index];
    const { onComplete } = from;
    return (
      animate &&
      Hilo.Tween[animateType](
        item,
        {
          ...animate,
        },
        {
          loop: true,
          ease: Hilo.Ease.Linear.EaseNone,
          ...from,
        },
      )
    );
  });
};

//设置飞机和豆长精灵图的加速动画
export const setPlaneAnimation = (target, times, mark1, mark2) => {
  const tween = Hilo.Tween.fromTo(
    target,
    { ...mark1 },
    { ...mark2 },
    {
      duration: times,
      loop: true,
      ease: Hilo.Ease.Linear.EaseNone,
      reverse: true,
    },
  );
  return tween;
};

//邀请人的数组
export const filterList = (oldList, count = 2) => {
  let list = [];
  for (let i = 0; i < count; i++) {
    if (oldList[i]) {
      list.push(oldList[i]);
    } else list.push({});
  }
  return list;
};
