import React from 'react';
import './index.less';

import meledLogo from '@public/image/meledLogo.png';
import brandInfoIcon from '@public/image/brandInfoIcon.png';

const index = () => {
  return (
    <div className="meledInfo">
      <div className="meledInfo_top">
        <img src={meledLogo} alt="" className="meledInfo_titleImg" />
        <div className="meledInfo_label">
          <div>MYLIKE杭州美莱医疗美容医院</div>
          <img src={brandInfoIcon} alt="" />
        </div>
      </div>

      <div className="meledInfo_brand">
        <div className="modular_title">品牌介绍</div>
        <div className="meledInfo_brand_intru">
          "美莱(MYLIKE)"致力于为每个求美者，塑造更精致的外表，收获更独立、勇敢、自信的内心，走向更美丽的人生，活出更加精彩的自己!遇见美莱，成就更出色的自己!
        </div>
        <div className="meledInfo_brand_intru meledInfo_brand_intru_top">
          美莱(MYLIKE)医疗美容(连锁)医院集团，一直秉承"铸行业标准，创百年美莱"的品牌愿景，放眼二十多年的品牌沉淀和稳步发展，美莱品牌已在29个城市，成立了36家大规模医疗美容医院，是全国连锁的医疗品牌。美莱集团汇聚了国内外众多博士级骨干医师，参与了多项国内医美专利技术的研发，肩负着推动医美行业健康发展的崇高使命。
        </div>
      </div>
    </div>
  );
};

export default index;
