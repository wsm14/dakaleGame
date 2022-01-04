import React from 'react';
import Hilo, { DOMElement } from 'hilojs';
export const createTextureAtlas = (data) => {
  return new Hilo.TextureAtlas({
    ...data,
  });
};
