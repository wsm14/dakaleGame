import React, { useState, useEffect } from 'react';
import './index.less';
import { useLocation } from 'umi';
import {
  fetchUserShareCommission,
  fetchGetFissionTemplate,
  fetchReceiveReward,
  fetchCommandGetCommand,
} from '@/services/single';
import { useTimer } from '@/hooks/useTime';
import CopyCode from './components/CopyCode';
import BottomContent from '@/components/BottomContent';
import TitleBlock from '@/components/TitleBlock';
import ReceiveCoupon from './components/ReceiveCoupon';
import { getToken, linkToGoods, nativeClose, hideTitle, linkToCoupon } from '@/utils/birdgeContent';
import { reloadTab, filterList, cobyInfo, backgroundObj } from '@/utils/utils';
import { GOODS_TYPE } from '@/common/report';

import logo from '@public/help/logo.png';
import free7 from '@public/help/free7.png';
import free8 from '@public/help/free8.png';
import free9 from '@public/help/free9.png';

const index = () => {
  const [userInfo, setUserInfo] = useState({}); //用户抵扣信息
  const [detail, setDetail] = useState({}); //页面详情
  const [copyCode, setCopyCode] = useState(false); //邀请弹窗
  const [couponBol, setCouponBol] = useState(false); //领取券弹窗

  const location = useLocation();
  const { query = {} } = location;
  const { fissionId: fissionIdString = '1549682624574652418' } = query;

  const {
    isCanReceive, //是否可以领取奖励
    hasReceived, //是否已经领取奖励
    hasHelpCount, //已经助力的数量
    inviteNum, //需要邀请的数量
    activityRuleUrl, //活动规则链接
    introductionImg,
    platformCoupon = {}, //平台券详情
    helpUsers = [],
    fissionId,
    activityEndTime,
    mainImg,
    backgroundColor,
    prizeImg,
    remain = 0, //剩余库存
  } = detail;
  const [time, setTime] = useTimer(new Date(activityEndTime).getTime());

  useEffect(() => {
    hideTitle();
    reloadTab(() => {
      if (!sessionStorage.getItem('dakaleToken')) {
        getTokenFn();
      }
    });
    getTokenFn();
  }, []);

  const getTokenFn = () => {
    getToken((e) => {
      if (e) {
        fetchUserShare();
        fetchGetDetail();
      }
    });
  };
  //跳转到我的奖品
  const goUrl = () => {
    linkToGoods('fissionHelp');
  };

  //获取页面详情
  const fetchGetDetail = async () => {
    const res = await fetchGetFissionTemplate({
      fissionId: fissionIdString,
    });
    const { content = {} } = res;
    const { fissionTemplateInfo = {} } = content;
    let { helpUsers = [], inviteNum, activityEndTime } = fissionTemplateInfo;
    helpUsers = filterList(helpUsers, inviteNum);
    if (activityEndTime) {
      activityEndTime = activityEndTime.replace(/\-/g, '/');
    }
    console.log(activityEndTime, new Date(activityEndTime));
    setDetail({ ...fissionTemplateInfo, helpUsers, activityEndTime });
  };
  //获取卡豆抵扣
  const fetchUserShare = () => {
    fetchUserShareCommission({}).then((val = {}) => {
      if (val) {
        const { content = {} } = val;
        const { configUserLevelInfo = {} } = content;
        setUserInfo({ ...configUserLevelInfo });
      }
    });
  };

  //领取券
  const fetchReceive = async () => {
    const res = await fetchReceiveReward({
      fissionId,
    });
    if (res.success) {
      setCouponBol(true);
    }
  };

  //生成口令
  const shareCoupon = async () => {
    const res = await fetchCommandGetCommand({
      commandType: 'fissionHelp',
      relateId: fissionId,
      extraParam: 'helpCoupon',
    });
    const { command } = res.content;
    cobyInfo(command, {}, (val) => {
      setCopyCode(true);
    });
  };

  //判断显示什么按钮

  const checkButton = () => {
    if (hasReceived === '1') {
      return (
        <div
          className="couponBag"
          onClick={() => {
            linkToCoupon();
          }}
        >
          查看券包
        </div>
      );
    }

    if (remain == 0) {
      return <div className="couponfreeButton color3">来晚了 已抢完</div>;
    } else {
      if (isCanReceive === '1') {
        if (hasReceived === '0') {
          return (
            <div className="couponfreeButton color2" onClick={fetchReceive}>
              立即领神券
            </div>
          );
        }
      } else {
        return (
          <div className="couponfreeButton color1" onClick={shareCoupon}>
            分享抢券
          </div>
        );
      }
    }
  };

  return (
    <>
      <div className="couponTop" style={backgroundObj(mainImg)}>
        <TitleBlock
          title="分享规则"
          titleClick={() => {
            window.location.href = `${activityRuleUrl}?newPage=true&&showTitle=true`;
          }}
          back={nativeClose}
        ></TitleBlock>
        <div className="couponTopContent">
          <div className="couponTime">
            <div className="couponTime_last">{time}</div>
          </div>
          <div className="couponContent">
            <div className="couponBac">
              <img src={prizeImg} alt="" className="couponPrizeImg" />
              {/* <div className="couponLeft">
                <div className="couponPrice">¥{platformCoupon.couponValue}</div>
                <div className="couponLimit">满{platformCoupon.thresholdPrice}可用</div>
              </div>
              <div className="couponMiddle"></div>
              <div className="couponRight">
                <div className="couponName">{platformCoupon.couponName}</div>
                <div className="couponValidity">
                  {platformCoupon.useTimeRule === 'fixed'
                    ? `${platformCoupon.activeDate}至${platformCoupon.endDate}`
                    : `领取后${platformCoupon.activeDays}内`}
                </div>
                <div className="couponLabel">
                  仅可购买{GOODS_TYPE[platformCoupon.useScenesType]}商品
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="couponBottom" style={{ background: backgroundColor }}>
        <div className="couponfree">
          <div className="freeTitle">
            <img src={free7} alt="" />
            <div className="freeTitleNum">
              {hasHelpCount === inviteNum ? (
                '助力成功'
              ) : (
                <>
                  还差<span>{inviteNum - hasHelpCount}位</span>获得神券
                </>
              )}
            </div>
            <img src={free9} alt="" />
          </div>

          {/* 邀请人头像 */}
          <div className="freePeople">
            {helpUsers.map((item, index) => (
              <img src={item.profile || free8} alt="" key={index + 1} />
            ))}
          </div>
          {checkButton()}
        </div>

        {introductionImg && (
          <div className="freeActivity">
            {/* <div className="freeActivity_title">活动介绍图</div> */}
            {/* <div dangerouslySetInnerHTML={{ __html: introductionImg }}></div> */}
            <img src={introductionImg} alt="" />
          </div>
        )}

        <BottomContent userInfo={userInfo}></BottomContent>
        <img src={logo} alt="" className="bottomIcon" />
      </div>

      {/* 口令弹窗 */}
      <CopyCode
        visible={copyCode}
        onClose={() => {
          setCopyCode(false);
        }}
      ></CopyCode>

      <ReceiveCoupon
        visible={couponBol}
        onClose={() => {
          setCouponBol(false);
        }}
        platformCoupon={platformCoupon}
        fetchGetDetail={fetchGetDetail}
      ></ReceiveCoupon>
    </>
  );
};

export default index;
