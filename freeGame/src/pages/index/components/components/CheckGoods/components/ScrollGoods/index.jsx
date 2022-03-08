import React from 'react';
import './index.less';
import { useSelector, useDispatch } from 'umi';
import checkon from '@public/usual/checkon.png';
import checkoff from '@public/usual/checkoff.png';

function index(props) {
  const { list = [] } = props;
  const { packageObj } = useSelector((state) => state.receiveGoods); //商品信息
  const dispatch = useDispatch();
  return (
    <div className="scrollContent">
      {list.map((item) => (
        <div
          className="scrollGoods"
          key={item.packageId}
          onClick={() => {
            dispatch({
              type: 'receiveGoods/save',
              payload: {
                packageObj: item,
              },
            });
          }}
        >
          <div>
            <img
              src={packageObj.packageId == item.packageId ? checkon : checkoff}
              className="scrollGoods_checkImg"
            />
          </div>
          <div className="scrollGoods_contentImg">
            <img src={item.packageImg} className="scrollGoods_goodsImg" />
          </div>
          <div className="scrollGoods_name">{item.packageName}</div>
        </div>
      ))}
    </div>
  );
}

export default index;
