import Hilo, { DOMElement } from 'hilojs';
import { deviceName } from '@/utils/birdgeContent';
import math from '@/utils/math';

const computedY = window.innerHeight * 2;

const timesHeight = math.divide(math.multiply(window.innerHeight, 2), 1624);

export const weappHeight = deviceName() == 'miniProgram' ? 100 : 0;

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

//精灵数组
export const createTextureAtlas = (data) => {
  return new Hilo.TextureAtlas({
    ...data,
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

//邀请人的数组
export const filterList = (oldList, count = 3) => {
  let list = [];
  for (let i = 0; i < count; i++) {
    if (oldList[i]) {
      list.push(oldList[i]);
    } else list.push({});
  }
  return list;
};

//判断等级
export const getLevel = (val, status) => {
  let level;
  if (status === '1') {
    if (val >= 0 && val < 5) {
      level = 'sapling';
    } else if (val >= 5 && val < 10) {
      level = 'truck';
    } else if (val >= 10) {
      level = 'smallTree';
    }
  } else if (status === '0') {
    level = 'bigTree';
  }

  return level;
};
