import React from 'react';
import './index.less';
import { history } from 'umi';
import backImg from '@public/image/back.png';
import titleImg from '@public/loading/titleImg.png';
import { linkToMyGoods, nativeClose, deviceName } from '@/utils/birdgeContent';

function index(props) {
  const {
    type, //区分中间显示什么 --check 图片   --get空  --title 标题
    back,
  } = props;
  const flag = deviceName() == 'miniProgram';
  return (
    <>
      {!flag && (
        <div className={`titleBlock topPadding`}>
          {flag ? <div></div> : <img src={backImg} alt="" className="backImg" onClick={back} />}
          <div className="titleBlock_content">
            {type === 'check' ? (
              <img src={titleImg} alt="" />
            ) : type === 'title' ? (
              '我的福豆'
            ) : null}
          </div>
        </div>
      )}
    </>
    // <div className={`titleBlock ${!flag ? 'topPadding' : null}`}>
    //   {flag ? <div></div> : <img src={backImg} alt="" className="backImg" onClick={back} />}
    //   <div className="titleBlock_content">
    //     {type === 'check' ? <img src={titleImg} alt="" /> : type === 'title' ? '我的福豆' : null}
    //   </div>
    // </div>
  );
}

export default index;
