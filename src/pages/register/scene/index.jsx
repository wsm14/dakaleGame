import React from 'react';
import Hilo from 'hilojs';
import Loading from './components/loading';
import Content from './components/content';
import { list } from './components/responents';
import { uploadResponents } from '@/components/uploadRes';
class Index extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      resState: true,
      responseList: list,
      responentObj: null,
      current: 0,
    };
  }
  async componentDidMount() {
    await this.readResponents();
  }
  readResponents() {
    const { responseList } = this.state;
    uploadResponents(responseList, (e, obj) => {
      this.setState(
        {
          current: e,
        },
        (res) => {
          if (e === responseList.length) {
            this.setState({ resState: false, responentObj: obj });
          }
        },
      );
    });
  }
  render() {
    const { resState, current, responseList, responentObj } = this.state;
    if (!resState) {
      return <Content responent={responentObj}></Content>;
    } else {
      return <Loading current={current} total={responseList.length}></Loading>;
    }
  }
}

export default Index;
