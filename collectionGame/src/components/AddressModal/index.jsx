import React, { useState, useEffect } from 'react';
import './index.less';
import { Mask, Button, Toast } from 'antd-mobile';
import { useSelector, useDispatch, history } from 'umi';
import { fetchUserDefaultAddress, fetchFreeGoodSetRewardAddress } from '@/services/address';
import { checkCityName } from '@/utils/utils';
import closeIcon from '@public/closeIcon.png';
import address from '@public/image/address.png';
import rightPng from '@public/image/right.png';

function index(props) {
  const { onClose, getHomeDetail } = props;
  const { addressObj, orderVisible } = useSelector((state) => state.receiveGoods); //商品信息  地址信息

  const dispatch = useDispatch();

  const addressLength = Object.keys(addressObj).length;
  useEffect(() => {
    if (orderVisible) {
      !addressLength && getAddress();
    }
  }, [orderVisible]);
  //获取默认地址
  const getAddress = async () => {
    const res = await fetchUserDefaultAddress();
    const { content = {} } = res;
    const { userAddressInfo = {} } = content;
    dispatch({
      type: 'receiveGoods/save',
      payload: { addressObj: userAddressInfo },
    });
  };

  const confirmAddress = async () => {
    if (addressLength) {
      if (!addressId && processId) {
        const { userAddressId } = addressObj;
        const res = await fetchFreeGoodSetRewardAddress({
          gameProcessId: processId,
          addressId: userAddressId,
        });
        dispatch({
          type: 'receiveGoods/save',
          payload: {
            orderVisible: false,
          },
        });
        getHomeDetail();
      } else {
        onClose();
        dispatch({
          type: 'receiveGoods/save',
          payload: {
            type: 'startSupply',
          },
        });
      }
    } else {
      Toast.show({
        content: '请填写收货地址',
      });
    }
  };
  return (
    <>
      <Mask visible={orderVisible} onMaskClick={onClose}>
        <div className="overlay">
          <div className="overlayContent">
            <div className="overlayContent_title">确认订单</div>
            <div
              className="receiveInfo"
              onClick={() => {
                history.push('/address');
              }}
            >
              <img src={address} className="receiveInfo_addressImg"></img>
              <div className="receiveInfo_content">
                {addressLength ? (
                  <>
                    <div className="receiveInfo_name">
                      {addressObj.addressName}
                      <span className="receiveInfo_mobile">{addressObj.mobile}</span>
                    </div>
                    <div className="receiveInfo_address">
                      {checkCityName(addressObj.districtCode)}
                      {addressObj.address}
                    </div>
                  </>
                ) : (
                  <div className="receiveInfo_name">请填写收货地址</div>
                )}
              </div>
              <img src={rightPng} className="receiveInfo_rightImg"></img>
            </div>
            <div className="receiveInfo_confirm">
              <Button className="receiveInfo_button" onClick={confirmAddress}>
                确认收货地址
              </Button>
            </div>
          </div>
          <div className="closeImg">
            <img src={closeIcon} onClick={onClose}></img>
          </div>
        </div>
      </Mask>
    </>
  );
}

export default index;
