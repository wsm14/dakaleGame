import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SpinLoading } from 'antd-mobile';
import './index.less';
import { fetchReportGetAnnualReport } from '@/services/report';
import html2canvas from 'html2canvas';
import { makeReport } from '@/utils/birdgeContent';
import { getToken } from '@/utils/birdgeContent';
import { reloadTab } from '@/utils/utils';
import SwiperChildren from './components/SwiperChildren';
import ReportIcon from './components/ReportIcon';
import ImgModal from './components/ImgModal';

import topIcon from '@public/image/topIcon.png';

function index() {
  const [pageIndex, setPageIndex] = useState(0); //跳转到第几页
  const [audioFlag, setAudioFlag] = useState(true);
  const [detail, setDetail] = useState({}); //年度报告内容
  const [loadVisible, setLoadVisible] = useState(false); //年度报告内容

  const reportRef = useRef();

  useEffect(() => {
    reloadTab(() => {
      if (sessionStorage.getItem('dakaleToken')) {
        getReportDetail();
      }
    });
    getReportDetail();
  }, []);

  const getReportDetail = async () => {
    const res = await fetchReportGetAnnualReport({
      reportYear: '2021',
    });
    const { content = {} } = res;
    setDetail(content);
  };

  //画海报
  const makeImage = () => {
    setLoadVisible(true);
    html2canvas(reportRef.current, {
      useCORS: true,
      scale: window.devicePixelRatio < 3 ? window.devicePixelRatio : 2,
    }).then(function (canvas) {
      const base64 = canvas.toDataURL('image/png');
      // // base64转换
      setLoadVisible(false);
      makeReport(`shareType=wechat,${base64}`);
    });
  };

  const list = [0, 1, 2, 3, 4, 5];
  // const list = [5];

  return (
    <>
      <Swiper
        direction="vertical"
        className="swiperContent"
        onIndexChange={(e) => {
          setPageIndex(e);
        }}
        indicator={() => null}
      >
        {list.map((item, index) => (
          <Swiper.Item key={item}>
            <SwiperChildren
              index={item}
              pageIndex={pageIndex}
              detail={detail}
              makeImage={makeImage}
            ></SwiperChildren>
          </Swiper.Item>
        ))}
      </Swiper>

      {/* 分享和音乐图标 */}
      <ReportIcon audioFlag={audioFlag} setAudioFlag={setAudioFlag}></ReportIcon>
      <div
        className="SpinLoading"
        className={`SpinLoading ${loadVisible ? null : 'SpinLoading_hide'}`}
      >
        <SpinLoading color="currentColor"></SpinLoading>
      </div>
      {/* 上滑动图标 */}
      {pageIndex < 5 && (
        <div className="topIcon">
          <img src={topIcon} alt="" />
        </div>
      )}
      {Object.keys(detail).length && <ImgModal detail={detail} ref={reportRef}></ImgModal>}
    </>
  );
}

export default index;
