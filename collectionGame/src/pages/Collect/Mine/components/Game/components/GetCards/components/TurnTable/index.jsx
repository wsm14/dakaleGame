import React, { useState, useRef } from 'react';
import { LuckyWheel } from '@lucky-canvas/react';
import './index.less';
import { CHECK_TYPE } from '@/common/goods';
import { conversionWidth } from '@/utils/game';
import contentWord1 from '@public/loading/contentWord1.png';
import contentWord2 from '@public/loading/contentWord2.png';
import turnImg from '@public/loading/turn.png';
import turnButton from '@public/loading/turnButton.png';
import reunion from '@public/loading/reunion.png';
import turnBac from '@public/loading/turnBac.png';

function index() {
  const [checkType, setCheckType] = useState('turntable'); //导航类型 turntable--转盘  share--分享;
  const [number, setNumber] = useState(5);
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
            text: `还剩${number}次`,
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
                  myLucky.current.play();
                  // 模拟调用接口异步抽奖
                  setTimeout(() => {
                    // 假设后端返回的中奖索引是 0
                    const index = 0;
                    setNumber((val) => val - 1);
                    // 调用stop停止旋转并传递中奖索引
                    myLucky.current.stop(index);
                  }, 2500);
                }}
                onEnd={(prize) => {
                  // 抽奖结束会触发end回调
                  console.log(prize);
                }}
              ></LuckyWheel>
            </div>
            {/* <div className="remainTimes">
              <div className="remainTimes_prize">抽奖</div>
              <div className="remainTimes_num">还剩2次</div>
            </div> */}
            <img src={turnBac} alt="" className="turnTable_bac" />
          </div>
        ) : (
          <div className="getCardsRight">
            <img src={contentWord2} alt="" className="getCardsRight_word" />
            <img src={reunion} alt="" className="getCardsRight_reunion" />
            <div className="getCardsRight_button">邀请好友送福豆</div>
          </div>
        )}
      </div>
    </>
  );
}

export default index;
