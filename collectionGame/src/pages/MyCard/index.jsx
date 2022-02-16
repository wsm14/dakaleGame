import React, { useState, useEffect } from 'react';
import './index.less';
import { history } from 'umi';
import { useDebounceFn } from 'ahooks';
import Cloud from '@/components/Cloud';
import TitleBlock from '@/components/TitleBlock';
import {
  fetchGatherGetMyHarvest,
  fetchGatherExchangeCard,
  fetchGathergetLuckReward,
  fetchCommandGetCommand,
} from '@/services/game';
import { formatTime } from '@/utils/utils';
import { linkToMyGoods, deviceName } from '@/utils/birdgeContent';
import { cobyInfo } from '@/utils/utils';
import CloseModal from './components/CloseModal';
import ShareModal from '@/components/ShareModal';
import DownModal from './components/DownModal';
import TipsModal from './components/TipsModal';

import lantern from '@public/loading/lantern.png';
import exchange from '@public/image/exchange.png';
import card0 from '@public/image/card0.png';
import card1 from '@public/image/card1.png';
import card2 from '@public/image/card2.png';
import card3 from '@public/image/card3.png';
import card4 from '@public/image/card4.png';

function index() {
  const [cardDetail, setCardDetail] = useState({}); //整体信息
  const [cardInfo, setCardInfo] = useState({}); //一张卡的信息
  const [visible, setVisible] = useState(false); //合成福卡弹窗
  const [shareVisible, setShareVisible] = useState({ show: false }); //转赠弹窗
  const [downVisible, setDownVisible] = useState(false); //小程序转赠弹窗
  const [tipsVisible, setTipsVisible] = useState(false);

  useEffect(() => {
    getCardDetail();
  }, []);

  const getCardDetail = async () => {
    const res = await fetchGatherGetMyHarvest();
    const { cardList = [] } = res.content;
    //获取福卡
    const lastChild = cardList.pop();
    if (lastChild.hasNums > 0) {
      cardList.unshift(lastChild);
    }
    const cardFlag = cardList.every((item) => item.hasNums > 0);
    setCardDetail(res.content);

    // setLastChild(lastChild);
    // setCardFlag(cardFlag);

    setCardInfo({
      lastChild: lastChild,
      checkInfo: cardList[0],
      cardFlag: cardFlag,
    });
  };

  //选择卡
  const checkCard = (item) => {
    setCardInfo({ ...cardInfo, checkInfo: item });
  };
  //合成卡
  const closeCard = async () => {
    const res = await fetchGatherExchangeCard();
    if (res.success) {
      setVisible(true);
      getCardDetail();
    }
  };

  //点击返回按钮
  const goBack = () => {
    history.goBack();
  };

  //开奖
  const openPrize = async () => {
    await fetchGathergetLuckReward();
    getCardDetail();
  };

  //我的记录
  const myRecord = () => {
    linkToMyGoods();
  };

  //转赠好友
  const giveFriend = async () => {
    if (deviceName() === 'miniProgram') {
      setDownVisible(true);
    } else {
      setShareVisible({ show: true });
    }

    // const { checkInfo } = cardInfo;
    // const res = await fetchCommandGetCommand({
    //   commandType: 'luckCardGiveOther',
    //   relateId: checkInfo.identification,
    // });
    // if (res.success) {
    //   const { command } = res.content;
    //   cobyInfo(command, { show: true, value: checkInfo.identification }, (val) => {
    //     setShareVisible(val);
    //   });
    // }
  };

  const {
    cardList = [],
    prizeOpenTime, //开奖时间
    totalLuckCard, //多少人集齐
  } = cardDetail;

  const {
    lastChild = {}, //福卡信息
    checkInfo = {}, //选择卡的信息
    cardFlag = {}, //是否可以合成
  } = cardInfo;

  const getTime = formatTime(prizeOpenTime) || {};
  const { run } = useDebounceFn(
    () => {
      openPrize();
    },
    { wait: 1000, leading: true, trailing: false },
  );
  return (
    <>
      {/* 标题栏 */}
      <TitleBlock type="title" back={goBack}></TitleBlock>
      <div className="myCard">
        {/* 上方图片 */}
        <div className="myCard_topImg">{/* <img src={lantern} alt="" /> */}</div>
        {/* 下方内容 */}
        <div className="myCard_content">
          {/* 我的福豆 */}
          <div className="myCardInfo">
            <div className="myCardInfo_num">
              {totalLuckCard}人已集齐，{getTime.month}月{getTime.day}日 {getTime.hour}:
              {getTime.minutes}开奖
            </div>
            <div className="myCardInfo_center">
              {checkInfo.isLuckCard === '1' ? (
                <>
                  {checkInfo.luckPrize === 0 ? (
                    <div className="openPrize">
                      <div className="openPrize_time">
                        {getTime.month}月{getTime.day}日 {getTime.hour}:{getTime.minutes}开奖
                      </div>
                      <div className="openPrize_open" onClick={run}></div>
                    </div>
                  ) : (
                    <div className="alreadyOpen">
                      <div className="alreadyOpen_money">
                        {(checkInfo.luckPrize / 100).toFixed(2)}
                        <span>元</span>
                      </div>
                      <div className="alreadyOpen_bean">
                        {checkInfo.luckPrize}卡豆已存入卡豆账户
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <img
                  src={checkInfo.hasNums > 0 ? checkInfo.cardImg : checkInfo.cardVirualImg}
                  alt=""
                  className="myCardInfo_center_img"
                />
              )}
            </div>
            <div className="myCardInfo_area">
              {checkInfo.isLuckCard === '1' ? null : (
                <div className="myCardInfo_shareFriends" onClick={giveFriend}>
                  转赠好友
                </div>
              )}
            </div>

            <div className="myCardInfo_mation">
              {cardList.map((item) => (
                <div
                  className={`beanCard ${
                    checkInfo.identification === item.identification ? 'beanCard_border' : null
                  }`}
                  onClick={() => {
                    checkCard(item);
                  }}
                  key={item.identification}
                >
                  <div className="beanCard_width">
                    <img
                      src={item.cardNarrowImg}
                      className={`beanCard_img ${item.hasNums > 0 ? null : 'beanCard_opacity'}`}
                    />
                    {item.hasNums > 0 && item.isLuckCard !== '1' && (
                      <div className="beanCard_num">
                        <div>{item.hasNums}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {lastChild.hasNums > 0 ? (
              <div className="myCardInfo_alreadySynthesis">恭喜您已合成</div>
            ) : (
              <div className="myCardInfo_synthesis" onClick={cardFlag ? closeCard : null}>
                <div style={{ opacity: cardFlag ? '1' : '0.5' }}>合成福豆卡</div>
              </div>
            )}

            {/*  */}
          </div>
          <div className="exchangeCard">
            <img src={exchange} alt="" className="exchangeCard_titleImg" />
            <div className="exchangeCard_list">
              <div className="exchangeCard_goodsImg"></div>
              <div className="exchangeCard_goodsName">电商品名称</div>
              <div className="exchangeCard_line"></div>
              <div className="exchangeCard_bottom">
                <div className="exchangeCard_cards">
                  <div className="exchangeCard_item">
                    <img src={card0} alt="" />
                    <div>1</div>
                  </div>
                  <div className="exchangeCard_item">
                    <img src={card1} alt="" />
                    <div>1</div>
                  </div>
                  <div className="exchangeCard_item">
                    <img src={card2} alt="" />
                    <div>1</div>
                  </div>
                  <div className="exchangeCard_item">
                    <img src={card3} alt="" />
                    <div>1</div>
                  </div>
                  <div className="exchangeCard_item">
                    <img src={card4} alt="" />
                    <div>1</div>
                  </div>
                </div>
                <div
                  className="exchangeCard_button"
                  onClick={() => {
                    setTipsVisible(true);
                  }}
                >
                  兑换0/1
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 转赠好友弹窗 */}
      <ShareModal
        visible={shareVisible}
        getCardDetail={getCardDetail}
        checkInfo={checkInfo}
        onClose={() => {
          setShareVisible({ show: false });
        }}
      ></ShareModal>

      {/* 合成弹窗 */}
      <CloseModal
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      ></CloseModal>

      {/*下载弹窗  */}
      <DownModal
        visible={downVisible}
        onClose={() => {
          setDownVisible(false);
        }}
      ></DownModal>

      {/*是否兑换弹窗  */}
      <TipsModal
        visible={tipsVisible}
        onClose={() => {
          setTipsVisible(false);
        }}
      ></TipsModal>
      <Cloud></Cloud>
    </>
  );
}

export default index;
