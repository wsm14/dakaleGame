import React from 'react';
import './index.less';

function index() {
  return (
    <div className="ruleBox">
      <div className="ruleText">
        1. 选择完奖品在活动期间不可更换，知道当前奖品领取后重新参与活动进行选择；
      </div>
      <div className="ruleText">2. 补给站的星豆为隔日领取，领取后即可获得相应的星豆值；</div>
      <div className="ruleText">3.任务签到中，每天需连续签到，如断签一天则重新签到；</div>
      <div className="ruleText">4.邀请合力支持新老用户一起参与活动；</div>
      <div className="ruleText">5.获得的商品不退不换；</div>
      <div className="ruleText">
        6.活动期间系统会判定账号是否存在违规行为，一经发现，将会面临平台惩罚；
      </div>
      <div className="ruleText">7.有任何问题可联系平台客服400-800-5881。</div>
    </div>
  );
}

export default index;
