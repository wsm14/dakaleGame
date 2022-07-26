import React from 'react';
import './index.less';
import { history } from 'umi';
import backImg from '@public/usual/back.png';
import homeShareIcon from '@public/usual/homeShareIcon.png';
import { linkToMyGoods, nativeClose, deviceName, homeShare } from '@/utils/birdgeContent';

function index() {
  const goBack = () => {
    nativeClose();
  };
  return (
    <div className={`topRules ${deviceName() == 'miniProgram' ? 'topPadding1' : 'topPadding'}`}>
      {deviceName() == 'miniProgram' ? (
        <div></div>
      ) : (
        <img src={backImg} alt="" className="backImg" onClick={goBack} />
      )}

      <div className="topRules_right">
        {deviceName() !== 'miniProgram' && (
          <img src={homeShareIcon} alt="" className="topRules_rightIcon" onClick={homeShare} />
        )}
        <div className="topButton">
          <div
            className="topButton_rule"
            onClick={() => {
              window.location.href =
                'https://resource-new.dakale.net/product/html/rule/64c02191-8838-4301-4c46-18409012033c.html?shareKey=1473476250744676353?newPage=true&&showTitle=true';
            }}
          >
            规则
          </div>
          <div className="topButton_line"></div>
          <div className="topButton_record" onClick={linkToMyGoods}>
            收获
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
