import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'umi';
import './index.less';
import { Button, Toast } from 'antd-mobile';
import TitleBlock from '@/components/TitleBlock';
import SwiperReceive from './components/SwiperReceive';
import ScrollGoods from './components/ScrollGoods';
import OrderModal from '@/components/OrderModal';
import { fetchListGameRewardBarrage } from '@/services/game';
import checkTitle from '@/asstes/image/checkTitle.png';

function index(props) {
  const { homeDetail, packageObj } = useSelector((state) => state.receiveGoods);
  const dispatch = useDispatch();
  const [barrageList, setBarrageList] = useState([]); //游戏弹幕
  const [orderVisible, setOrderVisible] = useState(false);
  const {
    freeGoodList = [], //商品列表
  } = homeDetail;

  useEffect(() => {
    getBrrageList();
  }, []);

  const checkGoods = () => {
    if (Object.keys(packageObj).length) {
      setOrderVisible(true);
    } else {
      Toast.show({
        content: '请选择商品',
      });
    }
    setOrderVisible(true);
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
      <TitleBlock></TitleBlock>
      <div className="checkGoods_tips">
        <img src={checkTitle} alt="" />
      </div>
      {/*左滑*/}
      <ScrollGoods list={freeGoodList}></ScrollGoods>
      {/* 确认按钮 */}
      <div className="mailButton">
        <Button onClick={checkGoods} className="mailButton_button">
          确认果苗，开始种植
        </Button>
      </div>
      {/* 领取轮播 */}
      <SwiperReceive list={barrageList}></SwiperReceive>
      {/* 确认弹窗 */}
      <OrderModal
        visible={orderVisible}
        onClose={() => {
          setOrderVisible(false);
        }}
      ></OrderModal>
    </div>
  );
}

export default index;
