import React, { useState } from 'react';
import TitleBlock from '@/components/TitleBlock';
import FooterModal from '@/components/FooterModal';
import { history } from 'umi';
import './index.less';

import footTitle from '@/asstes/common/footTitle.png';
import footBac from '@/asstes/common/footBac.png';

const index = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="footPrint">
      <TitleBlock
        back={() => {
          history.goBack();
        }}
      ></TitleBlock>
      <div className="footPrint_titleImg">
        <img src={footTitle} alt="" />
      </div>
      <div className="footPrint_content">
        <div className="footPrint_padding">
          <div
            className="footPrint_item"
            onClick={() => {
              setVisible(true);
            }}
          >
            <img src={footBac} alt="" />
          </div>
          <div className="footPrint_item"></div>
          <div className="footPrint_item"></div>
          <div className="footPrint_item"></div>
        </div>
        <div className="footPrint_button">
          <div>上一页</div>
          <div>下一页</div>
        </div>
      </div>

      {/* 弹窗 */}
      <FooterModal
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      ></FooterModal>
    </div>
  );
};

export default index;
