import { useEffect, useRef, useState } from 'react';

export const useOnceEffect = (fn, deps) => {
  const [count, setCount] = useState();
  const ref = useRef(false);
  console.log(deps);
  useEffect(() => {
    console.log('改变就是好事');
  }, deps);

  // useEffect(() => {
  //   if (!ref.current) {
  //     // fn();
  //     ref.current = true;
  //   }
  // }, [list]);
};
