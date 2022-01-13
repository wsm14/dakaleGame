import React, { useState, useEffect, forwardRef } from 'react';
import { Mask } from 'antd-mobile';
import { deviceName } from '@/utils/birdgeContent';
import { fetchShareGetNewShareInfo } from '@/services/report';
import './index.less';

import img1 from '@public/image/img1.png';
import img2 from '@public/image/img2.png';
import img3 from '@public/image/img3.png';

import lastImg3 from '@public/image/lastImg3.png';

const index = forwardRef((props, ref) => {
  const { detail } = props;
  const [shareImg, setShareImg] = useState('');
  const { annualReport = {}, username } = detail;
  useEffect(() => {
    getShareImg();
  }, []);
  const {
    reportContentObject: content = {}, //具体信息
  } = annualReport;

  const getShareImg = async () => {
    const res = await fetchShareGetNewShareInfo({
      shareType: 'gameTask',
    });
    const { shareInfo = {} } = res.content;
    setShareImg(shareInfo.qcodeUrl);
  };

  return (
    <>
      <div className={`reportData_bac1`} ref={ref}>
        <div className="reportData_position">
          <div className="reportData_content">
            <img src={img1} alt="" className="reportData_contentImg" />
            <div className="reportData_relative">
              <div className="reportData_top">
                <div className="consumption">
                  <div className="consumption_title">全年总消费(元)</div>
                  <div className="consumption_num">{content.totalConsume}</div>
                </div>
                <div className="consumption">
                  <div className="consumption_title">全年卡豆总抵扣(卡豆)</div>
                  <div className="consumption_num">{content.annualBeanDeduct}</div>
                </div>
              </div>
              <div className="saveMoney">
                <div className="saveMoney_title">全年卡豆为你省钱(元)</div>
                <div className="saveMoney_num">
                  {(Number(content.annualBeanDeduct) / 100).toString()}
                </div>
              </div>
              <div className="reportData_center">
                <img src={lastImg3} alt="" />
                <div className="reportData_center_money">
                  <div>
                    线上消费 <span>{content.onlineConsume}</span>元
                  </div>
                  <div>
                    线下消费 <span>{content.outlineConsume}</span>元
                  </div>
                </div>
              </div>
              <div className="report_ranking">段位·{content.position}</div>
              <div className="report_exceed">
                超过全国 <span>{content.consumeCashLevel}%</span> 的用户
              </div>
              <div className="report_line"></div>
              <div className="report_keyWord">我的年度关键词</div>
              <div className="report_evaluate">{content.annualKey}</div>
              <div className="report_summary">{content.annualWord}</div>
            </div>
          </div>
          <div className="reportBottom">
            <div className="reportBottom_left">
              <div className="reportBottom_nickname">
                <span>{username}</span> 的年度报告
              </div>
              <img src={img3} alt="" className="reportBottom_img2" />
              <img src={img2} alt="" className="reportBottom_img3" />
            </div>
            <div className="reportBottom_right">
              <img src={`${shareImg}?_=${Date.now()}`} alt="" crossOrigin="anonymous" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default index;
