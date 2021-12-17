import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector, KeepAlive, useLocation } from 'umi';
import './index.less';
import { uploadResponents } from '@/components/uploadRes/index';
import { reloadTab } from '@/utils/utils';
import { getToken, hideTitle, closeAnimate } from '@/utils/birdgeContent';
import ReceiveModal from '@/components/ReceiveModal';
import OrderModal from '@/components/OrderModal';
import { imgList } from '@/common/goods';
import Loding from './components/Loding';
import CheckGoods from './components/CheckGoods';
import StartSupply from './components/StartSupply';
import Game from './components/Game';

const LoginForm = ({ type }) => {
  const [state, setState] = useState();
  const [imgObj, setImgObj] = useState({});
  const [token, setToken] = useState(null);
  const { orderVisible, homeDetail } = useSelector((state) => state.receiveGoods);
  const location = useLocation();
  const { query = {} } = location;
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
        setToken(e);
      }
    });
    hideTitle();
    // sessionStorage.setItem(
    //   'dakaleToken',
    //   'ufKFHQCty4nkVdycmxGkMk268QlodY6V78aO8R5GFaJi9Fxhg0Ge8xB4SrD9BeTr',
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
        token={token}
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
    </>
  );
};

export default connect(({ receiveGoods }) => ({
  type: receiveGoods.type,
}))(LoginForm);
