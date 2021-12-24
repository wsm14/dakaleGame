import React, { useEffect, useState } from 'react';
import './index.less';
import { useLocation } from 'umi';
import BasicModal from '@/components/BasicModal';
import together from '@public/usual/together.png';
import help from '@public/usual/help.png';

function index(props) {
  const location = useLocation();
  const { query = {} } = location;
  const [visible, setVisible] = useState(false);
  const { actionType } = query; //  together - 合力  help-助力
  useEffect(() => {
    if (actionType) {
      setVisible(true);
    }
  }, [actionType]);

  const modalProps = {
    visible,
    onClose: () => {
      setVisible(false);
    },
    opacity: 0.8,
  };

  return (
    <>
      <BasicModal modalProps={{ ...modalProps }}>
        <div className="usualModal_content">
          <div className="usualModal_content_img">
            <img src={actionType == 'help' ? help : together} alt="" />
          </div>
          {actionType == 'help' ? (
            <div className="usualModal_content_title">
              你的好友帮你助力成功啦
              <br />
              快去领取星豆
            </div>
          ) : (
            <div className="usualModal_content_title">
              你的好友与你合力成功啦
              <br />
              继续加油
            </div>
          )}

          {actionType == 'help' ? (
            <div
              className="usualModal_content_button"
              onClick={() => {
                setVisible(false);
              }}
            >
              立即领取
            </div>
          ) : (
            <div
              className="usualModal_content_button"
              onClick={() => {
                setVisible(false);
              }}
            >
              去补给
            </div>
          )}
        </div>
      </BasicModal>
    </>
  );
}

export default index;
