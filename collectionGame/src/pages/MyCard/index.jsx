import React, { useState } from 'react';
import './index.less';
import { history } from 'umi';
import Cloud from '@/components/Cloud';
import TitleBlock from '@/components/TitleBlock';
import lantern from '@public/loading/lantern.png';
import card1 from '@public/loading/card1.png';

function index() {
  const [cardInfo, setCardInfo] = useState({});
  //选择卡
  const checkCard = (item) => {
    setCardInfo(item);
  };
  //合成卡
  const closeCard = () => {
    console.log(111);
  };

  //点击返回按钮
  const goBack = () => {
    history.goBack();
  };
  return (
    <>
      {/* 标题栏 */}
      <TitleBlock type="title" back={goBack}></TitleBlock>
      <div className="myCard">
        {/* 上方图片 */}
        <div className="myCard_topImg">
          <img src={lantern} alt="" />
        </div>
        {/* 下方内容 */}
        <div className="myCard_content">
          {/* 我的福豆 */}
          <div className="myCardInfo">
            <div className="myCardInfo_num">178,541人已集齐，1月31日 22:00开奖</div>
            <div className="myCardInfo_center">
              <img src={card1} alt="" className="myCardInfo_center_img" />
              {/* <div className="openPrize">
              <div className="openPrize_time">1月31日 22:00开奖</div>
              <div className="openPrize_open"></div>
            </div> */}
              {/* <div className="alreadyOpen">
              <div className="alreadyOpen_money">
                188.88<span>元</span>
              </div>
              <div className="alreadyOpen_bean">18888卡豆已存入卡豆账户</div>
            </div> */}
            </div>
            <div className="myCardInfo_area">
              <div className="myCardInfo_shareFriends">转赠好友</div>
            </div>

            <div className="myCardInfo_mation">
              {[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 5 }].map((item) => (
                <div
                  className={`beanCard ${cardInfo.id === item.id ? 'beanCard_border' : null}`}
                  onClick={() => {
                    checkCard(item);
                  }}
                >
                  <div className="beanCard_width">
                    <img src={card1} className="beanCard_img" />
                    <div className="beanCard_num">
                      <div>2</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="myCardInfo_synthesis" onClick={closeCard}>
              合成福豆卡
            </div>
            {/* <div className="myCardInfo_alreadySynthesis">恭喜您已合成</div> */}
          </div>
        </div>
      </div>
      <Cloud></Cloud>
    </>
  );
}

export default index;
