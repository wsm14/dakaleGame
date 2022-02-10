import React, { useState } from 'react';
import { useEffect } from 'react';
import { history } from 'umi';
import './index.less';
export default () => {
  const [step, setStep] = useState(null);
  useEffect(() => {
    let flag = window.localStorage.getItem('dakale_new');
    if (!flag) {
      setStep(0);
      document.getElementsByTagName('body')[0].className = 'adm-overflow-hidden';
    }
  }, []);
  const template = {
    0: (
      <div className="step_box step_box_child0">
        <div className="step_one"></div>
        <div className="step_font">
          <div className="step_font_box">成长值满后领取钥匙可以开盲盒哦</div>
          <div className="step_font_icon"></div>
        </div>
        <div
          className="step_btn"
          onClick={() => {
            setStep(1);
          }}
        >
          下一步
        </div>
      </div>
    ),
    1: (
      <div className="step_box step_box_child1">
        <div className="step_one"></div>
        <div className="step_font">
          <div className="step_font_box">偷偷告诉你，这里也可以获得额外成长值</div>
          <div className="step_font_icon"></div>
        </div>
        <div
          className="step_btn"
          onClick={() => {
            setStep(2);
          }}
        >
          知道了
        </div>
      </div>
    ),
    2: (
      <div className="step_box step_box_child2">
        <div className="step_one"></div>
        <div className="step_font">
          <div className="step_font_box">在这里可以查看盲盒橱窗</div>
          <div className="step_font_icon"></div>
        </div>
        <div
          className="step_btn"
          onClick={() => {
            window.localStorage.setItem('dakale_new', true);
            document.getElementsByTagName('body')[0].className = '';
            setStep(null);
            setTimeout(() => {
              history.push('/blind');
            }, 1000);
          }}
        >
          去看看
        </div>
      </div>
    ),
  }[step];
  if (template) {
    return template;
  } else return null;
};
