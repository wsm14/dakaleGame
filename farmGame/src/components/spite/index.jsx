import { createTextureAtlas } from '@/components/createTextureAtlas';
export const HiloBeanInfo = (responent) => {
  const path = responent.beanBottle.src;
  const createList = () => {
    let list = [];
    for (let i = 0; i < 33; i++) {
      let x = parseInt(i % 31);
      let y = parseInt(i / 31);
      list.push([x * 160, y * 180, 160, 180]);
    }
    return list;
  };
  return createTextureAtlas({
    image: path,
    frames: createList(),
    sprites: {
      beanBottle: createList().map((val, index) => {
        return index;
      }),
    },
  });
};
export const HiloPlane = (responent) => {
  const path = responent.plane.src;
  const createList = () => {
    let list = [];
    for (let i = 0; i < 4; i++) {
      let x = parseInt(i % 5);
      let y = parseInt(i / 5);
      list.push([x * 692, y * 680, 692, 680]);
    }
    return list;
  };
  return createTextureAtlas({
    image: path,
    frames: createList(),
    sprites: {
      plane: createList().map((val, index) => {
        return index;
      }),
    },
  });
};
export const HiloBeanHand = (responent) => {
  const path = responent.beanHand.src;
  const createList = () => {
    let list = [];
    for (let i = 0; i < 88; i++) {
      let x = parseInt(i % 38);
      let y = parseInt(i / 38);
      list.push([x * 123, y * 146, 123, 146]);
    }
    return list;
  };
  return createTextureAtlas({
    image: path,
    frames: createList(),
    sprites: {
      beanHand: createList().map((val, index) => {
        return index;
      }),
    },
  });
};

export const HiloEatBean = (responent) => {
  const path = responent.get('eat').content;
  const createList = () => {
    let list = [];
    for (let i = 0; i < 91; i++) {
      let x = parseInt(i % 19);
      let y = parseInt(i / 19);
      list.push([x * 252, y * 370, 252, 370]);
    }
    return list;
  };
  return createTextureAtlas({
    image: path,
    frames: createList(),
    sprites: {
      eatBean: createList().map((val, index) => {
        return index;
      }),
    },
  });
};
export const HiloRightTree = (responent) => {
  const path = responent.get('rightTree').content;
  const createList = () => {
    let list = [];
    for (let i = 0; i < 75; i++) {
      let x = parseInt(i % 26);
      let y = parseInt(i / 26);
      list.push([x * 192, y * 203, 192, 203]);
    }
    return list;
  };
  return createTextureAtlas({
    image: path,
    frames: createList(),
    sprites: {
      rightTree: createList().map((val, index) => {
        return index;
      }),
    },
  });
};
