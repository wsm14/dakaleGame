import React, { useState } from 'react';
import { history } from 'umi';
import './index.less';
import TitleBlock from '@/components/TitleBlock';
import Cloud from '@/components/Cloud';
import TurnTable from './components/TurnTable';
import TaskCloumn from './components/TaskCloumn';
import { nativeClose, linkToSecret, deviceName, homeShare } from '@/utils/birdgeContent';

import getCard_button from '@public/loading/getCard_button.png';
import getCard_script from '@public/loading/getCard_script.png';
import homeShareIcon from '@public/image/homeShareIcon.png';

function index(props) {
  const { openModal, gameDetail, getGameDetail } = props;
  const { gameInfo = {} } = gameDetail;
  const {
    gameBalance, //抽奖次数
  } = gameInfo;
  //点击返回按钮
  const goBack = () => {
    nativeClose();
  };
  return (
    <>
      <div className="getCards">
        <div className="getCards_topImg">
          <TitleBlock back={goBack}></TitleBlock>
          <div className="getCards_doubleImg">
            <img
              src={getCard_button}
              alt=""
              className="getCards_button"
              onClick={() => {
                history.push('/myCard');
              }}
            />
            <img
              src={getCard_script}
              alt=""
              className="getCards_script"
              onClick={() => {
                if (deviceName() === 'miniProgram') {
                  history.push('/secret');
                } else {
                  linkToSecret();
                }
              }}
            />
            {deviceName() !== 'miniProgram' && (
              <img
                src={homeShareIcon}
                alt=""
                className="getCards_homeShareIcon"
                onClick={homeShare}
              />
            )}
          </div>
        </div>

        {/* 下面部分 */}
        <div className="getCards_content">
          {/* 转盘 */}
          <TurnTable
            openModal={openModal}
            getGameDetail={getGameDetail}
            gameBalance={gameBalance}
            gameDetail={gameDetail}
          ></TurnTable>
          <div className="getMore"></div>
          {/* 任务列表 */}
          <TaskCloumn getGameDetail={getGameDetail}></TaskCloumn>
        </div>
      </div>
      {/* <Cloud></Cloud> */}
    </>
  );
}

export default index;
