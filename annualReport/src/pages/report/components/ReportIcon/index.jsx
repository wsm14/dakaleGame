import React, { useState, useRef, useEffect } from 'react';
import './index.less';
import musicIcon from '@public/image/musicIcon.png';
import musicIcon1 from '@public/image/musicIcon1.png';

import shareIcon from '@public/image/shareIcon.png';
import music from '@public/image/music.mp3';

function index() {
  const audioRef = useRef();
  const [bol, setBol] = useState(false);
  // useEffect(() => {
  //   audioRef.current.play();
  //   audioRef.current.muted = false;
  // }, []);
  const check = () => {
    if (bol) {
      audioRef.current.pause();
      audioRef.current.muted = false;
    } else {
      audioRef.current.play();
      audioRef.current.muted = false;
    }
    setBol(!bol);
  };
  return (
    <>
      <audio src={music} autoPlay muted ref={audioRef} />

      {/* 分享图标 */}
      <div className="shareIcon">
        <img src={shareIcon} alt="" />
      </div>
      {/* 音乐图标 */}
      <div className="musicIcon" onClick={check}>
        {bol ? <img src={musicIcon} alt="" /> : <img src={musicIcon1} alt="" />}
      </div>
    </>
  );
}

export default index;
