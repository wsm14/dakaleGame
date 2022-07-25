import React from 'react';
import './index.less';
import BasicModal from '@/components/BasicModal';
import { linkToGoods } from '@/utils/birdgeContent';

const index = (props) => {
  const { goodsImg } = props;
  return (
    <BasicModal modalProps={{ ...props }}>
      <div className="SuccessModal">
        <div className="SuccessModalTitle">恭喜您获得</div>
        <img src={goodsImg} alt="" className="SuccessModalImg" />
        <div className="SuccessModalSee">可在活动页面-【我的奖品】中查看 平台将在72小时内发货</div>
        <div
          className="SuccessModalButton"
          onClick={() => {
            linkToGoods('fissionHelp');
          }}
        >
          查看奖品
        </div>
      </div>
    </BasicModal>
  );
};

export default index;
