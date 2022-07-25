import React from 'react';
import './index.less';
import { history } from 'umi';
import backImg from '@public/help/back.png';

// import titleImg from '@public/loading/titleImg.png';
import { deviceName, homeShare } from '@/utils/birdgeContent';

function index(props) {
  const { title, src, back, titleClick } = props;
  const flag = deviceName() == 'miniProgram';

  return (
    <>
      <div className={`titleBlock topPadding`}>
        {flag ? <div></div> : <img src={backImg} alt="" className="titleBlockImg" onClick={back} />}
        <div className="titleBlock_content">
          {src && <img src={src} alt="" />}
          {title && (
            <div
              onClick={() => {
                titleClick && titleClick();
              }}
            >
              {title}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default index;
