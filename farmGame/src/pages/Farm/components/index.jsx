import React, { useState, useEffect } from 'react';
import { uploadResponents } from '@/components/uploadRes/index';
import { imgList } from '@/common/goods';
import Loading from '../components/Loading';
import Content from './Content';

const index = () => {
  const [state, setState] = useState(); //加载到哪张图片
  const [imgFlag, setImgFlag] = useState(false);
  const [imgObj, setImgObj] = useState({}); //图片集合
  useEffect(() => {
    loadImgs();
  }, []);
  const loadImgs = () => {
    uploadResponents(
      imgList,
      (e) => {
        setState(e);
      },
      (_, val) => {
        setImgObj(val);
        setImgFlag(true);
      },
    );
  };
  return (
    <>
      {imgFlag ? (
        <Content imgObj={imgObj}></Content>
      ) : (
        <Loading current={state} total={imgList.length}></Loading>
      )}
    </>
  );
};

export default index;
