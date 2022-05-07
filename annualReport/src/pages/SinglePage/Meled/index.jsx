import React, { useState, useEffect } from 'react';
import './index.less';
import { history, useLocation, Helmet } from 'umi';
import { CapsuleTabs, Swiper } from 'antd-mobile';
import { GetDistance, openMap, computedPrice } from '@/utils/utils';
import {
  getLocation,
  deviceName,
  getToken,
  linkToMap,
  linkToBuy,
  nativeMeledShareWork,
  linkToPhone,
} from '@/utils/birdgeContent';
import {
  fetchGetMeilaiActivity,
  fetchGetUserShareCommission,
  fetchWechatTicket,
} from '@/services/report';
import VideoModal from './components/VideoModal';

import meledBg from '@public/image/meledBg.png';
import addressIcon from '@public/image/addressIcon.png';
import shareIcon1 from '@public/image/shareIcon1.png';
import phoneIcon from '@public/image/phoneIcon.png';
import meledLogo from '@public/image/meledLogo.png';
import back from '@public/image/back.png';

const index = () => {
  const [city, setcity] = useState({});
  const [meledDetail, setMeledDetail] = useState({});
  const [protion, setProtion] = useState(); //哒人比例
  const [tabKeys, setTabKeys] = useState(0);
  const [videoVisible, setVideoVisible] = useState(false);

  const { query } = useLocation();
  const { identification, shareKey } = query;

  useEffect(() => {
    if (['dakaleIOS', 'dakaleAndroid', 'miniProgram'].includes(deviceName())) {
      getToken((res) => {
        if (res) {
        }
      });
      getLocation(setcity);
    }
    getDetail();
    getPortion();
    exSdk();
  }, []);

  const {
    activityGoodsDTOList = [], //套餐信息
    payBeanCommission, //抵扣比例
    userMerchantInfo = {}, //店铺信息
  } = meledDetail;
  //获取页面详情
  const getDetail = async () => {
    const res = await fetchGetMeilaiActivity({ identification });
    if (res.success) {
      setMeledDetail(res.content);
    }
  };

  const exSdk = async () => {
    if (deviceName() === 'wxChatWebView') {
      const res = await fetchWechatTicket({ url: location.href.split('#')[0] });
      if (res.success) {
        const data = res.content;
        wx.config({
          debug: false, // 如果分享失败，把0改成1开启错误提示看看
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: ['wx-open-subscribe'],
          openTagList: ['wx-open-launch-weapp'],
        });
      }
    }
  };

  //获取哒人比例

  const getPortion = async () => {
    const res = await fetchGetUserShareCommission();
    if (res.success) {
      const { configUserLevelInfo = {} } = res.content;
      setProtion(configUserLevelInfo.shareCommission);
    }
  };

  //去看地图
  const goMap = () => {
    if (deviceName() === 'miniProgram' || deviceName() === 'wxChatWebView') {
      openMap(userMerchantInfo.lat, userMerchantInfo.lnt, userMerchantInfo.address);
    } else {
      linkToMap(userMerchantInfo);
    }
  };

  //去购买
  const goBuy = () => {
    const specialActivityId = activityGoodsDTOList[tabKeys].activityIdString;
    const merchantId = activityGoodsDTOList[tabKeys].ownerIdString;
    const ownerId = activityGoodsDTOList[tabKeys].ownerIdString;
    linkToBuy({ specialActivityId, merchantId, ownerId, payBeanCommission });
  };

  //分享给好友
  const shareFriends = () => {
    nativeMeledShareWork(shareKey);
  };

  //切换胶囊卡
  const onChangeTabs = (key) => {
    setTabKeys(key);
  };

  //立即购买的Dom

  const buyDom = () => {
    return (
      <div className="footer_buy" onClick={goBuy}>
        立即购买
      </div>
    );
  };

  const getTitle = (item, index) => {
    return (
      <div className="setmeal_item">
        <div>{['玻尿酸填充', '光子嫩肤', '瘦脸提拉', '电眼美眸', '牙齿矫正'][index]}</div>
        <div className="setmeal_item_price">
          ¥ <span>{parseInt(item.realPrice)}</span>
        </div>
      </div>
    );
  };

  const path = `pages/goods/favourOrder/index.html?merchantId=${activityGoodsDTOList[tabKeys]?.ownerIdString}&specialActivityId=${activityGoodsDTOList[tabKeys]?.activityIdString}&identification=${payBeanCommission}`;

  return (
    <div className="content">
      {/* <Helmet>
        <title>商品详情</title>
      </Helmet> */}
      {/* {['dakaleIOS', 'dakaleAndroid'].includes(deviceName()) && (
        <img src={back} alt="" className="backImg" onClick={nativeClose} />
      )} */}
      <div className="contentTop">
        <img src={meledBg} alt="" />
        <div
          className="contentTop_go"
          onClick={() => {
            history.push('/brandInfo');
          }}
        >
          品牌介绍
        </div>
      </div>
      <div className="store">
        <div className="store_info">
          <img src={meledLogo} alt="" className="store_img" />
          <div className="store_intru">
            <div className="store_name">{userMerchantInfo.merchantName}</div>
            <div className="store_time">营业时间：周一至周五{userMerchantInfo.businessTime}</div>
          </div>
        </div>
        <div className="store_line"></div>
        <div className="store_direction">
          <div className="store_address">
            {['dakaleIOS', 'dakaleAndroid', 'miniProgram'].includes(deviceName()) &&
              `商家地址：距您
            ${GetDistance(userMerchantInfo.lat, userMerchantInfo.lnt, city.lat, city.lnt)}m｜`}
            {userMerchantInfo.address}
          </div>
          <div className="store_navigation" onClick={goMap}>
            <img src={addressIcon} alt="" />
            导航
          </div>
        </div>
      </div>

      <div className="setmeal">
        <CapsuleTabs defaultActiveKey="0" onChange={onChangeTabs}>
          {activityGoodsDTOList.map((item, index) => (
            <CapsuleTabs.Tab title={getTitle(item, index)} key={index}>
              <div className="setmeal_padding">
                <div className="setmeal_swiper">
                  <Swiper
                    indicatorProps={{
                      color: 'white',
                    }}
                    autoplay
                    loop
                  >
                    {item.activityGoodsImg.split(',').map((item, index) => (
                      <Swiper.Item key={index + 1}>
                        <img src={item} alt="" className="setmeal_swiper_img" key={index + 1} />
                      </Swiper.Item>
                    ))}
                  </Swiper>
                </div>
                <div className="setmeal_name">{item.goodsName}</div>
                <div className="setmeal_price">
                  <div className="setmeal_discountPrice">
                    优惠价: <span>¥{item.realPrice}</span>
                  </div>
                  <div className="setmeal_originalPrice">
                    原价: <span>¥{item.oriPrice}</span>
                  </div>
                </div>
                <div className="setmeal_label">
                  <div className="setmeal_label_item">
                    省<span>¥{computedPrice(item.realPrice, payBeanCommission)}</span>
                  </div>
                  {protion > 0 && (
                    <div className="setmeal_label_item">
                      赚<span>¥{computedPrice(item.realPrice, protion)}</span>
                    </div>
                  )}
                </div>
              </div>
              {item.goodsType === 'package' && (
                <div className="setmealInfo">
                  <div className="modular_title">套餐详情</div>
                  {item.packageGroupObjects ||
                    [].map((item) => {
                      const { packageGoodsObjects = [], groupName } = item;
                      return (
                        <div className="setmealInfo_item">
                          <div className="setmealInfo_item_title">· groupName</div>
                          {packageGoodsObjects.map((val) => {
                            const { goodsName, goodsNum, goodsPrice } = val;
                            return (
                              <div className="setmealInfo_item_info">
                                <div>
                                  {goodsName}（{goodsNum}次）
                                </div>
                                <div>¥{goodsPrice}</div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                </div>
              )}
              {item.goodsDesc ||
                (item.goodsDescImg && (
                  <div className="goodGescribe">
                    <div className="modular_title">商品描述</div>
                    {item.goodsDesc && (
                      <div className="goodGescribe_content">
                        {item.goodsDesc.replace(/\\n/g, '\n')}
                      </div>
                    )}
                    {item.goodsDescImg && (
                      <div className="goodGescribe_content">
                        {item.goodsDescImg.split(',').map((item, index) => (
                          <img
                            mode="widthFix"
                            src={item}
                            style={{ width: '100%' }}
                            key={index + 1}
                          ></img>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </CapsuleTabs.Tab>
          ))}
        </CapsuleTabs>
      </div>

      <div className="footer">
        <div className="footer_left">
          {/* {!['dakaleIOS', 'dakaleAndroid'].includes(deviceName()) && ( */}
          <div
            className="footer_left_style"
            onClick={() => {
              window.location.href = 'tel:4000876600-0761';
            }}
          >
            <img src={phoneIcon} alt="" />
            <div>电话预约</div>
          </div>
          {/* )} */}
          {['dakaleIOS', 'dakaleAndroid'].includes(deviceName()) && (
            <div className="footer_left_style" onClick={shareFriends}>
              <img src={shareIcon1} alt="" />
              <div>推荐给朋友</div>
            </div>
          )}
        </div>
        <div style={{ width: '50%' }}>
          {['wxChatWebView'].includes(deviceName()) ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {buyDom()}
              <div
                dangerouslySetInnerHTML={{
                  __html: `<wx-open-launch-weapp username="gh_7ffa23a2dcd1" path="${path}" style="position: absolute; width: 100%; height: 100%;top: 0;">
                  <template>
                    <div style="position: absolute; width: 100%; height: 100%;z-index: 10 background-color: #333333;"></div></template></wx-open-launch-weapp>`,
                }}
              ></div>
            </div>
          ) : (
            buyDom()
          )}
        </div>
      </div>

      {/* 视频弹窗 */}
      <VideoModal
        visible={videoVisible}
        onClose={() => {
          setVideoVisible(false);
        }}
      ></VideoModal>
    </div>
  );
};

export default index;
