import { createTextureAtlas } from '@/components/createTextureAtlas';
const setList = (data) => {
  const { current, scale, width, height } = data;
  let list = [];
  for (let i = 0; i <= current; i++) {
    let x = parseInt(i % scale);
    let y = parseInt(i / scale);
    list.push([x * width, y * height, width, height]);
  }
  return list;
};
export const HiloBeanInfo = (responent) => {
  const path = responent.get('beanInfo').content;
  return createTextureAtlas({
    image: path,
    frames: setList({
      current: 86,
      scale: 16,
      width: 300,
      height: 400,
    }),
    sprites: {
      beanInfo: setList({
        current: 86,
        scale: 16,
        width: 300,
        height: 400,
      }).map((val, index) => {
        return index;
      }),
    },
  });
};
export const HiloTree = (responent) => {
  const path = responent.get('left_tree').content;
  const createList = () => {
    let list = [];
    for (let i = 0; i < 27; i++) {
      let x = parseInt(i % 27);
      let y = parseInt(i / 27);
      if (i === 0) {
        list.push([x * 157, y * 232, 157, 232]);
        list.push([x * 157, y * 232, 157, 232]);
        list.push([x * 157, y * 232, 157, 232]);
        list.push([x * 157, y * 232, 157, 232]);
        list.push([x * 157, y * 232, 157, 232]);
        list.push([x * 157, y * 232, 157, 232]);
        list.push([x * 157, y * 232, 157, 232]);
        list.push([x * 157, y * 232, 157, 232]);
        list.push([x * 157, y * 232, 157, 232]);
        list.push([x * 157, y * 232, 157, 232]);
        list.push([x * 157, y * 232, 157, 232]);
        list.push([x * 157, y * 232, 157, 232]);
        list.push([x * 157, y * 232, 157, 232]);
        list.push([x * 157, y * 232, 157, 232]);
        list.push([x * 157, y * 232, 157, 232]);
      } else {
        list.push([x * 157, y * 232, 157, 232]);
      }
    }
    return list;
  };
  return createTextureAtlas({
    image: path,
    frames: createList(),
    sprites: {
      left_tree: createList().map((val, index) => {
        return index;
      }),
    },
  });
};
export const HiloSnowTree = (responent) => {
  const path = responent.get('snow_tree').content;
  const createList = () => {
    let list = [];
    for (let i = 0; i < 64; i++) {
      let x = parseInt(i % 21);
      let y = parseInt(i / 21);
      list.push([x * 232, y * 252, 232, 252]);
    }
    return list;
  };
  return createTextureAtlas({
    image: path,
    frames: createList(),
    sprites: {
      snow_tree: createList().map((val, index) => {
        return index;
      }),
    },
  });
};
export const HiloFlow = (responent) => {
  const path = responent.get('flow').content;
  const createList = () => {
    let list = [];
    for (let i = 0; i < 39; i++) {
      let x = parseInt(i % 32);
      let y = parseInt(i / 32);
      list.push([x * 156, y * 90, 156, 90]);
    }
    return list;
  };
  return createTextureAtlas({
    image: path,
    frames: createList(),
    sprites: {
      flow: createList().map((val, index) => {
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
      let x = parseInt(i % 21);
      let y = parseInt(i / 21);
      list.push([x * 230, y * 354, 230, 354]);
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
export const HiloAperture = (responent) => {
  const path = responent.get('aperture').content;
  const createList = () => {
    let list = [];
    for (let i = 0; i < 42; i++) {
      let x = parseInt(i % 21);
      let y = parseInt(i / 21);
      list.push([x * 148, y * 144, 148, 144]);
    }
    return list;
  };
  return createTextureAtlas({
    image: path,
    frames: createList(),
    sprites: {
      aperture: createList().map((val, index) => {
        return index;
      }),
    },
  });
};
export const HiloLevel = (responent) => {
  const path = responent.get('level').content;
  const createList = () => {
    let list = [];
    for (let i = 0; i < 11; i++) {
      let x = parseInt(i % 11);
      let y = parseInt(i / 11);
      list.push([x * 86, y * 76, 86, 76]);
    }
    return list;
  };
  return createTextureAtlas({
    image: path,
    frames: createList(),
    sprites: {
      level: createList().map((val, index) => {
        return index;
      }),
    },
  });
};
export const HiloKeys = (responent) => {
  const path = responent.get('key').content;
  return createTextureAtlas({
    image: path,
    frames: setList({
      current: 33,
      scale: 33,
      width: 123,
      height: 127,
    }),
    sprites: {
      key: setList({
        current: 33,
        scale: 33,
        width: 123,
        height: 127,
      }).map((val, index) => {
        return index;
      }),
    },
  });
};
