export default [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: '选商品',
    component: './index',
  },
  {
    path: '/address',
    name: '收货地址',
    component: './Address',
  },
  {
    path: '/rule',
    name: '规则',
    component: './Rule',
  },
];
