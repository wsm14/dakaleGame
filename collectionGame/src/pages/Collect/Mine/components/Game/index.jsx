import React, { useState, useEffect } from 'react';
import BeanCardModal from '@/components/BeanCardModal';
import CheckCards from './components/CheckCards';
import GetCards from './components/GetCards';
import { fetchGatherMainPage, fetchGatherReceiveOthersCard } from '@/services/game';
import { getToken } from '@/utils/birdgeContent';
import { reloadTab } from '@/utils/utils';
import { set } from 'lodash';

function index() {
  const [visible, setVisible] = useState(false); //卡片弹窗
  const [cardList, setCardList] = useState([]); //助力弹窗的数组
  const [gameDetail, setGameDetail] = useState({}); //游戏详情

  useEffect(() => {
    reloadTab(getGameDetail);
    getToken((e) => {
      if (e) {
        getGameDetail();
      }
    });
  }, []);

  useEffect(() => {
    if (cardList.length > 0) {
      setVisible(cardList[0]);
    }
  }, [cardList.length]);

  //获取整体数据
  const getGameDetail = async () => {
    const res = await fetchGatherMainPage();
    const { content = {} } = res;
    const { shareCardList = [] } = content;
    setGameDetail(content);
    setCardList([...cardList, ...shareCardList]);
  };

  //获取他人赠送的福卡

  const getOtherCard = async () => {
    const res = await fetchGatherReceiveOthersCard();
    const { content = {} } = res;
    const { cardInfo = {} } = content;
    cardInfo.userName = content.username;
    setCardList([cardInfo, ...cardList]);
  };

  //连续弹窗
  const countList = () => {
    const list = cardList.slice(1);
    if (list.length > 0) {
      setCardList([...list]);
    } else {
      setVisible(false);
    }
  };

  const {
    gameBeginFlag, //标识
  } = gameDetail;

  return (
    <>
      {gameBeginFlag === '0' && (
        <CheckCards gameDetail={gameDetail} getGameDetail={getGameDetail}></CheckCards>
      )}
      {gameBeginFlag === '1' && (
        <GetCards
          gameDetail={gameDetail}
          getGameDetail={getGameDetail}
          openModal={(val) => {
            setVisible(val);
          }}
        ></GetCards>
      )}
      {/* 福卡弹窗 */}
      <BeanCardModal visible={visible} countList={countList} />
    </>
  );
}

export default index;
