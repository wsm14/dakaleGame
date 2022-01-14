import React from 'react';
import Hilo from 'hilojs';
export const createBitmapText = (data) => {
  return new Hilo.BitmapText({
    ...data,
  });
};
