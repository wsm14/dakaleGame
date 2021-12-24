import React, { useRef, useEffect } from 'react';
import './index.less';

function index(props) {
  const { index, pageIndex } = props;
  const textRef = useRef();

  useEffect(() => {
    if (index === pageIndex) {
      let divChildren = textRef?.current?.children;
      let time = 0;
      divChildren.forEach((item, index) => {
        item.style.animationPlayState = 'running';
        item.style.animationDelay = `${time}s`;
        time += 1;
      });
      console.log();
    }
  }, [pageIndex]);

  const checkPage = () => {
    let elementDom;
    switch (index) {
      case 0:
        elementDom = (
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
        );
        break;
      case 1:
        elementDom = (
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
        );
        break;
      case 2:
        elementDom = (
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
        );
        break;
      case 3:
        elementDom = (
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
        );
        break;
      case 4:
        elementDom = (
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
        );
        break;
      default:
        break;
    }
    return elementDom;
  };

  return (
    <>
      <div className={`reportPage  background${index}`}>{checkPage()}</div>
    </>
  );
}

export default index;
