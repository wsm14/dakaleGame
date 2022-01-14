import React from 'react';
import Hilo, { DOMElement } from 'hilojs';
export const createBitmap = ({ list }) => {
  return list.map((item) => {
    return new Hilo.Bitmap({
      ...item,
    });
  });
};
