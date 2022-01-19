import { useEffect, useRef } from 'react';

export const useOnceEffect = (fn, list) => {
  const ref = useRef(false);
  useEffect(() => {
    if (!ref.current) {
      // fn();
      ref.current = true;
    }
  }, [list]);
};
