import React, { useState, useEffect } from 'react';
import './index.less';
import { Button, Toast } from 'antd-mobile';
import SwiperReceive from './components/SwiperReceive';
import ScrollGoods from './components/ScrollGoods';
import TitleBlock from '@/components/TitleBlock';
import AddressModal from '@/components/AddressModal';
import Cloud from '@/components/Cloud';
import { fetchListGameRewardBarrage, fetchBeginGatherGame } from '@/services/game';
import { nativeClose } from '@/utils/birdgeContent';
import BlessWord from '@public/loading/BlessWord.png';

function index(props) {
  const {
    gameDetail = {}, //详情数据
    getGameDetail, //获取详情接口
  } = props;

  const { cardList = [] } = gameDetail;
  const [cardInfo, setCardInfo] = useState({});
  const [barrageList, setBarrageList] = useState([]); //游戏弹幕
  const cardLength = Object.keys(cardInfo).length;

  useEffect(() => {
    // getBrrageList();
  }, []);

  //选择卡片
  const checkCard = (val) => {
    setCardInfo(val);
  };

  //获取轮播数据
  const getBrrageList = async () => {
    const res = await fetchListGameRewardBarrage({
      size: 10,
    });
    const { gameBarrageList = [] } = res.content;
    setBarrageList([...gameBarrageList]);
  };

  //确认按钮
  const cardsOk = async () => {
    const res = await fetchBeginGatherGame({
      identification: cardInfo.identification,
    });
    getGameDetail();
  };

  return (
    <div className="checkCards">
      {/* 标题栏 */}
      <TitleBlock type="check" back={nativeClose}></TitleBlock>
      <div className="checkCards_Img">
        <img src={BlessWord} alt="" />
      </div>
      {/*左滑*/}
      <ScrollGoods list={cardList} checkCard={checkCard}></ScrollGoods>
      {/* 确认按钮 */}
      <div className="mailButton" onClick={cardLength ? cardsOk : null}>
        <div style={{ opacity: cardLength ? '1' : '0.5' }}>确认领取，开始集福豆</div>
      </div>
      {/* 领取轮播 */}
      {/* <SwiperReceive list={[1, 2, 3, 4]}></SwiperReceive> */}
      {/* 云 */}
      <Cloud></Cloud>

      {/* 确认地址弹窗 */}
      {/* <AddressModal></AddressModal> */}
    </div>
  );
}

export default index;