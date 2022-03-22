import React, { useState, useEffect } from 'react';
import { Mask } from 'antd-mobile';
import Lottie from 'react-lottie';
import './index.less';
import closeImg from '@public/image/close.png';

//刷
import one from './Lottie/one.json';
//视
import two from './Lottie/two.json';
//频
import three from './Lottie/three.json';
//省
import four from './Lottie/four.json';
//钱
import five from './Lottie/five.json';
//空
import empty from './Lottie/empty.json';

//背景循环动效
import back from './Lottie/back.json';

function index(props) {
  const {
    visible = {},
    countList, //计算数组
  } = props;
  const [isStopped, setIsStopped] = useState(true);
  const {
    identification,
    popFlag, //弹窗标识 0 - 抽奖 1 - 分享 2 - 转赠
    cardName, //卡的名字
    rewardFlag = '1', //是否抽中 0 - 未抽中 1 - 抽中
    username = 'XXX', //送卡人的名字
  } = visible;

  const imgIndex = rewardFlag === '1' ? identification : 6;

  useEffect(() => {
    if (visible) {
      setIsStopped(false);
    } else {
      setIsStopped(true);
    }
  }, [visible]);

  //显示的文案
  const checkTitle = () => {
    if (rewardFlag == 1) {
      if (popFlag == 0) {
        return `恭喜你获得一张碎片`;
      } else if (popFlag == 1) {
        return `邀请好友成功，送您一张碎片`;
      } else if (popFlag == 2) {
        // {cardName}卡
        return `${username}送您一张碎片`;
      }
    } else {
      return `好运正在路上，再接再厉`;
    }
  };
  return (
    <>
      <Mask visible={visible} onMaskClick={countList} forceRender={true} opacity="0.8">
        <div className="cardModal_Lottie1">
          {[one, two, three, four, five, empty].map((item, index) => (
            <div key={`${index}1`}>
              <div
                className="cardModal_animation"
                style={{ display: imgIndex - 1 == index ? 'block' : 'none' }}
              >
                <Lottie
                  options={{
                    loop: index === 5 ? false : true,
                    autoplay: true,
                    animationData: back,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice',
                    },
                  }}
                  isClickToPauseDisabled={true}
                />
              </div>
              <div
                className="cardModal_animation"
                style={{ display: imgIndex - 1 == index ? 'block' : 'none' }}
              >
                <Lottie
                  options={{
                    loop: index === 5 ? true : false,
                    autoplay: true,
                    animationData: item,
                  }}
                  isClickToPauseDisabled={true}
                  isStopped={isStopped}
                />
              </div>
            </div>
          ))}
          <div className="cardModal">
            <div className="cardModal_title">{checkTitle()}</div>
            <div className="cardModal_accept" onClick={countList}>
              {rewardFlag === '1' ? '开心收下' : '开心收下'}
            </div>
            <img src={closeImg} alt="" className="cardModal_closeImg" onClick={countList} />
          </div>
        </div>
      </Mask>
    </>
  );
}

export default index;
