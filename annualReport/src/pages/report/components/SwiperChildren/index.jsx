import React, { useRef, useEffect } from 'react';
import { formatTime } from '@/utils/utils';
import { BEAN_LEVEL } from '@/common/report';
import { deviceName } from '@/utils/birdgeContent';
import './index.less';
import lastImg3 from '@public/image/lastImg3.png';
import lastImg4 from '@public/image/lastImg4.png';
import lastImg5 from '@public/image/lastImg5.png';

function index(props) {
  const { index, pageIndex, detail = {}, makeImage } = props;
  const textRef = useRef();
  const imgRef = useRef();

  const { annualReport = {} } = detail;

  const {
    registerDate, //注册日期
    reportContentObject: content = {}, //具体信息
    totalDays, //总天数
  } = annualReport;

  useEffect(() => {
    if (index === pageIndex) {
      let divChildren = textRef?.current?.children || [];
      let time = 0;
      divChildren.forEach((item, index) => {
        item.style.animationPlayState = 'running';
        item.style.animationDelay = `${time}s`;
        time += 0.5;
      });
    }
  }, [pageIndex]);

  const checkPage = () => {
    let elementDom;
    switch (index) {
      case 0:
        elementDom = (
          <div className={`reportPage  background${index}`}>
            <div className="reportContent" ref={textRef}>
              <div>
                今天是哒卡乐陪伴你的
                <span className="report_marginSlide fontSize48">{totalDays}</span>天
              </div>
              <div className="report_margin">
                <span className="fontSize48">
                  {formatTime(registerDate)?.year}.{formatTime(registerDate)?.month}.
                  {formatTime(registerDate)?.day}
                </span>
              </div>
              <div className="report_margin">你来到哒卡乐，开始了哒卡乐之旅，</div>
              <div>哒卡乐每时每刻都愿意与你相伴。</div>
            </div>
          </div>
        );
        break;
      case 1:
        elementDom = (
          <div className={`reportPage  background${index}`}>
            <div className="reportContent" ref={textRef}>
              <div>
                <span className="fontSize48">{content.totalBean}</span>卡豆
              </div>
              <div className="report_margin">
                全年 <span>赚取卡豆</span> {content.totalBean} 卡豆
              </div>
              <div>
                打败了全国 <span>{content.beanLevel}%</span>的用户
              </div>
              <div>其中</div>
              <div>
                你在哒卡乐的第一桶金是<span>{content.firstBean}卡豆</span>
              </div>
            </div>
          </div>
        );
        break;
      case 2:
        elementDom = (
          <div className={`reportPage  background${index}`}>
            <div className="reportContent" ref={textRef}>
              <div>
                <span className="fontSize48">
                  {(Number(content.annualBeanDeduct) / 100).toString()}
                </span>
                元
              </div>
              <div className="report_margin">
                2021年总共消费 <span>{content.totalOrderNums}笔</span>
              </div>
              <div>卡豆为你节省了 {(Number(content.annualBeanDeduct) / 100).toString()}元</div>
              <div>
                打败了全国 <span>{content.annualBeanDeductLevel}%</span>
                的用户
              </div>
              <div>其中</div>
              <div>你在哒卡乐第一笔订单用了</div>
              <div>
                <span>{content.fristOrderBeanNums}卡豆</span>节省了{' '}
                <span>{Number(content.fristOrderBeanNums) / 100}元</span>
              </div>
            </div>
          </div>
        );
        break;
      case 3:
        elementDom = (
          <div className={`reportPage  background${index}`}>
            {content.familyNums > 50 ? (
              <div className="reportContent" ref={textRef}>
                <div>
                  <span className="fontSize48">{content.familyNums}</span>人
                </div>
                <div className="report_margin">你好像特别喜欢和别人分享</div>
                <div>在哒卡乐的喜怒哀乐</div>
                <div>
                  2021你在哒卡乐拥有了 <span>{content.familyNums}位</span>家人
                </div>
                <div>而你的家人为你带来了</div>
                <div>
                  <span>{content.familyBean}卡豆</span>的贡献收入
                </div>
                <div>一分耕耘一分收获，愿你2022继续</div>
              </div>
            ) : (
              <div className="reportContent" ref={textRef}>
                <div>
                  <span className="fontSize48">{content.familyNums}</span>人
                </div>
                <div className="report_margin">你应该是一个内敛的人</div>
                <div> 更喜欢独处的安静</div>
                <div>
                  2021你在哒卡乐拥有了 <span>{content.familyNums}位</span>家人
                </div>
                <div>而你的家人为你带来了</div>
                <div>
                  <span>{content.familyBean}卡豆</span>的贡献收入
                </div>
                <div>愿你在新的一年 更喜欢与人分享</div>
              </div>
            )}
          </div>
        );
        break;
      case 4:
        elementDom = (
          <div className={`reportPage  background${index}`}>
            <div className="reportContent" ref={textRef}>
              <div>
                <span className="fontSize48">{BEAN_LEVEL[content.userLevel]}</span>
              </div>
              <div className="report_margin">金光闪闪，哒人的身份垫定了</div>
              <div>你在哒卡乐的地位，</div>
              <div>这一年，</div>
              <div>
                这个身份给你赚取了 <span>{(Number(content.familyBean) / 100).toString()}元</span>
              </div>
              <div>距离下一个等级已不远</div>
              <div>加油吧少年</div>
            </div>
          </div>
        );
        break;
      case 5:
        elementDom = (
          <div className={`reportData_bac`} ref={imgRef}>
            <div className="reportData_content">
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
            <img src={lastImg4} alt="" className="reportData_button" onClick={makeImage} />
            <img src={lastImg5} alt="" className="reportData_bottomImg" />
          </div>
        );
        break;
      default:
        break;
    }
    return elementDom;
  };

  return <>{checkPage()}</>;
}

export default index;
