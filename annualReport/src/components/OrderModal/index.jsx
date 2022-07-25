import React, { useState, useEffect } from 'react';
import './index.less';
import { Mask, Button, Toast } from 'antd-mobile';
import { useSelector, useDispatch, history } from 'umi';
import { fetchUserDefaultAddress, fetchReceiveReward } from '@/services/single';
import { checkCityName } from '@/utils/utils';
import closeIcon from '@public/help/closeIcon.png';
import address from '@public/help/address.png';
import rightPng from '@public/help/right.png';

function index(props) {
  const {
    visible = false,
    onClose,
    goodDetail = {},
    openSuccess,
    fissionId,
    fetchGetDetail,
  } = props;
  const { addressObj, addressBol } = useSelector((state) => state.receiveGoods); //商品信息  地址信息

  const dispatch = useDispatch();

  const addressLength = Object.keys(addressObj).length;

  useEffect(() => {
    if (visible) {
      getAddress();
    }
  }, [visible]);

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
      const { userAddressId } = addressObj;
      const res = await fetchReceiveReward({
        fissionId: fissionId,
        userAddressId,
      });
      if (res.success) {
        fetchGetDetail();
        onClose();
        openSuccess();
      }
    } else {
      Toast.show({
        content: '请填写收货地址',
      });
    }
  };
  return (
    <>
      <Mask visible={addressBol} onMaskClick={onClose} opacity="0.8">
        <div className="overlay">
          <div className="overlayContent">
            <div className="overlayContent_title">确认收获地址</div>
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
            <div className="overlayContent_line"></div>

            <div className="overlay_goods">
              <img src={goodDetail.goodsImg}></img>
              <div className="overlay_goods_right">
                <div className="overlay_goods_name">{goodDetail.goodsName}</div>
                {/* <div className="overlay_goods_remark">一袋/250g</div> */}
                <div className="overlay_goods_label">100%超容易获得</div>
              </div>
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
