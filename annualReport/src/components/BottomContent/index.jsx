import React, { memo, useEffect, useState } from 'react';
import { Swiper } from 'antd-mobile';
import {
  getLocation,
  linkTo,
  deviceName,
  shopDetails,
  linkToShopActive,
} from '@/utils/birdgeContent';
import { fetchEsOfflineGoodsByDisplay, fetchEsOnlineGoodsByDisplay } from '@/services/single';
import { InfiniteScroll } from 'antd-mobile';
import { GetDistance, computedPrice, backgroundObj } from '@/utils/utils';
import './index.less';
export default memo(({ userInfo }) => {
  const [city, setcity] = useState(null);
  const [bannerList, setBannerList] = useState([]);
  const [hotList, setHotList] = useState([]);
  const [beanList, setBeanList] = useState([]);
  const [gameList, setGameList] = useState([]);
  const { payBeanCommission = 50, shareCommission = 0 } = userInfo;
  const [hasMore, setHasMore] = useState(true);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    getLocation(setcity);
  }, []);
  useEffect(() => {
    if (city) {
      fetchSpecialGoods(city);
      // fetchzbyw(city);
    }
  }, [city]);
  const fetchSpecialGoods = async () => {
    return fetchEsOnlineGoodsByDisplay({
      page: pageNum,
      limit: 10,
      displayFilterTags: 'FreeCharge',
    }).then((val) => {
      if (val) {
        const { onlineStrapInfos = [] } = val.content;
        setHotList([...hotList, ...onlineStrapInfos]);
        setHasMore(onlineStrapInfos.length > 0);
        setPageNum(pageNum + 1);
      }
    });
  };

  const fetchzbyw = (city) => {
    const { lat, lnt, city_code } = city;
    fetchEsOfflineGoodsByDisplay(
      {
        page: 1,
        limit: 2,
        displayFilterTags: 'taskzbyw',
      },
      {
        lat,
        lnt,
        'city-code': city_code,
        device: 'weChat',
      },
    ).then((val) => {
      if (val) {
        const { offlineStrapInfos = [] } = val.content;
        setGameList(offlineStrapInfos);
      }
    });
  };
  const TabulationShop = ({ list = [], listType = 'specal', configUserLevelInfo = {} }) => {
    const Template = ({ item }) => {
      const {
        categoryId,
        goodsId,
        goodsImg,
        goodsName,
        ownerId,
        activityType,
        ownerType,
        paymentModeObject = {},
        platformTagNames,
        relateId,
        relateType,
        status,
        nearestOwnerObject = {},
        oldPrice,
      } = item;
      const { type = 'defaultMode', cash = 0, bean } = paymentModeObject;
      const { lat, lnt, logo, address, name } = nearestOwnerObject;
      const { payBeanCommission = 20 } = configUserLevelInfo;
      const RenderPrice = {
        defaultMode: (
          <div className="tabulation_shop_price font_hide">
            <div className="tabulation_price_real">¥{cash}</div>
          </div>
        ),
        self: (
          <div className="tabulation_shop_price font_hide">
            <div className="tabulation_price_real">
              ¥{cash}+{bean}卡豆
            </div>
          </div>
        ),
        cashMode: (
          <div className="tabulation_shop_price font_hide">
            <div className="tabulation_price_real">¥{cash}</div>
          </div>
        ),
        free: (
          <div className="tabulation_shop_price font_hide">
            <div className="tabulation_price_real">¥{cash}</div>
          </div>
        ),
      }[type];
      return (
        <div
          onClick={() => {
            shopDetails(ownerId, goodsId, activityType);
          }}
          className="tabulation_shop_box"
        >
          <div className="tabulation_shop_img" style={backgroundObj(goodsImg)}></div>
          <div className="tabulation_shop_content">
            <div className="tabulation_shop_title font_noHide">{goodsName}</div>
            {/* {listType === 'specal' && (
                <div className="tabulation_shop_userInfo font_hide">
                  <div
                    className="tabulation_shop_userprofile merchant_dakale_logo"
                    style={backgroundObj(logo)}
                  ></div>
                  <div className="tabulation_shop_userDesc font_hide">{name}</div>
                  <div className="tabulation_shop_limit">
                    ｜{GetDistance(lat, lnt, city.lat, city.lnt)}
                  </div>
                </div>
              )} */}
            {RenderPrice}
            {type === 'defaultMode' && (
              <div className="tabulation_kol_s">
                <div className="tabulation_kol_bean">
                  {computedPrice(payBeanCommission, Number(cash))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };
    return (
      <>
        <div className="tabulation_box">
          <div className="tabulation_left">
            {list.map((item, index) => {
              if (index % 2 === 0) {
                return <Template item={item} key={item.goodsId}></Template>;
              }
              return null;
            })}
          </div>
          <div className="tabulation_right">
            {list.map((item, index) => {
              if (index % 2 === 1) {
                return <Template item={item} key={item.goodsId}></Template>;
              }
              return null;
            })}
          </div>
        </div>
        <InfiniteScroll loadMore={fetchSpecialGoods} hasMore={hasMore}>
          <div></div>
        </InfiniteScroll>
      </>
    );
  };
  //宫格模式列表

  return (
    <div className="BottomContent_box">
      {hotList.length > 0 && (
        <TabulationShop list={hotList} configUserLevelInfo={userInfo}></TabulationShop>
      )}

      {/* <div className="bottom_dakale_logo"></div> */}
      {/* <div className="bottom_dakale_height"></div> */}
    </div>
  );
});
