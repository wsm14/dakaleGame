import React from 'react';
import './index.less';
import checkon from '@public/checkon.png';
import checkoff from '@public/checkoff.png';

function index(props) {
  const { list = [] } = props;
  return (
    <div className="scrollContent">
      {list.map((item) => (
        <div className="scrollGoods" key={item}>
          <div>
            <img src={checkon} className="scrollGoods_checkImg" />
          </div>
          <div className="scrollGoods_contentImg">
            <img src={checkon} className="scrollGoods_goodsImg" />
          </div>
          <div className="scrollGoods_name">安格斯原切牛排250g</div>
        </div>
      ))}
    </div>
  );
}

export default index;
