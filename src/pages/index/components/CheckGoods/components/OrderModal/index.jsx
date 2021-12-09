import React from 'react';
import './index.less';
import { Mask, Button } from 'antd-mobile-v5';
import { useSelector, useDispatch } from 'umi';
import closeIcon from '@public/closeIcon.png';
import address from '@public/usual/address.png';
import rightPng from '@public/right.png';

function index(props) {
  const { visible, onClose } = props;

  const dispatch = useDispatch();

  const confirmAddress = () => {
    dispatch({
      type: 'receiveGoods/save',
      payload: {
        type: 'startSupply',
      },
    });
  };
  return (
    <>
      <Mask visible={visible} onMaskClick={onClose}>
        <div className="overlay">
          <div className="overlayContent">
            <div className="overlayContent_title">确认订单</div>
            <div className="receiveInfo">
              <img src={address} className="receiveInfo_addressImg"></img>
              <div className="receiveInfo_content">
                <div className="receiveInfo_name">
                  晴天
                  <span className="receiveInfo_mobile">18912345678</span>
                </div>
                <div className="receiveInfo_address">
                  浙江省 杭州市 萧山区 国泰科技大厦国泰科技大厦国泰科国泰科技大厦国泰科技大厦
                </div>
              </div>
              <img src={rightPng} className="receiveInfo_rightImg"></img>
            </div>
            <div className="overlayContent_line"></div>

            <div className="overlay_goods">
              <img src={address}></img>
              <div className="overlay_goods_right">
                <div className="overlay_goods_name">安格斯原切牛排250g</div>
                <div className="overlay_goods_remark">一袋/250g</div>
                <div className="overlay_goods_label">
                  <span>100%超容易获得</span>
                </div>
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
