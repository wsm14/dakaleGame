import React, { useState, useRef, useEffect, useMemo } from 'react';
import { LuckyWheel } from '@lucky-canvas/react';
import { Swiper } from 'antd-mobile';
import './index.less';
import { Toast } from 'antd-mobile';
import html2canvas from 'html2canvas';
import { fetchGatherLuckDraw, fetchShareGetNewShareInfo } from '@/services/game';
import { conversionWidth } from '@/utils/game';
import { CHECK_TYPE } from '@/common/goods';
import { deviceName, makeReport, linkTo } from '@/utils/birdgeContent';
import PosterModal from '@/components/PosterModal';
import contentWord1 from '@public/loading/contentWord1.png';
import contentWord2 from '@public/loading/contentWord2.png';
import turnImg from '@public/loading/turn.png';
import turnButton from '@public/loading/turnButton.png';
import reunion from '@public/loading/reunion.png';
import turnBac from '@public/loading/turnBac.png';

function index(props) {
  const { openModal, gameBalance, gameDetail, getGameDetail } = props;
  const [checkType, setCheckType] = useState(0); //导航类型 0--转盘  1--分享;
  const [shareImg, setShareImg] = useState();
  const swiperRef = useRef(); //swiper的ref
  const posterRef = useRef(); //海报的ref
  const gameNum = useRef(0); //剩余次数
  const topRef = useRef();
  const luckTop = useRef();
  useEffect(() => {
    getShareImg();
  }, []);
  useEffect(() => {
    luckTop.current = topRef?.current?.getBoundingClientRect().top;
  }, [topRef?.current]);
  useEffect(() => {
    gameNum.current = gameBalance;
  }, [gameBalance]);
  const myLucky = useRef();
  const turnDetail = {
    blocks: [
      {
        imgs: [
          {
            src: turnImg,
            width: `${conversionWidth(264)}px`,
            height: `${conversionWidth(263)}px`,
            rotate: true,
          },
        ],
      },
    ],
    prizes: [
      { fonts: [{ text: '', top: '10%' }], background: 'transparent' },
      { fonts: [{ text: '', top: '10%' }], background: 'transparent' },
      { fonts: [{ text: '', top: '10%' }], background: 'transparent' },
      { fonts: [{ text: '', top: '10%' }], background: 'transparent' },
      { fonts: [{ text: '', top: '10%' }], background: 'transparent' },
      { fonts: [{ text: '', top: '10%' }], background: 'transparent' },
    ],
    buttons: [
      {
        radius: `${conversionWidth(40)}px`,
        background: 'transparent',
        pointer: true,
        fonts: [
          {
            text: `还剩${gameBalance}次`,
            fontSize: '10px',
            fontColor: '#FEE2B3',
            top: `${conversionWidth(10)}px`,
          },
        ],
        imgs: [
          {
            src: turnButton,
            wdith: `${conversionWidth(98)}px`,
            height: `${conversionWidth(83)}px`,
            top: `${conversionWidth(-40)}px`,
          },
        ],
      },
      {},
    ],
  };

  const getShareImg = async () => {
    const res = await fetchShareGetNewShareInfo({
      shareType: 'game',
      subType: 'gatherCard',
    });
    const { shareInfo = {} } = res.content;
    setShareImg(shareInfo.qcodeUrl);
  };

  const luckDrawEnd = async () => {
    const res = await fetchGatherLuckDraw();
    const { cardInfo = {} } = res.content;
    openModal(cardInfo);
    getGameDetail();
  };
  const makePoster = async () => {
    setTimeout(() => {
      if (deviceName() == 'miniProgram') {
        linkTo({
          wechat: {
            url: `/pages/share/shareSign/index?userType=share`,
          },
        });
      } else {
        html2canvas(posterRef.current, {
          useCORS: true,
          scale: window.devicePixelRatio < 3 ? window.devicePixelRatio : 2,
        }).then((canvas) => {
          // toImage
          let base64 = canvas.toDataURL('image/png');
          base64 = `shareType=wechat,${base64}`;
          makeReport(base64);
        });
      }
    });
  };

  return (
    <>
      {/*转盘  */}
      <div className="getCardsMode">
        <div className="cardNavigation">
          <div
            className={`cardNavigation_line ${
              checkType === 0 ? 'cardNavigation_line_check' : null
            }`}
            onClick={() => {
              setCheckType(0);
              swiperRef.current?.swipeTo(0);
            }}
          >
            <div>大转盘抽碎片</div>
          </div>
          <div
            className={`cardNavigation_line ${
              checkType === 1 ? 'cardNavigation_line_check' : null
            }`}
            onClick={() => {
              setCheckType(1);
              swiperRef.current?.swipeTo(1);
            }}
          >
            <div>邀请好友送碎片</div>
          </div>
          <div
            className={`cardNavigation_check ${
              checkType === 0 ? null : 'cardNavigation_check_left'
            }`}
          >
            {/* {CHECK_TYPE[checkType]} */}
          </div>
        </div>
        <Swiper
          indicator={() => null}
          ref={swiperRef}
          onIndexChange={(index) => {
            setCheckType(index);
          }}
        >
          <Swiper.Item>
            <div className="getCardsLeft">
              <img src={contentWord1} alt="" className="getCardsLeft_word" />
              {/* 大转盘抽奖 */}
              <div className="turnTable_turn" ref={topRef}>
                <LuckyWheel
                  ref={myLucky}
                  width={`${conversionWidth(263)}px`}
                  height={`${conversionWidth(263)}px`}
                  blocks={turnDetail.blocks}
                  prizes={turnDetail.prizes}
                  buttons={turnDetail.buttons}
                  onStart={() => {
                    // 点击抽奖按钮会触发star回调
                    // 调用抽奖组件的play方法开始游戏
                    if (gameNum.current > 0) {
                      myLucky.current.play();
                      // 模拟调用接口异步抽奖
                      setTimeout(() => {
                        // 假设后端返回的中奖索引是 0
                        const index = 0;
                        // 调用stop停止旋转并传递中奖索引
                        myLucky.current.stop(index);
                      }, 1000);
                    } else {
                      window.scrollTo({
                        top: luckTop.current,
                        behavior: 'smooth',
                      });
                      Toast.show({
                        content: '抽奖次数不足',
                      });
                    }
                  }}
                  onEnd={(prize) => {
                    // 抽奖结束会触发end回调
                    luckDrawEnd();
                  }}
                ></LuckyWheel>
              </div>
              <img src={turnBac} alt="" className="turnTable_bac" />
            </div>
          </Swiper.Item>
          <Swiper.Item>
            <div className="getCardsRight">
              <img src={contentWord2} alt="" className="getCardsRight_word" />
              <img src={reunion} alt="" className="getCardsRight_reunion" />
              <div className="getCardsRight_button" onClick={makePoster}>
                你的好运 好友承包
              </div>
            </div>
          </Swiper.Item>
        </Swiper>
      </div>
      <PosterModal ref={posterRef} gameDetail={gameDetail} shareImg={shareImg}></PosterModal>
    </>
  );
}

export default index;
