import React, { useState } from 'react';
import './index.less';
import { Button } from 'antd-mobile-v5';
import Rules from '@/components/Rules';
import OrderModal from './components/OrderModal';
import SwiperReceive from './components/SwiperReceive';
import ScrollGoods from './components/ScrollGoods';

function index() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="checkGoods">
      {/* 规则 */}
      <Rules></Rules>
      <div className="checkGoods_tips">
        选择商品，包邮到家
        <br /> 快选择心仪商品，开启收包裹之旅~
      </div>
      {/*左滑*/}
      <ScrollGoods list={[1, 2, 3, 4, 5, 6, 7]}></ScrollGoods>
      {/* 确认按钮 */}
      <div className="mailButton">
        <Button
          onClick={() => {
            setVisible(true);
          }}
          className="mailButton_button"
        >
          确认商品，开始邮寄
        </Button>
      </div>
      {/* 领取轮播 */}
      <SwiperReceive list={[1, 2, 3, 4]}></SwiperReceive>
      {/* 确认订单弹窗 */}
      <OrderModal
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      ></OrderModal>
    </div>
  );
}

export default index;
