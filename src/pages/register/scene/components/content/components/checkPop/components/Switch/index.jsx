import React, { useState, useEffect } from 'react';

import './index.less';
export default ({ value, onChange }) => {
  const [falg, setFlag] = useState(false);
  useEffect(() => {
    setFlag(value);
  }, [value]);
  return (
    <div
      className={`switch_box ${falg ? 'switch_box_bg1' : 'switch_box_bg2'}`}
      onClick={() => {
        setFlag(() => {
          onChange(!falg);
          return !falg;
        });
      }}
    >
      <div
        className={`switch_radius ${falg ? 'switch_radius_anmate2' : 'switch_radius_anmate1'}`}
      ></div>
    </div>
  );
};
