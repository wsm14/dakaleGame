export default [
  {
    path: '/',
    redirect: '/collect',
  },
  {
    path: '/collect',
    name: '集碎片',
    component: './Collect',
  },
  {
    path: '/myCard',
    name: '我的福卡',
    component: './MyCard',
  },
  {
    path: '/address',
    name: '收货地址',
    component: './Address',
  },
];
