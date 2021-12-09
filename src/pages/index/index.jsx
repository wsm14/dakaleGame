import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import './index.less';
import { uploadResponents } from '@/components/uploadRes/index';
import { imgList } from '@/common/goods';
import Loding from './components/Loding';
import CheckGoods from './components/CheckGoods';
import StartSupply from './components/StartSupply';
import Game from './components/Game';

const LoginForm = ({ type, dispatch }) => {
  const [state, setState] = useState();
  const [imgObj, setImgObj] = useState({});
  useEffect(() => {
    uploadResponents(
      imgList,
      (e) => {
        setState(e);
      },
      (_, val) => {
        setImgObj(val);
        setTimeout(() => {
          dispatch({
            type: 'receiveGoods/save',
            payload: {
              type: 'game',
            },
          });
        }, 500);
      },
    );
  }, []);
  return (
    <>
      {type === 'loding' && <Loding state={state} imgList={imgList}></Loding>}
      {type === 'checkGoods' && <CheckGoods></CheckGoods>}
      {type === 'startSupply' && <StartSupply imgObj={imgObj}></StartSupply>}
      {type === 'game' && <Game imgObj={imgObj}></Game>}
    </>
  );
};

export default connect(({ receiveGoods }) => ({
  type: receiveGoods.type,
}))(LoginForm);
