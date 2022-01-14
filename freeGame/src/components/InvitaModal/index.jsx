import React from 'react';
import './index.less';
import { Mask } from 'antd-mobile';
import { useDispatch } from 'umi';
import closeIcon from '@public/usual/closeIcon.png';
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
        <div className="InvitaModal_content">
          <div className="InvitaModal_content_img">
            <img src={closeIcon} alt="" />
          </div>
          <div className="InvitaModal_content_title">
            XXX邀请你帮TA助力
            <br />
            动动你的小指头
          </div>
          <div className="InvitaModal_content_button">帮TA助力</div>
        </div>
      </BasicModal>
    </>
  );
}

export default index;
