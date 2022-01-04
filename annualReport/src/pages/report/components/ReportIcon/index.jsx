import React, { useState, useRef, useEffect } from 'react';
import './index.less';
import musicIcon from '@public/image/musicIcon.png';
import musicIcon1 from '@public/image/musicIcon1.png';

import shareIcon from '@public/image/shareIcon.png';
import music from '@public/image/music.mp3';

const index = (props) => {
  const { audioFlag, setAudioFlag } = props;
  const audioRef = useRef();
  useEffect(() => {
    if (audioFlag) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [audioFlag]);

  const check = () => {
    setAudioFlag(!audioFlag);
  };
  return (
    <>
      <audio src={music} ref={audioRef} loop />

      {/* 分享图标 */}
      <div className="shareIcon">
        <img src={shareIcon} alt="" />
      </div>
      {/* 音乐图标 */}
      <div className="musicIcon" onClick={check}>
        {audioFlag ? <img src={musicIcon} alt="" /> : <img src={musicIcon1} alt="" />}
      </div>
    </>
  );
};

export default index;
