import React, { useState } from 'react';
import './index.less';
import { useSelector, useDispatch } from 'umi';
import backImg from '@public/loading/back.png';

function index(props) {
  const { list = [], checkCard } = props;
  const [cardIndex, setCardIndex] = useState();
  return (
    <div className="scrollContent">
      {list.map((item, index) => (
        <div
          className="scrollCards"
          key={`${index}1`}
          onClick={() => {
            console.log(item);
            // if (!cardIndex) {
            setCardIndex(index);
            checkCard(item);
            // }
          }}
        >
          <img
            src={item.cardImg}
            className={`scrollCards-front ${cardIndex == index ? 'rotateY360' : null}`}
          />
          <img
            src={backImg}
            className={`scrollCards-back ${cardIndex == index ? 'rotateY180' : null}`}
          />
          {/* <div className={`scrollCards-front ${cardIndex == index ? 'rotateY360' : null}`}></div>
          <div className={`scrollCards-back ${cardIndex == index ? 'rotateY180' : null}`}></div> */}
        </div>
      ))}
    </div>
  );
}

export default index;
