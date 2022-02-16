import React from 'react';
import './index.less';
import { history } from 'umi';
import backImg from '@asstes/common/back.png';
// import titleImg from '@public/loading/titleImg.png';
import { deviceName } from '@/utils/birdgeContent';

function index(props) {
  const {
    type, //区分中间显示什么 --check 图片   --get空  --title 标题
    title,
    src,
    back,
  } = props;
  const flag = deviceName() == 'miniProgram';
  return (
    <>
      <div className={`titleBlock topPadding`}>
        {flag ? <div></div> : <img src={backImg} alt="" className="backImg" onClick={back} />}
        <div className="titleBlock_content">
          {src && <img src={src} alt="" />}
          {type === 'title' && <div>{title}</div>}
        </div>
      </div>
    </>
  );
}

export default index;
