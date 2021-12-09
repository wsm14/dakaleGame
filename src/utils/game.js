import Hilo, { DOMElement } from 'hilojs';
import { createTextureAtlas } from '@/components/createTextureAtlas';

const timesHeight = ((window.innerHeight * 2) / 1624).toFixed(2);

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

//生成随机的星星
export const createStar = (stage, imgObj, bigStar) => {
  const list = [];
  for (let i = 0; i < 5; i++) {
    let starObj = {
      id: `star${i}`,
      type: 'Bitmap',
      image: imgObj.star.src,
      x: 620 + (i % 2 == 0 ? -20 : 20),
      y: 170,
      width: 38,
      height: 37,
      animate: {
        x: 350,
        y: 1150,
      },
      from: {
        duration: 1000,
        delay: 0 + i * 100,
        loop: false,
        onComplete: (e) => {
          e.target.removeFromParent(stage);
          i === 4 &&
            Hilo.Tween.fromTo(
              bigStar,
              {
                x: 305,
                y: 1381 * timesHeight,
                scaleX: 1,
                scaleY: 1,
              },
              {
                x: 320,
                y: 1400 * timesHeight,
                scaleX: 0.8,
                scaleY: 0.8,
              },
              {
                duration: 100,
                ease: Hilo.Ease.Linear.EaseNone,
                repeat: 2,
                loop: true,
                reverse: true,
              },
            );
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
export const createBottomStar = (stage, imgObj, fn) => {
  const list = [];
  for (let i = 0; i < 5; i++) {
    let starObj = {
      id: `star${i}`,
      type: 'Bitmap',
      image: imgObj.star.src,
      x: 340 + (i % 2 == 0 ? -10 : 10),
      y: 1400 * timesHeight,
      width: 38,
      height: 37,
      animate: {
        x: 400,
        y: 800 * timesHeight,
        alpha: 0,
      },
      from: {
        duration: 1000,
        delay: 0 + i * 100,
        loop: false,
        onComplete: (e) => {
          e.target.removeFromParent(stage);
          fn && i === 4 && fn();
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
  Hilo.Tween.fromTo(
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
};

//设置飞机背景图加速动画
export const setPlanePuls = (target, times) => {
  console.log(target, 'target');
  console.log(
    new Hilo.Tween(target, { x: 0, y: 0 }, { x: -3000 }, { duration: 6000 }).link(
      Hilo.Tween.to(
        target,
        { x: -3000 },
        {
          duration: times,
          loop: true,
          ease: Hilo.Ease.Linear.EaseNone,
        },
      ),
    ),
  );
};
