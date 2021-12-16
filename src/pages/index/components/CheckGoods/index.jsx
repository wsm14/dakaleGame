import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'umi';
import './index.less';
import { Button, Toast } from 'antd-mobile';
import Rules from '@/components/Rules';
import SwiperReceive from './components/SwiperReceive';
import ScrollGoods from './components/ScrollGoods';
import { fetchListGameRewardBarrage } from '@/services/game';
import { set } from 'lodash';

function index(props) {
  const { homeDetail, packageObj } = useSelector((state) => state.receiveGoods);
  const dispatch = useDispatch();
  const [barrageList, setBarrageList] = useState([]); //游戏弹幕
  const {
    freeGoodList = [], //商品列表
  } = homeDetail;

  useEffect(() => {
    getBrrageList();
  }, []);

  const checkGoods = () => {
    if (Object.keys(packageObj).length) {
      dispatch({
        type: 'receiveGoods/save',
        payload: {
          orderVisible: true,
        },
      });
    } else {
      Toast.show({
        content: '请选择商品',
      });
    }
  };

  const getBrrageList = async () => {
    const res = await fetchListGameRewardBarrage({
      size: 10,
    });
    const { gameBarrageList = [] } = res.content;
    setBarrageList([...gameBarrageList]);
  };
  return (
    <div className="checkGoods">
      {/* 规则 */}
      <Rules></Rules>
      <div className="checkGoods_tips">
        选择商品，包邮到家
        <br /> 快选择心仪商品，开启收包裹之旅~
      </div>
      {/*左滑*/}
      <ScrollGoods list={freeGoodList}></ScrollGoods>
      {/* 确认按钮 */}
      <div className="mailButton">
        <Button onClick={checkGoods} className="mailButton_button">
          确认商品，开始邮寄
        </Button>
      </div>
      {/* 领取轮播 */}
      <SwiperReceive list={barrageList}></SwiperReceive>
    </div>
  );
}

export default index;
