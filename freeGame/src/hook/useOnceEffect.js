import { useEffect, useRef } from 'react';

export const useOnce = (fn, list) => {
  const ref = useRef(false);

  useEffect(() => {
    if (!ref.current) {
      fn();
      ref.current = true;
    }
  }, [...list]);
};
