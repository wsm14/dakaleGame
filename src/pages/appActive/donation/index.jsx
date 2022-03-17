import React, { useState, useEffect } from 'react';
import { Helmet } from 'umi';
import { Swiper } from 'antd-mobile';
import {} from '@/server/appActiveServers';
import { getToken, linkToMember, linkToPhone, linkTo } from '@/utils/birdgeContent';
import Mask1 from './components/saveBean';
import Mask2 from './components/keep';
import { backgroundObj } from '@/utils/utils';
import './index.less';
export default () => {
  const list = [];
  const [maskBean, setMaskBean] = useState(false);
  const [maskKeep, setShowKeep] = useState(false);
  const handleBean = () => {
    getToken(() => {
      setMaskBean(true);
    });
  };
  const handleKeep = () => {
    getToken(() => {
      setShowKeep(true);
    });
  };
  const indicator = (total, num) => {
    return (
      <div className="donation_swiper_indicator">
        {list.map((item, index) => {
          return (
            <div
              className={
                index === num
                  ? 'donation_indicator_margin donation_indicator_check'
                  : 'donation_indicator_noCheck donation_indicator_margin'
              }
            ></div>
          );
        })}
      </div>
    );
  };
  return (
    <>
      <Helmet>
        <title>捐赠详情</title>
      </Helmet>
      <div className="donation_box">
        <Swiper
          className="donation_swiper"
          indicator={(total, num) => {
            return indicator(total, num);
          }}
          allowTouchMove={false}
          loop
        >
          <Swiper.Item>
            <div className={'donation_swiper_info'}></div>
          </Swiper.Item>
        </Swiper>
        <div className="donation_title">项目名称：云帆计划 杨帆起航</div>
        <div className="donation_card">
          <div className="donation_card_content">
            <div className="donation_card_time">2022/03/04 09:20:38</div>
            <div className="donation_card_name">哒卡乐徐伟峰</div>
            <div className="donation_card_count">10000000000000000卡豆</div>
          </div>
        </div>
        <div className="donation_desc_info">
          <div className="donation_job_title">项目内容</div>
          <div className="donation_job_desc">
            {' '}
            儿童是祖国的花朵，承载了希望和未来。可有这样一群孩子，从小失夫了父爱母爱成为孤儿或者相当于“孤儿”。可能是一场车祸，他们永远失去了双亲;可能是重病，让他们与父母天人永隔;可能是重度残疾、犯罪、精神疾病，让他们不是孤儿，却如同孤儿………他们迷茫的眼睛又该看向何方?种种境遇让孩子们的眼睛里看到的只有黑暗，根本无法探寻到前面的路。有的孩子由家中老人抚养，老人如何颐养天年?有的孩子由亲戚轮流照看，小孩如何安放自己脆弱的心?面临困惑、困难和打击，他们可以与谁诉说?孩子是无辜的，可想而知的种种现状带给我们也是一次次的唏嘘和沉重的心境。即使得不到爸爸妈妈的爱，也让孩子们能懂得什么是爱。我们希望，用大家一束束的光，照亮他们灰暗的童年，并期以更美好的未来。杭州市红十字会联合杭红公益联盟共同发起“云帆计划”重点关注杭州市贫困散居孤儿及事实无人抚养孤儿，以及18周岁以上在校就读“大龄孤儿”以帮助孤儿享受更好的教育为重点，发动社会力量一起阴断贫困的代际传承。我们将发到爱心志愿者团队，从学业帮扶、生活共情、心理关怀、就业机会等方面出发，建立孩子的个人情况档案，长期跟踪，开展结对和其他结合各地实际的特色活动，共同促进孩子的身心健康发展。我们呼吁，社会各界一起行动起来，给予他们更多关爱和帮助，为他们带去温暖和阳光!来吧，加入我们吧!“长风破浪会有时，直挂云帆济沧海!”云帆计划，扬帆起航!让我们一起用爱给不一样的孩子一样幸福的童年!
          </div>
        </div>
        <div className="donation_btn">
          <div className="donation_btn_top">
            <div className="donation_btn_left" onClick={() => handleKeep()}>
              捐赠记录
            </div>
            <div className="donation_btn_right" onClick={() => handleBean()}>
              我要捐赠
            </div>
          </div>
          <div className="donation_btn_desc">
            用户每捐出100卡豆，哒卡乐将对应捐赠0.5元给到杭州红十字会
          </div>
        </div>
        <Mask1
          show={maskBean}
          onClose={() => {
            setMaskBean(false);
          }}
        ></Mask1>
        <Mask2
          show={maskKeep}
          onClose={() => {
            setShowKeep(false);
          }}
          list={[1, 2, 3, 4, 5, 4, 3, 2, 1]}
        ></Mask2>
      </div>
    </>
  );
};
