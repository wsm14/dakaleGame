import React, { useEffect, useState } from 'react';
import './index.less';
import { useSelector, useDispatch, history } from 'umi';
import { fetchAddressListUserAddress } from '@/services/address';
import { checkCityName } from '@/utils/utils';
import { linkToAddress } from '@/utils/birdgeContent';
import checkAddress1 from '@public/usual/checkAddress1.png';
import checkAddress2 from '@public/usual/checkAddress2.png';
import addAddress from '@public/usual/addAddress.png';
import { reloadTab } from '@/utils/utils';

function index() {
  const [addressList, setAddressList] = useState([]); //地址列表
  const { addressObj } = useSelector((state) => state.receiveGoods); //地址的数据
  const dispatch = useDispatch();

  useEffect(() => {
    getAddressList();
    reloadTab(getAddressList);
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

  return (
    <div className="addressBox">
      <div className="addressContent">
        {addressList.map((item) => (
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
        ))}
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
