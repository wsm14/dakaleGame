import React from 'react';
import CheckGoods from './components/CheckGoods';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import HelpModal from '@/components/HelpModal';
import Game from './components/Game';
import './index.less';

const index = (props) => {
  const { imgObj, gameDetail, getGameDetail } = props;
  const {
    pageFlag, //标识
    gameProcessStrapInfo = {},
  } = gameDetail;
  return (
    <>
      {/* <TransitionGroup> */}
      {pageFlag === '0' && (
        // <CSSTransition timeout={500} classNames="transtionBox">
        <div>
          <CheckGoods gameDetail={gameDetail} getGameDetail={getGameDetail}></CheckGoods>
        </div>
        // </CSSTransition>
      )}
      {pageFlag === '1' && (
        // <CSSTransition timeout={500} classNames="transtionBox">
        <div>
          <Game gameDetail={gameDetail} getGameDetail={getGameDetail} imgObj={imgObj}></Game>
        </div>
        // </CSSTransition>
      )}
      {/* </TransitionGroup> */}

      {/* 帮助弹窗 */}
      <HelpModal getGameDetail={getGameDetail} data={gameProcessStrapInfo} />
    </>
  );
};

export default index;
