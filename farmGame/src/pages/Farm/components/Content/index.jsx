import React from 'react';
import CheckGoods from './components/CheckGoods';
import Game from './components/Game';

const index = (props) => {
  const { imgObj, gameDetail, getGameDetail } = props;
  return (
    <>
      {/* <CheckGoods></CheckGoods> */}
      <Game imgObj={imgObj}></Game>
    </>
  );
};

export default index;
