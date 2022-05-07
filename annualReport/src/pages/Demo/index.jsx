import { useCallback, useEffect, useLayoutEffect } from 'react';
import './index.less';
import Child from './child';
function index() {
  const [num, setNumber] = React.useState(0);
  console.log('111');
  const handleClick = () => {
    setNumber((val) => val + 1);
    setNumber((val) => val + 1);
    setNumber((val) => val + 1);
  };
  // useEffect(() => {
  //   let i = 0;
  //   while (i <= 100000000) {
  //     i++;
  //   }
  //   setNumber('world hello');
  // }, []);

  // useLayoutEffect(() => {
  //   console.log('layout渲染');
  // }, []);
  return (
    <div className="a">
      {/* <Child handleClick={handleClick}></Child> */}
      <button onClick={handleClick}>{num}</button>
    </div>
  );
}
export default index;
