import React, { useEffect, useState } from 'react';
import './index.less';
import { useSelector, useDispatch, history } from 'umi';
import { fetchAddressListUserAddress } from '@/services/address';
import { checkCityName } from '@/utils/utils';
import { linkToAddress } from '@/utils/birdgeContent';
import checkAddress1 from '@public/usual/checkAddress1.png';
import checkAddress2 from '@public/usual/checkAddress2.png';
import addAddress from '@public/usual/addAddress.png';
import backImg from '@public/usual/backImg.png';
import emptyAddress from '@public/usual/emptyAddress.png';
import { reloadTab } from '@/utils/utils';
import { deviceName } from '@/utils/birdgeContent';

function index() {
  const [addressList, setAddressList] = useState([]); //地址列表
  const [addressBol, setAddressBol] = useState(true);
  const { addressObj } = useSelector((state) => state.receiveGoods); //地址的数据
  const dispatch = useDispatch();

  useEffect(() => {
    getAddressList();
    reloadTab(getAddressList);
    topFlag();
  }, []);

  const getAddressList = async () => {
    const res = await fetchAddressListUserAddress();
    const { content = {} } = res;
    const { userAddressList = [] } = content;
    setAddressList([...userAddressList]);
  };

  const checkAddress = (item) => {
    dispatch({
      type: 'receiveGoods/fetchSetAddressObj',
      payload: {
        addressObj: item,
      },
      callback: () => {
        history.goBack();
      },
    });
  };

  const topFlag = () => {
    if (deviceName() == 'miniProgram') {
      setAddressBol(false);
    } else {
      setAddressBol(true);
    }
  };
  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="addressBox">
      {addressBol && (
        <div className="address_backImg">
          <div className="address_backClick">
            <img src={backImg} alt="" className="backImg" onClick={goBack} />
          </div>
          <div className="address_mine">我的收货地址</div>
        </div>
      )}
      <div className="addressContent">
        {addressList.length ? (
          addressList.map((item) => (
            <div
              className="addressBlock"
              onClick={() => {
                checkAddress(item);
              }}
              key={item.userAddressId}
            >
              <img
                src={addressObj.userAddressId == item.userAddressId ? checkAddress1 : checkAddress2}
                alt=""
                className="addressBlock_img"
              />
              <div className="addressBlock_info">
                <div className="addressBlock_name">
                  {item.addressName} <span>{item.mobile}</span>
                </div>
                <div className="addressBlock_area">
                  {checkCityName(item.districtCode)}
                  {item.address}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="emptyAddress">
            <img src={emptyAddress} alt="" />
            <div>您还没有完善收货地址哦</div>
          </div>
        )}
      </div>
      <div className="addressFixed">
        <div className="addressFixed_button" onClick={linkToAddress}>
          <img src={addAddress} alt="" />
          <div>添加新地址</div>
        </div>
      </div>
    </div>
  );
}

export default index;
