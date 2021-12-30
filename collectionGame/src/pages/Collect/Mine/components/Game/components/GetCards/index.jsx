import React, { useState } from 'react';
import { history } from 'umi';
import './index.less';
import TitleBlock from '@/components/TitleBlock';
import Cloud from '@/components/Cloud';
import TurnTable from './components/TurnTable';
import TaskCloumn from './components/TaskCloumn';
import BeanCardModal from '@/components/BeanCardModal';
import { nativeClose } from '@/utils/birdgeContent';

import getCard_button from '@public/loading/getCard_button.png';
import getCard_script from '@public/loading/getCard_script.png';

function index() {
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
            <img src={getCard_script} alt="" className="getCards_script" />
          </div>
        </div>

        {/* 下面部分 */}
        <div className="getCards_content">
          {/* 转盘 */}
          <TurnTable></TurnTable>
          <div className="getMore"></div>
          {/* 任务列表 */}
          <TaskCloumn></TaskCloumn>
        </div>
      </div>
      {/* 福卡弹窗 */}
      <BeanCardModal></BeanCardModal>

      <Cloud></Cloud>
    </>
  );
}

export default index;
