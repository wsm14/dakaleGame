import React, { useState, useEffect } from 'react';
import './index.less';
import { useSelector, useDispatch, useLocation, Helmet } from 'umi';
import {
  fetchUserShareCommission,
  fetchGetFissionTemplate,
  fetchCommandGetCommand,
} from '@/services/single';
import { useTimer } from '@/hooks/useTime';
import OrderModal from '@/components/OrderModal';
import CopyCode from '../Coupon/components/CopyCode';
import SuccessModal from './components/SuccessModal';
import BottomContent from '@/components/BottomContent';
import { getToken, linkToGoods } from '@/utils/birdgeContent';
import { reloadTab, filterList, cobyInfo, backgroundObj } from '@/utils/utils';

import free1 from '@public/help/free1.png';
import free2 from '@public/help/free2.png';
import free3 from '@public/help/free3.png';
import free5 from '@public/help/free5.png';
import free7 from '@public/help/free7.png';
import free8 from '@public/help/free8.png';
import free9 from '@public/help/free9.png';
import bottomIcon from '@public/help/logo.png';

const index = () => {
  const [userInfo, setUserInfo] = useState({}); //用户抵扣信息
  const [detail, setDetail] = useState({}); //页面详情
  const { addressBol } = useSelector((state) => state.receiveGoods); //商品信息  地址信息
  const [successBol, setSuccessBol] = useState(false); //成功领取弹窗
  const [copyCode, setCopyCode] = useState(false); //邀请弹窗
  const {
    isCanReceive, //是否可以领取奖励
    hasReceived, //是否已经领取奖励
    hasHelpCount, //已经助力的数量
    inviteNum, //需要邀请的数量
    mainImg,
    backgroundColor,
    activityRuleUrl, //活动规则链接
    introductionImg,
    onlineGoods = {}, //裂变电商品详情
    helpUsers = [],
    fissionId,
    activityEndTime,
    prizeImg,
    remain = 0, //剩余库存
  } = detail;
  const [time, setTime] = useTimer(new Date(activityEndTime).getTime());
  const dispatch = useDispatch();

  const location = useLocation();
  const { query = {} } = location;
  const { fissionId: fissionIdString = '1549676252671926273' } = query;

  useEffect(() => {
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

  //跳转到我的奖品
  const goUrl = () => {
    linkToGoods('fissionHelp');
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
  //生成口令
  const shareCoupon = async () => {
    const res = await fetchCommandGetCommand({
      commandType: 'fissionHelp',
      relateId: fissionId,
      extraParam: 'helpGood',
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
        <div className="freeGood_receive" onClick={goUrl}>
          查看我的奖品
        </div>
      );
    }

    if (remain == 0) {
      return <div className="freeGood_remain">来晚了 已抢完</div>;
    } else {
      if (isCanReceive === '1') {
        if (hasReceived === '0') {
          return (
            <div
              className="freeGood_receive"
              onClick={() => {
                dispatch({
                  type: 'receiveGoods/save',
                  payload: {
                    addressBol: true,
                  },
                });
              }}
            >
              立即领取
            </div>
          );
        }
      } else {
        return (
          <div className="freeGood_receive" onClick={shareCoupon}>
            立即邀请
          </div>
        );
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>哒卡乐翻天</title>
      </Helmet>
      <div className="topImg" style={backgroundObj(mainImg)}></div>
      <img
        src={free3}
        alt=""
        className="freeRules"
        onClick={() => {
          window.location.href = `${activityRuleUrl}?newPage=true&&showTitle=true`;
        }}
      />
      {/* <img src={free2} alt="" className="freeShare" onClick={shareCoupon} /> */}

      <div className="freeContent" style={{ background: backgroundColor }}>
        <div className="freeGood">
          {/* 倒计时 */}
          <div className="freeGood_time">距结束：{time}</div>

          <img src={prizeImg} alt="" className="freeGood_img" />
          <div className="freeTitle">
            <img src={free7} alt="" />
            <div className="freeTitleNum">
              {hasHelpCount === inviteNum ? (
                '恭喜助力成功'
              ) : (
                <>
                  邀请<span>{inviteNum}位</span>新用户 即可免费获得
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
          <div className="freeGood_phone">
            如有疑问，请联系客服：
            <span
            // onClick={() => {
            //   window.location.href = 'tel:400-800-5881';
            // }}
            >
              400-800-5881
            </span>
          </div>
        </div>

        {introductionImg && (
          <div className="freeActivity">
            {/* <div className="freeActivity_title">活动介绍图</div> */}
            {/* <div dangerouslySetInnerHTML={{ __html: introductionImg }}></div> */}
            <img src={introductionImg} alt="" />
          </div>
        )}

        <BottomContent userInfo={userInfo}></BottomContent>
        <img src={bottomIcon} alt="" className="bottomIcon" />
      </div>

      {/* 填写地址弹窗 */}
      <OrderModal
        visible={addressBol}
        onClose={() => {
          dispatch({
            type: 'receiveGoods/save',
            payload: {
              addressBol: false,
            },
          });
        }}
        goodDetail={onlineGoods}
        fissionId={fissionId}
        fetchGetDetail={fetchGetDetail}
        openSuccess={() => {
          setSuccessBol(true);
        }}
      ></OrderModal>

      {/* 邀请弹窗 */}
      <CopyCode
        visible={copyCode}
        onClose={() => {
          setCopyCode(false);
        }}
      ></CopyCode>

      {/* 恭喜弹窗 */}
      <SuccessModal
        visible={successBol}
        goodsImg={onlineGoods.goodsImg}
        onClose={() => {
          setSuccessBol(false);
        }}
      ></SuccessModal>
    </>
  );
};

export default index;
