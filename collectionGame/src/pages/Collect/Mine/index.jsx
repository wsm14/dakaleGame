import React, { useState, useEffect, useRef } from 'react';
import { uploadResponents } from '@/components/uploadRes/index';
import { imgList } from '@/common/goods';
import { closeAnimate, hideTitle, getToken } from '@/utils/birdgeContent';
import { reloadTab } from '@/utils/utils';
import { fetchGatherMainPage } from '@/services/game';
import Loding from './components/Loding';
import Game from './components/Game';

function index() {
  const [state, setState] = useState(); //进度条加载
  const [gameDetail, setGameDetail] = useState({}); //游戏详情
  const loadRef = useRef(false);

  useEffect(() => {
    hideTitle();
    closeAnimate();
    reloadTab(() => {
      if (!sessionStorage.getItem('dakaleToken')) {
        getToken((e) => {
          if (e) {
            getGameDetail();
          }
        });
      } else {
        getGameDetail();
      }
    });
    getLoading();
  }, []);

  const getLoading = () => {
    uploadResponents(
      imgList,
      (e) => {
        setState(e);
      },
      (_, val) => {
        getToken((e) => {
          if (e) {
            getGameDetail();
          }
        });
      },
    );
  };
  //获取整体数据
  const getGameDetail = async () => {
    const res = await fetchGatherMainPage();
    const { content = {} } = res;
    setGameDetail(content);
    loadRef.current = !loadRef.current;
  };

  return Object.keys(gameDetail).length ? (
    <Game gameDetail={gameDetail} getGameDetail={getGameDetail} loadFlag={loadRef.current}></Game>
  ) : (
    <Loding state={state} imgList={imgList}></Loding>
  );
}

export default index;
