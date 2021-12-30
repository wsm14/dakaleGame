import React, { useState } from 'react';
import './index.less';
import { useSelector, useDispatch } from 'umi';

function index(props) {
  const { list = [] } = props;
  const [cardIndex, setCardIndex] = useState();
  const { packageObj } = useSelector((state) => state.receiveGoods); //商品信息
  const dispatch = useDispatch();
  return (
    <div className="scrollContent">
      {list.map((item, index) => (
        <div
          className="scrollCards"
          key={item.packageId}
          onClick={() => {
            setCardIndex(index);
          }}
        >
          <div className={`scrollCards-front ${cardIndex == index ? 'rotateY360' : null}`}></div>
          <div className={`scrollCards-back ${cardIndex == index ? 'rotateY180' : null}`}></div>
        </div>
      ))}
    </div>
  );
}

export default index;
