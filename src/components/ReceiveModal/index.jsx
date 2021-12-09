import React from 'react';
import './index.less';
import { Mask } from 'antd-mobile';
import { useDispatch } from 'umi';
import closeIcon from '@public/closeIcon.png';
import BasicModal from '@/components/BasicModal';

function index(props) {
  const { visible, onClose } = props;

  const dispatch = useDispatch();

  const confirmReceive = () => {};

  const modalProps = {
    visible,
    onClose,
    opacity: 1,
  };

  return (
    <>
      <BasicModal modalProps={{ ...modalProps }}>
        <div className="receiveModal_content">
          <div className="receiveModal_content_title">感谢您第一次领取成功</div>
          <div className="receiveModal_content_img">
            <img src={closeIcon} alt="" />
          </div>
          <div className="receiveModal_content_goodsName">安格斯原切牛排250g</div>
          <div className="receiveModal_content_gift">哒卡乐已累计送出 12987 份礼品</div>
          <div className="receiveModal_content_receive">确认领取</div>
        </div>
      </BasicModal>
    </>
  );
}

export default index;
