import React, { useMemo } from 'react';

// const areEqual = (prevProps, nextProps) => {
//   console.log(prevProps, nextProps);
//   return false;
// };

const child = React.memo((props) => {
  console.log(111, props);
  return <div>{props.num}</div>;
});

export default child;
