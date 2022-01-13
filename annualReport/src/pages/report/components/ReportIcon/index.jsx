import React, { useState, useRef, useEffect } from 'react';
import './index.less';
import { deviceName } from '@/utils/birdgeContent';
import { reloadTab } from '@/utils/utils';
import musicIcon from '@public/image/musicIcon.png';
import musicIcon1 from '@public/image/musicIcon1.png';
import shareIcon from '@public/image/shareIcon.png';
import music from '@public/image/music.mp3';

const index = (props) => {
  const { audioFlag, setAudioFlag, type } = props;
  console.log(audioFlag);
  const pauseRef = useRef(1);
  const audioRef = useRef();

  useEffect(() => {
    reloadTab(
      () => {
        console.log(pauseRef.current, '222222');
        if (audioRef?.current?.paused && pauseRef.current) {
          audioRef?.current?.play();
        }
      },
      () => {
        audioRef?.current?.pause();
      },
    );
  }, []);

  useEffect(() => {
    if (audioFlag) {
      pauseRef.current = 1;
      audioRef.current.play();
    } else {
      pauseRef.current = 0;
      audioRef.current.pause();
    }
  }, [audioFlag]);

  const check = () => {
    setAudioFlag(!audioFlag);
  };
  return (
    <>
      <div style={{ display: type === 'home' ? 'none' : 'block' }}>
        <audio src={music} ref={audioRef} loop />
        {/* 音乐图标 */}
        <div className="musicIcon" onClick={check}>
          <img src={audioFlag ? musicIcon : musicIcon1} alt="" />
        </div>
      </div>
    </>
  );
};

export default index;
