import React from 'react';
import './index.less';

const index = ({ current, total }) => {
  return (
    <>
      <div className="load">
        <div className="loadBottom">
          <div className="loadingLiner" style={{ width: (current / total) * 100 + '%' }}></div>
        </div>
      </div>
    </>
  );
};

export default index;
