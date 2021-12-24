import React, { useState, useEffect, useRef } from 'react';
import './index.less';

let startY = 0; // touch的起始Y坐标
function index(props) {
  const { list = [1, 2, 3, 4, 5] } = props;
  const [pageIndex, setPageIndex] = useState(0); // 当前在第几屏，从0开始算
  const pageRef = useRef();

  useEffect(() => {
    const root = pageRef.current;
    root.addEventListener('touchstart', handleTouchStart);
    root.addEventListener('touchend', handleTouchEnd);
    root.addEventListener('touchmove', handleTouchMove);
    return () => {
      root.removeEventListener('touchstart', handleTouchStart);
      root.removeEventListener('touchend', handleTouchEnd);
      root.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    anmateFunc();
  }, [pageIndex]);

  //当手指触摸屏幕时候触发
  const handleTouchStart = (e) => {
    startY = e.changedTouches[0].clientY;
  };

  //当手指在屏幕上滑动的时候连续地触发
  const handleTouchMove = (e) => {
    //当前鼠标的垂直坐标
    const y = e.changedTouches[0].clientY;
    console.log(y);
    const deltaY = y - startY;
    const height = pageRef.current.offsetHeight;
    const len = list.length;
    console.log(height, pageIndex, deltaY, height * pageIndex - deltaY);
    if (pageIndex === 0 && deltaY > 0) {
      return;
    }
    if (pageIndex === len - 1 && deltaY < 0) {
      return;
    }
    pageRef.current.style.top = `${-(height * pageIndex - deltaY)}px`;
  };

  //当手指从屏幕上离开的时候触发
  const handleTouchEnd = (e) => {
    //当前鼠标的坐标
    const y = e.changedTouches[0].clientY;
    console.log(y, '结束手指离开的坐标');
    console.log(startY, '开始坐标');

    const deltaY = y - startY;
    let pageIndex1 = pageIndex;
    const len = list.length;
    if (deltaY > 50) {
      if (pageIndex1 > 0) {
        pageIndex1 -= 1;
      }
    } else if (deltaY < -50) {
      if (pageIndex1 < len - 1) {
        pageIndex1 += 1;
      }
    }
    setPageIndex(pageIndex1);
  };

  const anmateFunc = () => {
    const currentStr = pageRef.current.style.top;
    let current = 0;
    if (currentStr) {
      current = Number(currentStr.slice(0, currentStr.length - 2));
    }
    const height = pageRef.current.offsetHeight;
    const target = -(height * pageIndex);
    const delta = target - current;
    const part = delta / 20;

    const moveOnce = (i) => {
      pageRef.current.style.top = `${current + i * part}px`;
      if (++i < 21) {
        ((index) => {
          setTimeout(() => {
            moveOnce(index);
          }, 10);
        })(i);
      }
    };
    moveOnce(1);
  };

  const colors = ['red', 'orange', 'yellow', 'green'];

  return (
    <>
      <div className="reportBox" ref={pageRef}>
        {list.map((child, index) => {
          return (
            <div
              className={`page ${pageIndex === index ? 'active' : ''}`}
              style={{ background: colors[index] }}
              key={`page-${index}`}
            >
              <div
                style={{ fontSize: '1rem' }}
                className={`animate ${
                  index % 2 === 0 ? 'animate-slideLeft' : 'animate-slideRight'
                }`}
              >
                {child}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default index;
