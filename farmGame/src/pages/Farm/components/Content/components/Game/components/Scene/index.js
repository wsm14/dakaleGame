import React, { useRef, useState } from 'react';
import { HiloCreateSpirit, conversionSize } from '@/utils/game';

let SpriteObj = { SpriteLoading: null, SpriteStart: null, SpriteEnd: null };

export const SaplingScene = ({ stage, imgObj }) => {
  return <div>index</div>;
};

//第二阶段树干
export const TrunkScene = (stage, imgObj, type = 'bigTree') => {
  //根据等级显示
  const scene = {
    sapling: {
      width: '340',
      height: '280',
      x: 210,
      y: 587,
      load: {
        id: 'sapling1',
        img: imgObj.sapling1.src,
        num: 75,
        lineNum: 14,
      },
      start: {
        id: 'sapling2',
        img: imgObj.sapling2.src,
        num: 71,
        lineNum: 14,
      },
      end: {
        id: 'sapling3',
        img: imgObj.sapling3.src,
        num: 32,
        lineNum: 14,
      },
    },
    truck: {
      width: '340',
      height: '380',
      x: 210,
      y: 485,
      load: {
        id: 'trunk1',
        img: imgObj.trunk1.src,
        num: 26,
        lineNum: 14,
      },
      start: {
        id: 'trunk2',
        img: imgObj.trunk2.src,
        num: 53,
        lineNum: 14,
      },
      end: {
        id: 'trunk3',
        img: imgObj.trunk3.src,
        num: 22,
        lineNum: 14,
      },
    },
    smallTree: {
      width: '380',
      height: '450',
      x: 200,
      y: 420,
      load: {
        id: 'smallTree1',
        img: imgObj.smallTree1.src,
        num: 98,
        lineNum: 13,
      },
      start: {
        id: 'smallTree2',
        img: imgObj.smallTree2.src,
        num: 98,
        lineNum: 13,
      },
      end: {
        id: 'smallTree3',
        img: imgObj.smallTree3.src,
        num: 32,
        lineNum: 13,
      },
    },
    bigTree: {
      width: '450',
      height: '520',
      x: 160,
      y: 360,
      load: {
        id: 'bigTree1',
        img: imgObj.bigTree1.src,
        num: 36,
        lineNum: 11,
      },
      start: {
        id: 'bigTree2',
        img: imgObj.bigTree2.src,
        num: 97,
        lineNum: 11,
      },
      end: {
        id: 'bigTree3',
        img: imgObj.bigTree3.src,
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
  //第二阶段树干生张精灵图
  const creatTrunkPrepare = () => {
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

  const creatTrunkStart = () => {
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
    SpriteStart.visible = false;
    SpriteLoading.removeFromParent(stage);
    SpriteEnd.goto(0);
    SpriteEnd.play();
    SpriteEnd.visible = true;
    SpriteEnd.setFrameCallback(SpriteEnd.getNumFrames() - 1, () => {
      SpriteStart.goto(0);
      SpriteStart.visible = true;
      SpriteStart.play();
      setTimeout(() => {
        SpriteEnd.visible = false;
      });
    });
    SpriteEnd.play();
  };
  creatTrunkPrepare();
  creatTrunkStart();
  creatTrunkEnd();
  console.log(SpriteStart);
  SpriteObj = { SpriteLoading, SpriteStart, SpriteEnd };
  return { ...SpriteObj, endClick };
};
