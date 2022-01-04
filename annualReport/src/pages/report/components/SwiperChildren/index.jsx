import React, { useRef, useEffect } from 'react';
import './index.less';
import lastImg3 from '@public/image/lastImg3.png';
import lastImg4 from '@public/image/lastImg4.png';
import lastImg5 from '@public/image/lastImg5.png';

function index(props) {
  const { index, pageIndex } = props;
  const textRef = useRef();
  const imgRef = useRef();

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
                今天是哒卡乐陪伴你的<span className="report_marginSlide fontSize48">467</span>天
              </div>
              <div className="report_margin">
                <span className="fontSize48">2019.07.20</span>
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
                <span className="fontSize48">13132</span>卡豆
              </div>
              <div className="report_margin">
                全年 <span>赚取卡豆</span> 467678 卡豆
              </div>
              <div>
                位列全国榜单 <span>129</span>位
              </div>
              <div>其中</div>
              <div>
                你在哒卡乐的第一桶金是<span>30卡豆</span>
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
                <span className="fontSize48">1980.56</span>元
              </div>
              <div className="report_margin">
                2021年总共消费 <span>30笔</span>
              </div>
              <div>卡豆为你节省了1980.56元</div>
              <div>
                打败了全国 <span>45%</span>
                的用户
              </div>
              <div>其中</div>
              <div>你在哒卡乐第一笔订单用了</div>
              <div>
                <span>100卡豆</span>节省了 <span>1.00元</span>
              </div>
            </div>
          </div>
        );
        break;
      case 3:
        elementDom = (
          <div className={`reportPage  background${index}`}>
            <div className="reportContent" ref={textRef}>
              <div>
                <span className="fontSize48">55</span>人
              </div>
              <div className="report_margin">你好像特别喜欢和别人分享</div>
              <div>在哒卡乐的喜怒哀乐</div>
              <div>
                2021你在哒卡乐拥有了 <span>204位</span>家人
              </div>
              <div>而你的家人为你带来了</div>
              <div>
                <span>467678卡豆</span>的贡献收入
              </div>
              <div>一分耕耘一分收获，愿你2022继续</div>
            </div>
          </div>
        );
        break;
      case 4:
        elementDom = (
          <div className={`reportPage  background${index}`}>
            <div className="reportContent" ref={textRef}>
              <div>
                <span className="fontSize48">一星豆长</span>
              </div>
              <div className="report_margin">金光闪闪，哒人的身份垫定了</div>
              <div>你在哒卡乐的地位，</div>
              <div>这一年，</div>
              <div>
                这个身份给你赚取了 <span>238.17元</span>
              </div>
              <div>距离下一个等级已不远</div>
              <div>加油吧少年</div>
            </div>
          </div>
        );
        break;
      case 5:
        elementDom = (
          <div className="reportData_bac" ref={imgRef}>
            <div className="reportData_content">
              <div className="reportData_top">
                <div className="consumption">
                  <div className="consumption_title">全年总消费(元)</div>
                  <div className="consumption_num">177,128.09</div>
                </div>
                <div className="consumption">
                  <div className="consumption_title">全年卡豆总抵扣(卡豆)</div>
                  <div className="consumption_num">177,128</div>
                </div>
              </div>
              <div className="saveMoney">
                <div className="saveMoney_title">全年卡豆为你省钱(元)</div>
                <div className="saveMoney_num">177,128.09</div>
              </div>
              <div className="reportData_center">
                <img src={lastImg3} alt="" />
                <div className="reportData_center_money">
                  <div>
                    线上消费 <span>177,1.98</span>元
                  </div>
                  <div>
                    线下消费 <span>177,1.98</span>元
                  </div>
                </div>
              </div>
              <div className="report_ranking">全国·第129名</div>
              <div className="report_exceed">
                超过全国 <span>98%</span> 的用户
              </div>
              <div className="report_line"></div>
              <div className="report_keyWord">我的年度关键词</div>
              <div className="report_evaluate">深不可测</div>
              <div className="report_summary">
                今年会有机遇，也会有挑战，可能一夜暴富
                <br /> 也可能一举成名，当然离不开哒卡乐
              </div>
            </div>
            <img src={lastImg4} alt="" className="reportData_button" />
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
