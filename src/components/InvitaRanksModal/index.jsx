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
        <div className="InvitaRanksModal_content">
          <div className="InvitaRanksModal_content_img">
            <img src={closeIcon} alt="" />
          </div>
          <div className="InvitaRanksModal_content_title">XXX邀请你合力领商品名字</div>
          <div className="InvitaRanksModal_content_button">立即加入队伍</div>
        </div>
      </BasicModal>
    </>
  );
}

export default index;
