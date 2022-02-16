import React, { useEffect, useState } from 'react';
import { Swiper } from 'antd-mobile';
import { getLocation, linkTo } from '@/utils/birdgeContent';
import { fetchFilterType, fetchSelfTourGoods, fetchRightGoods } from '@/services/game';
import { GetDistance, computedPrice, backgroundObj } from '@/utils/utils';
import './index.less';
import classNames from 'classnames';
export default ({ userInfo }) => {
  const [city, setcity] = useState(null);
  const [bannerList, setBannerList] = useState([]);
  const [hotList, setHotList] = useState([]);
  const [beanList, setBeanList] = useState([]);
  const [gameList, setGameList] = useState([]);
  const { payBeanCommission = 50, shareCommission = 0 } = userInfo;

  useEffect(() => {
    getLocation(setcity);
  }, []);
  useEffect(() => {
    if (city) {
      fetchSpecialGoods(city);
      fetchSelfGoods(city);
      fetchRight(city);
    }
  }, [city]);
  const fetchSpecialGoods = (city) => {
    const { lat, lnt, city_code } = city;
    fetchFilterType(
      {
        page: 1,
        limit: 2,
        specialFilterType: 'aroundSpecial',
      },
      {
        lat,
        lnt,
        'city-code': city_code,
      },
    ).then((val) => {
      if (val) {
        const { specialGoodsList = [] } = val.content;
        setHotList(specialGoodsList);
      }
    });
  };
  const fetchRight = (city) => {
    const { lat, lnt, city_code } = city;
    fetchRightGoods(
      {
        page: 1,
        limit: 2,
      },
      {
        lat,
        lnt,
        'city-code': city_code,
      },
    ).then((val) => {
      if (!val) return;
      const { specialGoodsList = [] } = val.content;
      setBeanList(specialGoodsList);
    });
  };
  const fetchSelfGoods = (city) => {
    const { lat, lnt, city_code } = city;
    fetchSelfTourGoods(
      {
        page: 1,
        limit: 2,
      },
      {
        lat,
        lnt,
        'city-code': city_code,
        device: 'weChat',
      },
    ).then((val) => {
      if (val) {
        const { selfTourGoodList = [] } = val.content;
        setGameList(selfTourGoodList);
      }
    });
  };
  //获取特惠列表
  // const templateActive = (item) => {
  //   const {
  //     commission,
  //     goodsImg,
  //     goodsName,
  //     merchantName,
  //     lat,
  //     lnt,
  //     merchantLogo,
  //     oriPrice,
  //     realPrice,
  //     ownerIdString,
  //     specialActivityIdString,
  //     paymentModeObject,
  //   } = item;
  //   const { bean, cash, type = 'defaultMode' } = paymentModeObject;
  //   return (
  //     <div
  //       className="bottom_shop_box"
  //       onClick={() => {
  //         Router({
  //           routerName: 'favourableDetails',
  //           args: {
  //             merchantId: ownerIdString,
  //             specialActivityId: specialActivityIdString,
  //           },
  //         });
  //       }}
  //       key={specialActivityIdString}
  //     >
  //       <div className="bottom_shop_img" style={backgroundObj(goodsImg)}></div>
  //       <div className="bottom_shop_content">
  //         <div className="bottom_shop_goodsName font_noHide">{goodsName}</div>
  //         {type !== 'defaultMode' ? (
  //           <>
  //             <div className="bottom_shop_oldPrice1">
  //               <div className="bottom_shop_oldLabel">原价:</div>
  //               <div className="bottom_shop_oldcout">¥{oriPrice}</div>
  //             </div>
  //             <div className="bottom_qy_price font_hide">
  //               <div className="bottom_qy_label">卡豆价:</div>
  //               <div className="bottom_qy_bean">
  //                 ¥{cash}+{bean}卡豆
  //               </div>
  //             </div>
  //           </>
  //         ) : (
  //           <>
  //             {' '}
  //             <div className="bottom_shop_realPrice">
  //               <div className="bottom_shop_realLabel">优惠价:</div>
  //               <div className="bottom_shop_price">¥{realPrice}</div>
  //             </div>
  //             <div className="bottom_shop_oldPrice">
  //               <div className="bottom_shop_oldLabel">原价:</div>
  //               <div className="bottom_shop_oldcout">¥{oriPrice}</div>
  //             </div>
  //             <div className="bottom_kol_info">
  //               <div className="bottom_kol_s">
  //                 <div className="bottom_kol_bean">
  //                   ¥{computedPrice(realPrice, payBeanCommission)}
  //                 </div>
  //               </div>
  //               {shareCommission > 0 && commission > 0 && (
  //                 <div className="bottom_kol_z font_hide">
  //                   <div className="bottom_kol_money font_hide">
  //                     ¥{computedPrice(commission, shareCommission)}
  //                   </div>
  //                 </div>
  //               )}
  //             </div>
  //           </>
  //         )}
  //       </div>
  //     </div>
  //   );
  // };
  const template = (item) => {
    const {
      commission,
      goodsImg,
      goodsName,
      merchantName,
      lat,
      lnt,
      merchantLogo,
      oriPrice,
      realPrice,
      ownerIdString,
      specialActivityIdString,
    } = item;
    return (
      <div
        className="bottom_shop_box"
        key={specialActivityIdString}
        onClick={() => {
          linkTo({
            ios: {
              path: 'DKLAroundDiscountGoodsDetailViewController',
              param: { specialActivityId: specialActivityIdString, ownerId: ownerIdString },
            },
            android: {
              path: 'AroundGood',
              specialActivityId: specialActivityIdString,
              ownerId: ownerIdString,
            },
            wechat: {
              url: `/pages/perimeter/favourableDetails/index?merchantId=${ownerIdString}&specialActivityId=${specialActivityIdString}`,
            },
          });
        }}
      >
        <div className="bottom_shop_img" style={backgroundObj(goodsImg)}></div>
        <div className="bottom_shop_content">
          <div className="bottom_shop_goodsName font_noHide">{goodsName}</div>
          <div className="bottom_shop_user font_hide">
            <div
              className={classNames('bottom_shop_profile', !merchantLogo && 'merchant_dakale_logo')}
              style={backgroundObj(merchantLogo)}
            ></div>
            <div className="bottom_shop_name font_hide">{merchantName}</div>
            <div className="bottom_shop_limit">｜{GetDistance(lat, lnt, city.lat, city.lnt)}</div>
          </div>
          <div className="bottom_shop_realPrice">
            <div className="bottom_shop_realLabel">优惠价:</div>
            <div className="bottom_shop_price">¥{realPrice}</div>
          </div>
          <div className="bottom_shop_oldPrice">
            <div className="bottom_shop_oldLabel">原价:</div>
            <div className="bottom_shop_oldcout">¥{oriPrice}</div>
          </div>
          <div className="bottom_kol_info">
            <div className="bottom_kol_s">
              <div className="bottom_kol_bean">¥{computedPrice(realPrice, payBeanCommission)}</div>
            </div>
            {shareCommission > 0 && commission > 0 && (
              <div className="bottom_kol_z font_hide">
                <div className="bottom_kol_money font_hide">
                  ¥{computedPrice(commission, shareCommission)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  const templateRight = (item) => {
    const {
      commission,
      goodsImg,
      ownerIdString,
      goodsName,
      merchantName,
      lat,
      lnt,
      merchantLogo,
      oriPrice,
      realPrice,
      merchantIdString,
      specialActivityIdString,
      paymentModeObject = {},
    } = item;
    const { bean, cash } = paymentModeObject;
    return (
      <div
        className="bottom_shop_box"
        key={specialActivityIdString}
        onClick={() => {
          linkTo({
            ios: {
              path: 'DKLAroundDiscountGoodsDetailViewController',
              param: { specialActivityId: specialActivityIdString, ownerId: ownerIdString },
            },
            android: {
              path: 'BeanPrefectureGood',
              specialActivityId: specialActivityIdString,
              ownerId: ownerIdString,
            },
            wechat: {
              url: `/pages/perimeter/favourableDetails/index?merchantId=${ownerIdString}&specialActivityId=${specialActivityIdString}`,
            },
          });
        }}
      >
        <div className="bottom_shop_img" style={backgroundObj(goodsImg)}></div>
        <div className="bottom_shop_content">
          <div className="bottom_shop_goodsName font_noHide">{goodsName}</div>
          <div className="bottom_shop_user font_hide">
            <div
              className={classNames('bottom_shop_profile', !merchantLogo && 'merchant_dakale_logo')}
              style={backgroundObj(merchantLogo)}
            ></div>
            <div className="bottom_shop_name font_hide">{merchantName}</div>
            <div className="bottom_shop_limit">｜{GetDistance(lat, lnt, city.lat, city.lnt)}</div>
          </div>

          <div className="bottom_shop_oldPrice1">
            <div className="bottom_shop_oldLabel">原价:</div>
            <div className="bottom_shop_oldcout">¥{oriPrice}</div>
          </div>
          <div className="bottom_qy_price font_hide">
            <div className="bottom_qy_label">卡豆价:</div>
            <div className="bottom_qy_bean">
              ¥{cash}+{bean}
            </div>
            <div className="bottom_qy_font1">卡豆</div>
          </div>
        </div>
      </div>
    );
  };
  const templateGame = (item) => {
    const {
      commission,
      goodsImg,
      ownerIdString,
      goodsName,
      merchantName,
      lat,
      lnt,
      merchantLogo,
      oriPrice,
      realPrice,
      merchantIdString,
      specialActivityIdString,
    } = item;
    return (
      <div
        key={specialActivityIdString}
        className="bottom_shop_box"
        onClick={() => {
          linkTo({
            ios: {
              path: 'DKLAroundDiscountGoodsDetailViewController',
              param: { specialActivityId: specialActivityIdString, ownerId: ownerIdString },
            },
            android: {
              path: 'AroundGood',
              specialActivityId: specialActivityIdString,
              ownerId: ownerIdString,
            },
            wechat: {
              url: `/pages/perimeter/favourableDetails/index?merchantId=${ownerIdString}&specialActivityId=${specialActivityIdString}`,
            },
          });
        }}
      >
        <div className="bottom_shop_img" style={backgroundObj(goodsImg)}></div>
        <div className="bottom_shop_content">
          <div className="bottom_shop_goodsName font_noHide">{goodsName}</div>
          <div className="bottom_shop_realPrice">
            <div className="bottom_shop_realLabel">优惠价:</div>
            <div className="bottom_shop_price">¥{realPrice}</div>
          </div>
          <div className="bottom_shop_oldPrice">
            <div className="bottom_shop_oldLabel">原价:</div>
            <div className="bottom_shop_oldcout">¥{oriPrice}</div>
          </div>
          <div className="bottom_kol_info">
            <div className="bottom_kol_s">
              <div className="bottom_kol_bean">¥{computedPrice(realPrice, payBeanCommission)}</div>
            </div>
            {shareCommission > 0 && commission > 0 && (
              <div className="bottom_kol_z font_hide">
                <div className="bottom_kol_money font_hide">
                  ¥{computedPrice(commission, shareCommission)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="BottomContent_box">
      <div className="BottomContent_barret">
        <div className="Bottom_barrage_box">
          <div className="Bottom_barrage_label"></div>
          <Swiper
            autoplay={true}
            allowTouchMove={false}
            direction={'vertical'}
            loop={true}
            indicator={() => {}}
            className="Bottom_swiper"
          >
            <Swiper.Item className="swiper_box public_center">签到可以获得卡豆和成长值</Swiper.Item>
            <Swiper.Item className="swiper_box public_center">
              成长值兑换的钥匙，可以开盲盒赢大奖
            </Swiper.Item>
            <Swiper.Item className="swiper_box public_center">
              卡豆可以在平台消费时抵扣使用
            </Swiper.Item>
            <Swiper.Item className="swiper_box public_center">
              卡豆在平台消费时最高可抵扣90%
            </Swiper.Item>
          </Swiper>
        </div>
      </div>
      {/* <Swiper autoplay={true} loop={true} className="BottomContent_banner">
        <Swiper.Item className="BottomContent_banner_box">
          <img className="BottomContent_banner_box" src={reloadImg} />
        </Swiper.Item>
      </Swiper> */}
      {hotList.length > 0 && (
        <>
          <div className="BottomContent_goods_box">
            <div className="BottomContent_goods_title">
              <div className="BottomContent_goods_sm">小豆精选</div>
              <div
                className="link_go"
                onClick={() => {
                  linkTo({
                    ios: {
                      path: 'DKLExquisiteChosenHomeViewController',
                    },
                    android: {
                      path: 'ShopAround',
                    },
                    wechat: {
                      url: `/pages/perimeter/goodThings/index`,
                    },
                  });
                }}
              >
                <div>更多</div>
              </div>
            </div>
          </div>
          <div className="bottom_shop">
            {hotList.map((item) => {
              return template(item);
            })}
          </div>
        </>
      )}
      {beanList.length > 0 && (
        <>
          <div className="BottomContent_goods_box">
            <div className="BottomContent_goods_title">
              <div className="BottomContent_goods_bean">卡豆专区</div>
              <div
                className="link_go"
                onClick={() => {
                  linkTo({
                    ios: {
                      path: 'DKLExquisiteChosenHomeViewController',
                    },
                    android: {
                      path: 'ShopAround',
                    },
                    wechat: {
                      url: `/pages/perimeter/goodThings/index`,
                    },
                  });
                }}
              >
                <div>更多</div>
              </div>
            </div>
          </div>
          <div className="bottom_shop">
            {beanList.map((item) => {
              return templateRight(item);
            })}
          </div>
        </>
      )}
      {gameList.length > 0 && (
        <>
          <div className="BottomContent_goods_box">
            <div className="BottomContent_goods_title">
              <div className="BottomContent_goods_go">周边嗨GO</div>
              <div
                className="link_go"
                onClick={() => {
                  linkTo({
                    ios: {
                      path: 'DKLExquisiteChosenHomeViewController',
                    },
                    android: {
                      path: 'ShopAround',
                    },
                    wechat: {
                      url: `/pages/perimeter/goodThings/index`,
                    },
                  });
                }}
              >
                <div>更多</div>
              </div>
            </div>
          </div>
          <div className="bottom_shop">
            {gameList.map((item, index) => {
              if (index < 2) {
                return templateGame(item);
              }
            })}
          </div>
        </>
      )}
      <div className="bottom_dakale_logo"></div>
      <div className="bottom_dakale_height"></div>
    </div>
  );
};
