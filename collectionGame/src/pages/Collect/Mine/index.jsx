import React, { useState, useEffect } from 'react';
import { uploadResponents } from '@/components/uploadRes/index';
import { imgList } from '@/common/goods';
import { closeAnimate, hideTitle } from '@/utils/birdgeContent';
import Loding from './components/Loding';
import Game from './components/Game';

function index() {
  const [state, setState] = useState(); //进度条加载
  const [loadFlag, setLoadFlag] = useState(false);

  useEffect(() => {
    hideTitle();
    closeAnimate();
    getLoading();
  }, []);

  useEffect(() => {
    if (state == imgList.length) {
      setLoadFlag(true);
    }
  }, [state]);

  const getLoading = () => {
    uploadResponents(
      imgList,
      (e) => {
        setState(e);
      },
      (_, val) => {},
    );
  };

  return loadFlag ? <Game></Game> : <Loding state={state} imgList={imgList}></Loding>;
}

export default index;
