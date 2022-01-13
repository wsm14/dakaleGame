import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './index.less';

function BasicLayout(props) {
  const { children, location, history } = props;
  const ANIMATION_MAP = {
    PUSH: 'forward',
    POP: 'back',
  };

  return (
    <>
      <TransitionGroup
        childFactory={(child) =>
          React.cloneElement(child, { classNames: ANIMATION_MAP[history.action] })
        }
      >
        <CSSTransition timeout={300} key={location.pathname}>
          <div>{children}</div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default BasicLayout;
