import React, { useEffect } from 'react';
import { history, useDispatch, useSelector } from 'umi';
import { Toast } from 'antd-mobile';
import { checkCityName } from '@/utils/utils';
import { fetchFarmReceiveReward } from '@/services/game';
import BasicModal from '@/components/BasicModal';
import address from '@/asstes/common/address.png';
import rightPng from '@/asstes/common/right.png';
import './index.less';

const index = (props) => {
  const {
    visible,
    onClose,
    prizeData = {},
    status,
    addressData = {},
    getGameDetail,
    removeAll,
  } = props;
  const { addressObj } = useSelector((state) => state.farmGame); //商品信息  地址信息
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible && status == 0) {
      let { addressInfo } = addressData;
      addressInfo = (addressInfo && JSON.parse(addressInfo)) || {};
      if (addressData.addressIdStr) {
        addressInfo.userAddressId = addressData.addressIdStr;
      }
      dispatch({
        type: 'farmGame/save',
        payload: { addressObj: addressInfo },
      });
    }
  }, [visible]);

  const getPrize = async () => {
    const res = await fetchFarmReceiveReward({
      addressIdStr: addressObj.userAddressId,
      gameProgressIdStr: addressData.progressIdStr,
    });
    if (res.success) {
      Toast.show({
        content: '领取成功',
      });
      removeAll();
      onClose();
      getGameDetail();
      dispatch({
        type: 'farmGame/save',
        payload: { addressObj: {} },
      });
    }
  };
  const modalProps = {
    visible: visible,
    onClose: onClose,
  };
  return (
    <BasicModal modalProps={modalProps}>
      <div className="prizeModal_title">
        {status === '0' ? '恭喜你达到领取条件啦' : '距离领取奖品又进一步啦'}
      </div>
      <div className="prizeModal_content">
        <div className="prizeModal_goodsImg">
          <img src={prizeData.prizeImg} alt="" />
        </div>
        <div className="prizeModal_goodsName">{prizeData.prizeName}</div>
        {status === '1' ? (
          <div>
            <div className="prizeModal_level">当前{prizeData.gameLevel}级，达到15级免费获得</div>
            <div className="prizeProgress">
              <div
                className="prizeProgress_line"
                style={{
                  width: `${(prizeData.gameLevel / 15).toFixed(2) * 100}%`,
                }}
              ></div>
              <div className="prizeProgress_circle">
                <div className="prizeProgress_item"></div>
                <div className="prizeProgress_item"></div>
                <div className="prizeProgress_img">
                  <img src={prizeData.prizeImg} alt="" />
                </div>
              </div>
            </div>
            <div className="prizeProgress_level">
              <div>1级</div>
              <div>5级</div>
              <div>10级</div>
              <div>15级</div>
            </div>
            <div className="prizeModal_button" onClick={onClose}>
              继续施肥
            </div>
          </div>
        ) : (
          <div>
            <div className="prizeModal_level">领取后可在我的收获中查看哦</div>
            <div className="prizeModal_level prizeModal_top">请确认收货地址</div>
            <div
              className="receiveInfo"
              onClick={() => {
                history.push('/address');
              }}
            >
              <img src={address} className="receiveInfo_addressImg"></img>
              <div className="receiveInfo_content">
                <div className="receiveInfo_name">
                  {addressObj.addressName}
                  <span className="receiveInfo_mobile">{addressObj.mobile}</span>
                </div>
                <div className="receiveInfo_address">
                  {checkCityName(addressObj.districtCode)}
                  {addressObj.address}
                </div>
              </div>
              <img src={rightPng} className="receiveInfo_rightImg"></img>
            </div>
            <div className="prizeModal_button prizeModal_button1" onClick={getPrize}>
              立即领取
            </div>
          </div>
        )}
      </div>
    </BasicModal>
  );
};

export default index;
