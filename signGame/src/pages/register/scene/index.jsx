import React from 'react';
import Views from './components/index';
import { KeepAlive } from 'umi';
class Index extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }
  render() {
    return (
      <KeepAlive>
        <Views></Views>
      </KeepAlive>
    );
  }
}

export default Index;
