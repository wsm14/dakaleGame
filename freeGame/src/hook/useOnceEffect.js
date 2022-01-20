import { useEffect, useRef, useState } from 'react';

export const useOnceEffect = (fn, deps, flag = true) => {
  const ref = useRef(false);
  // useEffect(() => {
  //   console.log('改变就是好事');
  // }, deps);

  useEffect(() => {
    if (flag && !ref.current) {
      fn();
      ref.current = true;
    }
  }, deps);
};
