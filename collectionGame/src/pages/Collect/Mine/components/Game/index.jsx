import React, { useState, useEffect, forwardRef } from 'react';
import BeanCardModal from '@/components/BeanCardModal';
import CheckCards from './components/CheckCards';
import GetCards from './components/GetCards';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { fetchGatherReceiveOthersCard, fetchExchangeReward } from '@/services/game';
import { useUpdateEffect } from 'ahooks';
import { useLocation } from 'umi';
import './index.less';
import { Toast } from 'antd-mobile';

const index = forwardRef((props, ref) => {
  const { gameDetail, getGameDetail, loadFlag } = props;
  const [visible, setVisible] = useState(false); //卡片弹窗
  const [cardList, setCardList] = useState([]); //助力弹窗的数组
  //助力的卡片
  const { shareCardList = [] } = gameDetail;
  const location = useLocation();
  const {
    gameBeginFlag, //标识
  } = gameDetail;
  useEffect(() => {
    getOtherCard();
  }, [loadFlag, gameBeginFlag]);

  useEffect(() => {
    HelpOthers();
  }, []);

  useEffect(() => {
    console.log(cardList.length, 'length');
    if (cardList.length > 0) {
      setVisible(cardList[0]);
    }
  }, [cardList.length]);

  //助力他人

  const HelpOthers = async () => {
    const { query = {} } = location;
    const { userId, relateId, commandType } = query;
    if (commandType === 'gatherExchangeHelp') {
      const res = await fetchExchangeReward({
        identification: relateId,
        shareUserIdStr: userId,
      });
      if (res.success) {
        Toast.show({
          content: '助力成功',
        });
      }
    }
  };

  //获取他人赠送的福卡

  const getOtherCard = async () => {
    let list = cardList;
    const { query = {} } = location;
    const { userId, command, relateId, commandType } = query;
    if (
      userId &&
      command &&
      relateId &&
      gameBeginFlag === '1' &&
      !ref.current &&
      commandType === 'luckCardGiveOther'
    ) {
      const res = await fetchGatherReceiveOthersCard({
        identification: relateId,
        command,
        shareUserId: userId,
      });
      if (res.success) {
        const { content = {} } = res;
        const { cardInfo = {} } = content;
        // cardInfo.userName = content.username;
        list.push(cardInfo);
        ref.current = true;
      }
    }
    if (shareCardList.length) {
      list = [...list, shareCardList[0]];
    }
    setCardList([...list]);
  };

  //连续弹窗
  const countList = () => {
    const list = cardList.slice(1);
    console.log(list, 'list');
    if (list.length > 0) {
      setCardList([...list]);
    } else {
      setCardList([]);
      setVisible(false);
    }
  };

  return (
    <>
      <TransitionGroup>
        {gameBeginFlag === '0' && (
          <CSSTransition timeout={500} classNames="transtionBox">
            <div>
              <CheckCards gameDetail={gameDetail} getGameDetail={getGameDetail}></CheckCards>
            </div>
          </CSSTransition>
        )}
        {gameBeginFlag === '1' && (
          <CSSTransition timeout={500} classNames="transtionBox">
            <div>
              <GetCards
                gameDetail={gameDetail}
                getGameDetail={getGameDetail}
                openModal={(val) => {
                  let list = [];
                  list.unshift(val);
                  setCardList([...list]);
                }}
              ></GetCards>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>

      {/* 福卡弹窗 */}
      <BeanCardModal visible={visible} countList={countList} />
    </>
  );
});

export default index;
