// import PropTypes from 'prop-types';
// import React, { Component } from 'react';
// import Child from './child';
// import './index.less';
// export default class index extends Component {
//   constructor() {
//     super();
//     this.state = {
//       data: 5,
//     };
//     this.child = React.createRef();
//   }

//   componentDidMount() {
//     console.log(this.child.current);
//     console.log(this.child.current.inputRef.current.value);
//     // this.child.current.buttonClick();
//   }

//   getValue = (e) => {
//     console.log(e, '获取子组件的值');
//   };

//   render() {
//     return (
//       <div>
//         <div className={this.state.data ? 'asd' : ''}></div>
//         <Child ref={this.child} getValue={this.getValue}></Child>
//       </div>
//     );
//   }
// }

import PropTypes from 'prop-types';
import React, { Component } from 'react';

const storeContext = React.createContext('111');

export default class index extends Component {
  constructor(props, context) {
    super(props, context);
    console.log(this.props, this.context, 'aaa');
  }
  componentDidMount() {
    console.log(this.context, '11111');
  }
  static getName() {
    console.log('wsm');
  }
  render() {
    return <div>{index.getName()}</div>;
  }
}
index.contextType = storeContext;
console.dir(index, 'index');
