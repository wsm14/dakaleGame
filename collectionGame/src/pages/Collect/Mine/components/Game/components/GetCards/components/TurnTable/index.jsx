import React, { useState, useRef, useEffect } from 'react';
import { LuckyWheel } from '@lucky-canvas/react';
import './index.less';
import { Toast } from 'antd-mobile';
import html2canvas from 'html2canvas';
import { fetchGatherLuckDraw } from '@/services/game';
import { conversionWidth } from '@/utils/game';
import PosterModal from '@/components/PosterModal';
import contentWord1 from '@public/loading/contentWord1.png';
import contentWord2 from '@public/loading/contentWord2.png';
import turnImg from '@public/loading/turn.png';
import turnButton from '@public/loading/turnButton.png';
import reunion from '@public/loading/reunion.png';
import turnBac from '@public/loading/turnBac.png';

function index(props) {
  const { openModal, gameBalance, getGameDetail } = props;
  const posterRef = useRef(); //海报的ref
  const gameNum = useRef(0); //剩余次数
  useEffect(() => {
    gameNum.current = gameBalance;
  }, [gameBalance]);
  const [checkType, setCheckType] = useState('turntable'); //导航类型 turntable--转盘  share--分享;
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
            fontSize: '8px',
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

  const luckDrawEnd = async () => {
    const res = await fetchGatherLuckDraw();
    const { cardInfo = {} } = res.content;
    openModal(cardInfo);
    getGameDetail();
  };

  const makePoster = () => {
    console.log(posterRef.current);
    html2canvas(posterRef.current, {
      allowTaint: false,
      useCORS: true,
    }).then(function (canvas) {
      // toImage
      const base64 = canvas.toDataURL('image/png');
      // // base64转换blob
      const arr = base64.split(',');
      console.log(base64);
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      // eslint-disable-next-line no-plusplus
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const fileblob = new Blob([u8arr], { type: mime });
      URL.createObjectURL(fileblob);
      // makeB(URL.createObjectURL(fileblob));
      console.log('file', URL.createObjectURL(fileblob));
      // const alink = document.createElement('a');
      // alink.href = dataImg.src;
      // alink.download = 'testImg.jpg';
      // console.log(dataImg);
      // alink.click();
    });
  };

  return (
    <>
      {/*转盘  */}
      <div className="getCardsMode">
        <div className="cardNavigation">
          <div
            className={`cardNavigation_line ${
              checkType === 'turntable' ? 'cardNavigation_line_check' : null
            }`}
            onClick={() => {
              setCheckType('turntable');
            }}
          >
            转福盘抽福豆
          </div>
          <div
            className={`cardNavigation_line ${
              checkType === 'share' ? 'cardNavigation_line_check' : null
            }`}
            onClick={() => {
              setCheckType('share');
            }}
          >
            邀请好友送福豆
          </div>
          {/* <div
            className={`cardNavigation_check ${
              checkType === 'turntable' ? null : 'cardNavigation_check_left'
            }`}
          >
            {CHECK_TYPE[checkType]}
          </div> */}
        </div>
        {checkType === 'turntable' ? (
          <div className="getCardsLeft">
            <img src={contentWord1} alt="" className="getCardsLeft_word" />
            {/* 大转盘抽奖 */}
            <div className="turnTable_turn">
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
                  console.log(gameNum.current, myLucky.current);
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
        ) : (
          <div className="getCardsRight">
            <img src={contentWord2} alt="" className="getCardsRight_word" />
            <img src={reunion} alt="" className="getCardsRight_reunion" />
            <div className="getCardsRight_button" onClick={makePoster}>
              邀请好友送福豆
            </div>
          </div>
        )}
      </div>
      <PosterModal ref={posterRef}></PosterModal>
    </>
  );
}

export default index;
