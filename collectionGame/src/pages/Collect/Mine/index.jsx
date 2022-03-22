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
  const [loadFlag, setLoadFlag] = useState(false);
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
        if (Object.keys(val).length === imgList.length) {
          getToken((e) => {
            if (e) {
              getGameDetail();
            }
          });
        }
      },
    );
  };
  //获取整体数据
  const getGameDetail = async () => {
    const res = await fetchGatherMainPage();
    const { content = {} } = res;
    // loadRef.current = !loadRef.current;
    setLoadFlag(!loadFlag);
    setGameDetail(content);
  };

  return Object.keys(gameDetail).length ? (
    <Game
      gameDetail={gameDetail}
      getGameDetail={getGameDetail}
      loadFlag={loadFlag}
      ref={loadRef}
    ></Game>
  ) : (
    <Loding state={state} imgList={imgList}></Loding>
  );
}

export default index;
