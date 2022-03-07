import React, { useRef, useState } from 'react';
import { HiloCreateSpirit, conversionSize } from '@/utils/game';

let SpriteObj = { SpriteLoading: null, SpriteStart: null, SpriteEnd: null };

//第二阶段树干
export const TrunkScene = (stage, imgObj, type = 'smallTree') => {
  //根据等级显示
  const scene = {
    sapling: {
      width: 340,
      height: 280,
      x: 210,
      y: 587,
      load: {
        id: 'sapling1',
        img: imgObj.get('sapling1').content,
        num: 75,
        lineNum: 14,
      },
      start: {
        id: 'sapling2',
        img: imgObj.get('sapling2').content,
        num: 71,
        lineNum: 14,
      },
      end: {
        id: 'sapling3',
        img: imgObj.get('sapling3').content,
        num: 32,
        lineNum: 14,
      },
    },
    truck: {
      width: 340,
      height: 380,
      x: 210,
      y: 485,
      load: {
        id: 'trunk1',
        img: imgObj.get('trunk1').content,
        num: 26,
        lineNum: 14,
      },
      start: {
        id: 'trunk2',
        img: imgObj.get('trunk2').content,
        num: 53,
        lineNum: 14,
      },
      end: {
        id: 'trunk3',
        img: imgObj.get('trunk3').content,
        num: 22,
        lineNum: 14,
      },
    },
    smallTree: {
      width: 380,
      height: 450,
      x: 200,
      y: 420,
      load: {
        id: 'smallTree1',
        img: imgObj.get('smallTree1').content,
        num: 35,
        lineNum: 13,
      },
      start: {
        id: 'smallTree2',
        img: imgObj.get('smallTree2').content,
        num: 98,
        lineNum: 13,
      },
      end: {
        id: 'smallTree3',
        img: imgObj.get('smallTree3').content,
        num: 32,
        lineNum: 13,
      },
    },
    bigTree: {
      width: 450,
      height: 520,
      x: 160,
      y: 360,
      load: {
        id: 'bigTree1',
        img: imgObj.get('bigTree1').content,
        num: 35,
        lineNum: 11,
      },
      start: {
        id: 'bigTree2',
        img: imgObj.get('bigTree2').content,
        num: 71,
        lineNum: 11,
      },
      end: {
        id: 'bigTree3',
        img: imgObj.get('bigTree3').content,
        num: 31,
        lineNum: 11,
      },
    },
  }[type];

  let { SpriteLoading, SpriteStart, SpriteEnd } = SpriteObj;
  Object.keys(SpriteObj).forEach((item) => {
    console.log(SpriteObj[item], 'SpriteObj[item]');
    SpriteObj[item] && SpriteObj[item].removeFromParent(stage);
  });
  //开始
  const creatTrunkPrepare = () => {
    if (SpriteLoading) {
      SpriteLoading.removeFromParent(stage);
    }
    SpriteLoading = new Hilo.Sprite({
      id: scene.load.id,
      currentFrame: 0,
      loop: false,
      interval: 24,
      timeBased: true,
      width: conversionSize(scene.width),
      height: conversionSize(scene.height),
      x: conversionSize(scene.x),
      y: conversionSize(scene.y),
    });
    let trunkAnimate = HiloCreateSpirit(
      scene.load.img,
      scene.load.num,
      scene.load.lineNum,
      scene.width,
      scene.height,
      scene.load.id,
    );
    SpriteLoading.addFrame(trunkAnimate.getSprite(scene.load.id));
    SpriteLoading.setFrameCallback(SpriteLoading.getNumFrames() - 1, () => {
      SpriteStart.visible = true;
      SpriteStart.play();
      SpriteLoading.visible = false;
      SpriteLoading.removeFromParent(stage);
    });
    stage.addChild(SpriteLoading);
  };

  //循环
  const creatTrunkStart = () => {
    if (SpriteStart) {
      SpriteStart.removeFromParent(stage);
    }
    SpriteStart = new Hilo.Sprite({
      id: scene.start.id,
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      visible: false,
      width: conversionSize(scene.width),
      height: conversionSize(scene.height),
      x: conversionSize(scene.x),
      y: conversionSize(scene.y),
    });
    let trunkAnimate2 = HiloCreateSpirit(
      scene.start.img,
      scene.start.num,
      scene.start.lineNum,
      scene.width,
      scene.height,
      scene.start.id,
    );
    SpriteStart.addFrame(trunkAnimate2.getSprite(scene.start.id));
    SpriteStart.stop();
    stage.addChild(SpriteStart);
  };

  const creatTrunkEnd = () => {
    if (SpriteEnd) {
      SpriteEnd.removeFromParent(stage);
    }
    SpriteEnd = new Hilo.Sprite({
      id: scene.end.id,
      currentFrame: 0,
      interval: 24,
      loop: false,
      timeBased: true,
      visible: false,
      width: conversionSize(scene.width),
      height: conversionSize(scene.height),
      x: conversionSize(scene.x),
      y: conversionSize(scene.y),
    });
    let trunkAnimate3 = HiloCreateSpirit(
      scene.end.img,
      scene.end.num,
      scene.end.lineNum,
      scene.width,
      scene.height,
      scene.end.id,
    );
    SpriteEnd.addFrame(trunkAnimate3.getSprite(scene.end.id));
    SpriteEnd.stop();
    stage.addChild(SpriteEnd);
  };

  const endClick = () => {
    SpriteStart.goto(0, true);
    SpriteStart.visible = false;
    SpriteEnd.goto(0);
    SpriteEnd.play();
    SpriteEnd.visible = true;
    SpriteEnd.setFrameCallback(SpriteEnd.getNumFrames() - 1, () => {
      SpriteStart.visible = true;
      SpriteStart.play();
      setTimeout(() => {
        SpriteEnd.stop();
        SpriteEnd.visible = false;
      });
    });
  };
  creatTrunkPrepare();
  creatTrunkStart();
  creatTrunkEnd();
  console.log(SpriteStart);
  SpriteObj = { SpriteLoading, SpriteStart, SpriteEnd };
  return { ...SpriteObj, endClick };
};
