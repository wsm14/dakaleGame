import React from 'react';
import loading from '@/assert/image/loadSceneBg.png';
import lineBox from '@/assert/image/loadLiner.png';
import './index.less';
export default ({ current, total }) => {
  console.log(current, total);
  return (
    <div className="loading_box">
      <img className="loading_img" src={loading} />
      <div className="load_lineBox">
        <img className="loading_img" src={lineBox} />
        <div className="loading_liner"
         style={{ width: (current / total) * 100 + '%' }}
         ></div>
      </div>
    </div>
  );
};
