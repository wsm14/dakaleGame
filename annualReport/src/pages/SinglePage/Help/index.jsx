import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import Hilo, { DOMElement } from 'hilojs';
import { fetchInvitationUser, fetchGetShareUserInfo } from '@/services/single';
import { useLocation } from 'umi';
import {
  linkToHelpGood,
  linkToHelpCoupon,
  getToken,
  hideTitle,
  nativeClose,
} from '@/utils/birdgeContent';
import { reloadTab } from '@/utils/utils';
// import failSpirte from '@public/help/failSpirte.png';
// import successSpirte from '@public/help/successSpirte.png';
import './index.less';
import animation2 from '@public/help/animation2.png';
import animation3 from '@public/help/animation3.png';
import animation4 from '@public/help/animation4.png';
import headImg from '@public/help/headImg.png';
import open from './components/Lottie/open.json';

import helpSuccess from './components/Lottie/helpSuccess.json';
import helpFail from './components/Lottie/helpFail.json';
let showView = true;
const index = () => {
  const [openScale, setOpenScale] = useState(true); //是否消失动画   true --不消失   false-- 消失
  const [jsonAnimation, setJsonAnimation] = useState('success'); //  助力是否成功 success --成功  fail --失败 不是新用户
  const [helpAnimationFlag, setHelpAnimationFlag] = useState(true); //助力成功动画是否显示
  const [buttonFlag, setButtonFlag] = useState(false); //按钮是否显示
  const [userInfo, setUserInfo] = useState({}); //用户信息

  const location = useLocation();
  const { query = {} } = location;
  let {
    relateId: fissionIdString, //裂变id
    userId, //用户id
    extraParam = '', //类型
  } = query;

  useEffect(() => {
    hideTitle();
    reloadTab(() => {
      !showView && nativeClose();
      if (!sessionStorage.getItem('dakaleToken')) {
        getToken((e) => {
          if (e) {
            getUserInfo();
          }
        });
      } else {
        getUserInfo();
      }
    });
    getToken((e) => {
      if (e) {
        getUserInfo();
      }
    });
  }, []);

  //获取用户信息
  const getUserInfo = async () => {
    const res = await fetchGetShareUserInfo({
      userId,
    });
    if (res.success) {
      setUserInfo(res.content.userInfo);
    }
  };

  const createSpirte = (type) => {
    setOpenScale(false);
    setJsonAnimation(type);
    setTimeout(() => {
      setHelpAnimationFlag(false);
    }, 500);
  };
  //帮忙助力
  const openClick = async () => {
    const res = await fetchInvitationUser({
      fissionId: fissionIdString,
      userId,
    });
    if (res.success) {
      createSpirte('success');
    } else {
      if (res.resultCode == '5238') {
        createSpirte('fail');
      } else if (res.resultCode == '5242') {
        Toast.show({ content: res.resultDesc });
        nativeClose();
      }
    }
    // createSpirte('success');
  };

  //跳转到活动列表
  const goUrl = () => {
    if (extraParam === 'helpGood') {
      linkToHelpGood();
      showView = false;
    } else {
      linkToHelpCoupon();
      showView = false;
    }
  };

  return (
    <div className="helpBac">
      {helpAnimationFlag && (
        <div
          className={`helpContent  ${openScale ? 'animation' : 'animation2'}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="helpInfo">
            <img src={userInfo.profile || headImg} alt="" className="helpHeadImg" />
            <div className="helpNickName">{userInfo.username || '登陆帮帮忙'}</div>
          </div>
          <img
            src={extraParam === 'helpGood' ? animation4 : animation2}
            alt=""
            className="helpTileImg"
          />
          <div className="helpLottie" onClick={openClick}>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: open,
              }}
              isClickToPauseDisabled={true}
            />
          </div>

          {/* <img src={animation3} alt="" className="helpHandImg" onClick={openClick} /> */}
        </div>
      )}

      <div className="helpAnimation">
        {!helpAnimationFlag && (
          <Lottie
            options={{
              loop: false,
              autoplay: true,
              animationData: jsonAnimation === 'success' ? helpSuccess : helpFail,
            }}
            isClickToPauseDisabled={true}
            isStopped={helpAnimationFlag}
            eventListeners={[
              {
                eventName: 'complete',
                callback: () => {
                  setButtonFlag(true);
                },
              },
            ]}
          />
        )}

        {/* <div ref={containerRef}></div> */}
        {buttonFlag && (
          <div className="helpAnimationButton" onClick={goUrl}>
            {extraParam === 'helpGood' ? '我也要免费领' : '我也要领大额神券'}
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
