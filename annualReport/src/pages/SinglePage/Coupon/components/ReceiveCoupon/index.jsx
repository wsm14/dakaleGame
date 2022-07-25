import React from 'react';
import './index.less';
import BasicModal from '@/components/BasicModal';
import { COUPON_TYPE } from '@/common/report';
const index = (props) => {
  const { fetchGetDetail, platformCoupon = {}, onClose } = props;
  return (
    <BasicModal modalProps={{ ...props }}>
      <div className="couponModal">
        <div className="couponModalTitle1">恭喜您获得</div>
        <div className="couponModalTitle2">可在个人中心-【我的券包】中查看</div>
        <div className="couponModal_content">
          <div className="couponModal_right">
            <div className="couponModal_rightName">{platformCoupon.couponName}</div>
            <div className="couponModal_rightLabel">{platformCoupon.couponDesc}</div>
          </div>
          <div className="couponModal_middle"></div>
          <div className="couponModal_left">
            <div className="couponModal_leftPrice">¥{platformCoupon.couponValue}</div>
            <div className="couponModal_leftLimit">满{platformCoupon.thresholdPrice}可用</div>
          </div>
        </div>
        <div
          className="couponModalButton"
          onClick={() => {
            onClose();
            fetchGetDetail();
          }}
        >
          开心收下
        </div>
      </div>
    </BasicModal>
  );
};

export default index;
