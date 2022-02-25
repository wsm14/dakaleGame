import React from 'react';
import './index.less';
import { useSelector, useDispatch } from 'umi';
import checkon from '@/asstes/common/checkon.png';
import checkoff from '@/asstes/common/checkoff.png';

function index(props) {
  const { list = [] } = props;
  const { packageObj } = useSelector((state) => state.farmGame); //商品信息
  const dispatch = useDispatch();
  return (
    <div className="scrollContent">
      {list.map((item) => (
        <div
          className="scrollGoods"
          key={item.identification}
          onClick={() => {
            dispatch({
              type: 'farmGame/save',
              payload: {
                packageObj: item,
              },
            });
          }}
        >
          <div>
            <img
              src={packageObj.identification == item.identification ? checkon : checkoff}
              className="scrollGoods_checkImg"
            />
          </div>
          <div className="scrollGoods_contentImg">
            <img src={item.rewardImg} className="scrollGoods_goodsImg" />
          </div>
          <div className="scrollGoods_name">{item.treeName}</div>
        </div>
      ))}
    </div>
  );
}

export default index;
