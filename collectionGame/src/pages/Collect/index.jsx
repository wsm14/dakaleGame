import React, { useState, useEffect } from 'react';
import { uploadResponents } from '@/components/uploadRes/index';
import { imgList } from '@/common/goods';
import { KeepAlive } from 'umi';
import Loding from './components/Loding';
import Game from './components/Game';

function index() {
  const [state, setState] = useState(); //进度条加载
  const [loadFlag, setLoadFlag] = useState(false);

  useEffect(() => {
    getLoading();
  }, []);

  const getLoading = () => {
    uploadResponents(
      imgList,
      (e) => {
        setState(e);
      },
      (_, val) => {
        setTimeout(() => {
          setLoadFlag(true);
        }, 1000);
      },
    );
  };

  return loadFlag ? <Game></Game> : <Loding state={state} imgList={imgList}></Loding>;
}

export default index;
