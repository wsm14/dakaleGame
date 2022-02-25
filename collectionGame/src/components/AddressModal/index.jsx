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
  const { onClose, getHomeDetail, addressInfo, visible } = props;
  const { addressObj, orderVisible } = useSelector((state) => state.collectCards); //商品信息  地址信息
  const dispatch = useDispatch();

  //获取是否有选择的地址
  const addressLength = Object.keys(addressObj).length;
  useEffect(() => {
    if (visible) {
      !addressLength && getAddress();
    }
  }, [visible]);
  //获取默认地址
  const getAddress = async () => {
    let addressCopy = addressInfo.addressInfo;
    addressCopy = (addressCopy && JSON.parse(addressCopy)) || {};
    if (addressInfo.addressIdStr) {
      addressCopy.userAddressId = addressInfo.addressIdStr;
    }
    dispatch({
      type: 'collectCards/save',
      payload: { addressObj: addressCopy },
    });
  };

  const confirmAddress = async () => {
    if (addressLength) {
      onClose();
    } else {
      Toast.show({
        content: '请填写收货地址',
      });
    }
  };
  return (
    <>
      <Mask visible={visible} onMaskClick={onClose} opacity="0.8">
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
