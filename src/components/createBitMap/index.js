import React from 'react';
import Hilo, { DOMElement } from 'hilojs';
export const createBitmap = ({ list }) => {
  return list.map((item) => {
    const { type = 'Bitmap', visible } = item;
    const element = new Hilo[type]({
      ...item,
    });
    return !visible && element;
  });
};
