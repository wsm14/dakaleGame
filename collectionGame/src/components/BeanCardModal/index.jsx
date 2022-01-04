import React, { useState, useEffect } from 'react';
import { Mask } from 'antd-mobile';
import Lottie from 'react-lottie';
import './index.less';
import closeImg from '@public/image/close.png';

//吉祥豆
import auspicious from './Lottie/auspicious';
//健康豆
import healthy from './Lottie/healthy';
//喜气豆
import euphoria from './Lottie/euphoria';
//新春豆
import newSpring from './Lottie/newSpring';
//团圆豆
import reunion from './Lottie/reunion';
//空豆
import empty from './Lottie/empty';

function index(props) {
  const {
    visible = {},
    countList, //计算数组
  } = props;
  const {
    identification,
    popFlag, //弹窗标识 0 - 抽奖 1 - 分享 2 - 转赠
    cardName = '福', //卡的名字
    rewardFlag = '1', //是否抽中 0 - 未抽中 1 - 抽中
    username = 'XXX', //送卡人的名字
  } = visible;
  const animationData =
    rewardFlag === '1'
      ? ['', auspicious, reunion, healthy, euphoria, newSpring][identification]
      : empty;
  const [autoplay, setAutoplay] = useState(false);
  useEffect(() => {
    if (visible) {
      setAutoplay(true);
    }
  }, [visible]);

  //显示的文案
  const checkTitle = () => {
    if (rewardFlag == 1) {
      if (popFlag == 0) {
        return `恭喜你获得一张${cardName}卡`;
      } else if (popFlag == 1) {
        return `邀请好友成功，送您一张${cardName}卡`;
      } else {
        return `${username}送您一张${cardName}卡`;
      }
    } else {
      return `好运正在路上，福气到家`;
    }
  };

  return (
    <>
      <Mask visible={visible} onMaskClick={countList}>
        {visible && (
          <div className="cardModal_Lottie">
            <Lottie
              options={{
                loop: true,
                autoplay: autoplay,
                animationData: animationData,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              isClickToPauseDisabled={true}
            />
            <div className="cardModal">
              <div className="cardModal_title">{checkTitle()}</div>
              <div className="cardModal_accept" onClick={countList}>
                {rewardFlag === '1' ? '开心收下' : '收下福气'}
              </div>
              <img src={closeImg} alt="" className="cardModal_closeImg" onClick={countList} />
            </div>
          </div>
        )}
      </Mask>
    </>
  );
}

export default index;
