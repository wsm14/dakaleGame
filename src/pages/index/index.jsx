import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector, KeepAlive, useLocation } from 'umi';
import './index.less';
import { uploadResponents } from '@/components/uploadRes/index';
import { reloadTab } from '@/utils/utils';
import { getToken, hideTitle, closeAnimate, deviceName } from '@/utils/birdgeContent';
import ReceiveModal from '@/components/ReceiveModal';
import OrderModal from '@/components/OrderModal';
import { imgList } from '@/common/goods';
import Loding from './components/Loding';
import CheckGoods from './components/CheckGoods';
import StartSupply from './components/StartSupply';
import UsualModal from '@/components/UsualModal';
import Game from './components/Game';

const LoginForm = ({ type }) => {
  const [state, setState] = useState();
  const [imgObj, setImgObj] = useState({});
  const { orderVisible, homeDetail } = useSelector((state) => state.receiveGoods);
  const [time, setTimes] = useState(false);
  const { gameInfo } = homeDetail;
  const dispatch = useDispatch();
  useEffect(() => {
    getStateToken();
    closeAnimate();
    uploadResponents(
      imgList,
      (e) => {
        setState(e);
      },
      (_, val) => {
        setImgObj(val);
        if (deviceName() == 'miniProgram') {
          dispatch({
            type: 'receiveGoods/save',
            payload: {
              gameHeight: 0,
            },
          });
        }
        getHomeDetail();
        reloadTab(getHomeDetail);
      },
    );
  }, []);

  //获取整体的信息
  const getHomeDetail = () => {
    dispatch({
      type: 'receiveGoods/fetchGetHomeDetail',
      callback: (res) => {
        const { pageFlag } = res;
        const type = pageFlag === '0' ? 'checkGoods' : 'game';
        dispatch({
          type: 'receiveGoods/save',
          payload: {
            type: type,
          },
        });
      },
    });
  };

  const getStateToken = () => {
    getToken((e) => {
      if (e) {
        setTimes(true);
      }
    });
    hideTitle();
    // sessionStorage.setItem(
    //   'dakaleToken',
    //   '874MXiUXniOjQEu7LBN1htwM1RIVUlTaRSpTmh76N9PkNKWt5sucDXMogmuZxlTk',
    // );
  };

  return (
    <>
      {type === 'loding' && <Loding state={state} imgList={imgList}></Loding>}
      {type === 'checkGoods' && <CheckGoods></CheckGoods>}
      {type === 'startSupply' && (
        <StartSupply imgObj={imgObj} getHomeDetail={getHomeDetail}></StartSupply>
      )}
      {type === 'game' && <Game imgObj={imgObj} getHomeDetail={getHomeDetail}></Game>}

      {/* 确认订单弹窗 */}
      <OrderModal
        visible={orderVisible}
        // pageFlag={pageFlag}
        // query={query}
        time={time}
        getHomeDetail={getHomeDetail}
        onClose={() => {
          dispatch({
            type: 'receiveGoods/save',
            payload: {
              orderVisible: false,
            },
          });
        }}
      ></OrderModal>

      {/* 免费领取的弹窗 */}
      <ReceiveModal getHomeDetail={getHomeDetail}></ReceiveModal>

      {/* 普通弹窗 */}
      <UsualModal></UsualModal>
    </>
  );
};

export default connect(({ receiveGoods }) => ({
  type: receiveGoods.type,
}))(LoginForm);
