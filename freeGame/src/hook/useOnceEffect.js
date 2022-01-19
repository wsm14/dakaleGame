import { useEffect, useRef } from 'react';

export const useOnceEffect = (fn, list) => {
  const ref = useRef(false);
  console.log([...list]);
  useEffect(() => {
    if (!ref.current) {
      fn();
      ref.current = true;
    }
  }, [...list]);
};
