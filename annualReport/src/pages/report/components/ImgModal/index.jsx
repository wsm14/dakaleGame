import React, { useRef, useState, useEffect } from 'react';
import { Mask, ImageUploader } from 'antd-mobile';
import html2canvas from 'html2canvas';
import { makeB } from '@/utils/birdgeContent';
import './index.less';

import img2 from '@public/image/img2.png';
import img3 from '@public/image/img3.png';

import lastImg3 from '@public/image/lastImg3.png';

function index() {
  const imgRef = useRef();

  const [file, setFile] = useState('');

  useEffect(() => {
    // makeImage();
  }, []);

  const makeImage = () => {
    html2canvas(imgRef.current, {
      allowTaint: false,
      useCORS: true,
    }).then(function (canvas) {
      // toImage
      const base64 = canvas.toDataURL('image/png');
      // // base64转换blob
      const arr = base64.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      // eslint-disable-next-line no-plusplus
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const fileblob = new Blob([u8arr], { type: mime });
      // URL.createObjectURL(fileblob);
      console.log(URL.createObjectURL(fileblob));

      makeB(URL.createObjectURL(fileblob));
      // console.log('file', URL.createObjectURL(fileblob));
      // const alink = document.createElement('a');
      // alink.href = base64;
      // alink.download = 'testImg.jpg';
      // alink.click();
    });
  };

  const makeImage1 = () => {
    html2canvas(imgRef.current, {
      allowTaint: false,
      useCORS: true,
    }).then(function (canvas) {
      // toImage
      const base64 = canvas.toDataURL('image/png');
      // console.log('file', URL.createObjectURL(fileblob));
      const alink = document.createElement('a');
      alink.href = base64;
      alink.download = 'testImg.jpg';
      alink.click();
    });
  };

  const makeImageUpload = () => {
    if (!file) return;
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const alink = document.createElement('a');
        alink.href = reader.result;
        alink.download = 'downUploadImg.jpg';
        alink.click();
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const getUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      console.log(file, 'file');

      console.log(URL.createObjectURL(file));
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <>
      <Mask visible={true} style={{ '--z-index': '999' }}>
        <div className="reportData_bac" ref={imgRef}>
          <div className="reportData_content">
            <div className="reportData_top">
              <div className="consumption">
                <div className="consumption_title">全年总消费(元)</div>
                <div className="consumption_num">177,128.09</div>
              </div>
              <div className="consumption">
                <div className="consumption_title">全年卡豆总抵扣(卡豆)</div>
                <div className="consumption_num">177,128</div>
              </div>
            </div>
            <div className="saveMoney">
              <div className="saveMoney_title">全年卡豆为你省钱(元)</div>
              <div className="saveMoney_num">177,128.09</div>
            </div>
            <div className="reportData_center">
              <img src={lastImg3} alt="" />
              <div className="reportData_center_money">
                <div>
                  线上消费 <span>177,1.98</span>元
                </div>
                <div>
                  线下消费 <span>177,1.98</span>元
                </div>
              </div>
            </div>
            <div className="report_ranking">段位·段位名称</div>
            <div className="report_exceed">
              超过全国 <span>98%</span> 的用户
            </div>
            <div className="report_line"></div>
            <div className="report_keyWord">我的年度关键词</div>
            <div className="report_evaluate">深不可测</div>
            <div className="report_summary">
              今年会有机遇，也会有挑战，可能一夜暴富
              <br /> 也可能一举成名，当然离不开哒卡乐
            </div>
            <div>
              <button onClick={makeImage}>点击事件！！！！！！</button>
              <button onClick={makeImage1}>点击下载方法！！！！</button>
            </div>
            <div>
              <input accept="image/*" type={'file'} onChange={(e) => setFile(e.target.files[0])} />
              <button onClick={makeImageUpload}>点击下载上传的大文件</button>
            </div>
          </div>
        </div>
      </Mask>
    </>
  );
}

export default index;
