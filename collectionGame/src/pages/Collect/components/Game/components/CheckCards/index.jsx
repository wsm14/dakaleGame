import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'umi';
import './index.less';
import { Button, Toast } from 'antd-mobile';
import SwiperReceive from './components/SwiperReceive';
import ScrollGoods from './components/ScrollGoods';
import TitleBlock from '@/components/TitleBlock';
import AddressModal from '@/components/AddressModal';

import Cloud from '@/components/Cloud';
import { fetchListGameRewardBarrage } from '@/services/game';
import BlessWord from '@public/loading/BlessWord.png';

function index(props) {
  const { homeDetail, packageObj } = useSelector((state) => state.receiveGoods);
  const dispatch = useDispatch();
  const [barrageList, setBarrageList] = useState([]); //游戏弹幕
  const {
    freeGoodList = [], //商品列表
  } = homeDetail;

  useEffect(() => {
    // getBrrageList();
  }, []);

  const checkCards = () => {
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
    <div className="checkCards">
      {/* 标题栏 */}
      <TitleBlock type="check"></TitleBlock>
      <div className="checkCards_Img">
        <img src={BlessWord} alt="" />
      </div>
      {/*左滑*/}
      <ScrollGoods list={[1, 2, 3, 4, 5, 6]}></ScrollGoods>
      {/* 确认按钮 */}
      <div className="mailButton" onClick={checkCards}>
        确认领取，开始集福豆
      </div>
      {/* 领取轮播 */}
      <SwiperReceive list={[1, 2, 3, 4]}></SwiperReceive>
      {/* 云 */}
      <Cloud></Cloud>

      {/* 确认地址弹窗 */}
      <AddressModal></AddressModal>
    </div>
  );
}

export default index;
