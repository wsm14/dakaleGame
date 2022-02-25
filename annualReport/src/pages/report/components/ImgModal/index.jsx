import React, { useState, useEffect, forwardRef } from 'react';
import { Mask } from 'antd-mobile';
import { deviceName } from '@/utils/birdgeContent';
import { fetchShareGetNewShareInfo } from '@/services/report';
import './index.less';

import reportBac1 from '@public/image/reportBac1.png';
import reportImg1 from '@public/image/reportImg1.png';
import img3 from '@public/image/img3.png';

import lastImg3 from '@public/image/lastImg3.png';

const index = forwardRef((props, ref) => {
  const { detail } = props;
  const [shareImg, setShareImg] = useState('');
  const { annualReport = {}, username = '你的名字' } = detail;
  useEffect(() => {
    getShareImg();
  }, []);
  const {
    reportContentObject: content = {}, //具体信息
    totalDays,
  } = annualReport;

  const getShareImg = async () => {
   setTimeout(() => {
    const res = await fetchShareGetNewShareInfo({
      shareType: 'annualReport',
    });
    const { content = {} } = res;
    const { shareInfo = {} } = content;
    setShareImg(shareInfo.qcodeUrl);
   }, 1000);
  };

  return (
    <>
      <div className={`reportData_bac1`} ref={ref}>
        <img src={reportBac1} alt="" className="reportData_bacImg" />
        <div className="reportData_content">
          <div className="reportData_title">
            哒卡乐
            <br />
            陪你走过了
          </div>
          <div className="reportData_days">
            {totalDays}
            <span>天</span>
          </div>
          <img src={reportImg1} alt="" className="reportData_reportImg1" />
          <div className="reportData_style">
            全年总消费 <span>{content.totalConsume}</span>元
          </div>
          <div className="reportData_style">
            全年累计获得 <span>{content.totalBean}</span>卡豆
          </div>
          <div className="reportData_style">
            全年卡豆为你省钱{' '}
            <span className="reportData_pink1">{Number(content.annualBeanDeduct) / 100}</span>
            <span className="reportData_pink1 fontSize24"> 元</span>
          </div>
          <div className="reportData_style">
            你的段位是 <span className="reportData_pink2">{content.position}</span>
          </div>
        </div>
        <div className="reportBottom">
          <div className="reportBottom_left">
            <img src={`${shareImg}?_=${Date.now()}`} alt="" crossOrigin="anonymous" />
          </div>
          <div className="reportBottom_right">
            <div className="reportBottom_nickname">
              <span>
                {username && username.length > 10 ? `${username.substring(0, 10)}...` : username}
              </span>{' '}
              的年度报告
            </div>
            <img src={img3} alt="" className="reportBottom_img2" />
          </div>
        </div>
      </div>
    </>
  );
});

export default index;
