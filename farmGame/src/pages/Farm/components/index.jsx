import React, { useState, useEffect } from 'react';
import { uploadResponents } from '@/components/uploadRes/index';
import { imgList } from '@/common/goods';
import { getToken } from '@/utils/birdgeContent';
import { fetchFarmMainPage } from '@/services/game';
import { reloadTab } from '@/utils/utils';
import Loading from '../components/Loading';
import Content from './Content';

const index = () => {
  const [state, setState] = useState(); //加载到哪张图片
  const [imgFlag, setImgFlag] = useState(false);
  const [gameDetail, setGameDetail] = useState({});
  const [imgObj, setImgObj] = useState({}); //图片集合
  useEffect(() => {
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
              setImgObj(val);
              setImgFlag(true);
              getGameDetail();
            }
          });
        }
      },
    );
  };

  //获取整体数据
  const getGameDetail = async () => {
    const res = await fetchFarmMainPage();
    const { content = {} } = res;
    setGameDetail(content);
  };
  return (
    <>
      {imgFlag && Object.keys(gameDetail).length ? (
        <Content imgObj={imgObj} gameDetail={gameDetail} getGameDetail={getGameDetail}></Content>
      ) : (
        <Loading current={state} total={imgList.length}></Loading>
      )}
    </>
  );
};

export default index;
