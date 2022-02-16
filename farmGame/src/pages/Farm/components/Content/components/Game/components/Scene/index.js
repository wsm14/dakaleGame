import React, { useRef, useState } from 'react';
import { HiloCreateSpirit, conversionSize } from '@/utils/game';

let SpriteObj = { SpriteLoading: null, SpriteStart: null, SpriteEnd: null };

export const SaplingScene = ({ stage, imgObj }) => {
  return <div>index</div>;
};

//第二阶段树干
export const TrunkScene = (stage, imgObj) => {
  let { SpriteLoading, SpriteStart, SpriteEnd } = SpriteObj;
  let trunkRef = true;
  Object.keys(SpriteObj).forEach((item) => {
    console.log(SpriteObj[item], 'SpriteObj[item]');
    SpriteObj[item] && SpriteObj[item].removeFromParent(stage);
  });
  //第二阶段树干生张精灵图
  const creatTrunkPrepare = () => {
    SpriteLoading = new Hilo.Sprite({
      id: 'trunk1',
      currentFrame: 0,
      loop: false,
      interval: 24,
      timeBased: true,
      width: conversionSize(340),
      height: conversionSize(380),
      x: conversionSize(210),
      y: conversionSize(485),
      onEnterFrame: (e) => {
        if (e + 1 === SpriteLoading.getNumFrames() && trunkRef) {
          SpriteStart.visible = true;
          SpriteStart.play();
          SpriteLoading.visible = false;
          SpriteLoading.removeFromParent(stage);
          trunkRef = false;
        }
      },
    });
    let trunkAnimate = HiloCreateSpirit(imgObj.trunk1.src, 26, 14, 340, 380, 'trunk1');
    SpriteLoading.addFrame(trunkAnimate.getSprite('trunk1'));
    stage.addChild(SpriteLoading);
  };

  const creatTrunkStart = () => {
    SpriteStart = new Hilo.Sprite({
      id: 'trunk2',
      currentFrame: 0,
      interval: 24,
      timeBased: true,
      visible: false,
      width: conversionSize(340),
      height: conversionSize(380),
      x: conversionSize(210),
      y: conversionSize(485),
    });
    let trunkAnimate2 = HiloCreateSpirit(imgObj.trunk2.src, 53, 14, 340, 380, 'trunk2');
    SpriteStart.addFrame(trunkAnimate2.getSprite('trunk2'));
    SpriteStart.stop();
    stage.addChild(SpriteStart);
  };

  const creatTrunkEnd = () => {
    SpriteEnd = new Hilo.Sprite({
      id: 'trunk3',
      currentFrame: 0,
      interval: 24,
      loop: false,
      timeBased: true,
      visible: false,
      width: conversionSize(340),
      height: conversionSize(380),
      x: conversionSize(210),
      y: conversionSize(485),
    });
    let trunkAnimate3 = HiloCreateSpirit(imgObj.trunk3.src, 22, 14, 340, 380, 'trunk3');
    SpriteEnd.addFrame(trunkAnimate3.getSprite('trunk3'));
    SpriteEnd.stop();
    stage.addChild(SpriteEnd);
  };

  const endClick = () => {
    let flag = true;
    SpriteStart.visible = false;
    SpriteEnd.goto(0);
    SpriteEnd.play();
    SpriteEnd.visible = true;
    SpriteEnd.onEnterFrame = (e) => {
      if (e + 1 === SpriteEnd.getNumFrames() && flag) {
        console.log(1111);
        SpriteStart.visible = true;
        setTimeout(() => {
          SpriteEnd.visible = false;
        });
        flag = false;
      }
    };
    SpriteEnd.play();
  };
  creatTrunkPrepare();
  creatTrunkStart();
  creatTrunkEnd();

  SpriteObj = { SpriteLoading, SpriteStart, SpriteEnd };
  return { ...SpriteObj, endClick };
};
