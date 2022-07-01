import React, { useRef, useState } from 'react';
import { Swiper } from 'antd-mobile';
import { nativeClose } from '@/utils/birdgeContent';
import { getDownload } from '@/utils/utils';
import topic2 from '@public/spa/topic2.png';
import topic4 from '@public/spa/topic4.png';
import topic5 from '@public/spa/topic5.png';
import topic6 from '@public/spa/topic6.png';
import topic7 from '@public/spa/topic7.png';
import topic8 from '@public/spa/topic8.png';
import topic9 from '@public/spa/topic9.png';

import './index.less';

const topicList = [
  {
    quesiton: '打卡后偷偷去吃早餐，碰见领导，你会？',
    answer: [
      'A、先下手为强，质问领导怎么不在工位上',
      'B、和他热情打招呼，并介绍这家店的鸡蛋饼非常好吃',
      'C、只要跑得快他就追不上我，不吃了行不行！',
    ],
  },
  {
    quesiton: '其实你上班是为了？',
    answer: ['A、下班', 'B、赚钱', 'C、打发时间！'],
  },
  {
    quesiton: '最让你尴尬的时刻是？',
    answer: [
      'A、请病假去逛街，在商场碰见说要外出开会的领导',
      'B、和老板单独乘坐一部电梯',
      'C、把螺狮粉的汤洒在衣服上，不知情的同事捂着鼻子奇怪地望向你',
    ],
  },
  {
    quesiton: '工作这些年，你最不想听到的一句话是？',
    answer: [
      'A 、哎哎大家先别走，来开个会',
      'B、甲方：我就想要五彩斑斓的黑',
      'C、太平了，太平了，能不能更吸引人一点！',
    ],
  },
  {
    quesiton: '开会的时候，发现自己拿错笔了，你拿的其实是？',
    answer: ['A 、一根筷子', 'B、Apple pencil', 'C、一支眼线笔'],
  },
  {
    quesiton: '什么时候是你的打工高光时刻？',
    answer: [
      'A、打工是不可能打工的，这辈子都不可能，除非太穷了',
      'B、被甲方追着叫爸爸的时刻',
      'C、啥时候都困，一到饭点儿我就精神了！',
    ],
  },
  {
    quesiton: '你工作的状态是？',
    answer: ['A 、我不适合工作，只适合拿工资', 'B、指如疾风，势如闪电', 'C、领导不在，动若疯兔'],
  },
];

const index = () => {
  const [answerList, setAnswerList] = useState([]);
  const ref = useRef();

  const goNext = () => {
    ref.current?.swipeNext();
  };

  const answerQuestion = (val) => {
    ref.current?.swipeNext();
    setAnswerList([...answerList, val]);
  };

  const checkLastPage = () => {
    const one = answerList.filter((item) => item === 0).length;
    const two = answerList.filter((item) => item === 1).length;
    const three = answerList.filter((item) => item === 2).length;

    let max = one >= two ? one : two;
    max = max >= three ? max : three;

    const status = max === one ? 'one' : max === two ? 'two' : 'three';

    return {
      one: topic7,
      two: topic8,
      three: topic9,
    }[status];
  };
  console.log(checkLastPage());
  return (
    <div>
      <Swiper indicator={() => null} ref={ref} allowTouchMove={false}>
        <Swiper.Item>
          <div className="swiper_box firstPage">
            {/* <img src={topic4} alt="" className="postion" onClick={nativeClose} /> */}
            <img src={topic2} alt="" onClick={goNext} className="topic2" />
          </div>
        </Swiper.Item>
        {topicList.map((item, index) => (
          <Swiper.Item key={index}>
            <div className="swiper_box topicPage">
              <div className="topic_content">
                <div className="topic_title">问题{index + 1}/7</div>
                <div className="topic_question">{item.quesiton}</div>
                {item.answer.map((val, index) => (
                  <div
                    className="topic_white"
                    onClick={() => {
                      answerQuestion(index);
                    }}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </Swiper.Item>
        ))}
        <Swiper.Item>
          <div className={`swiper_box`}>
            <div className="lastPage_box">
              {/* <div className="lastPage_title">
                <div>
                  <img src={topic6} alt="" className="topic5" />
                </div>
                <img src={topic5} alt="" className="topic6" />
              </div> */}
              <div className="lastPage_line"></div>
              <img src={checkLastPage()} alt="" className="topic7" />
              <div className="goUrl" onClick={getDownload}></div>
            </div>
          </div>
        </Swiper.Item>
      </Swiper>
    </div>
  );
};

export default index;
