export default [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/brand',
    name: '商品详情',
    component: './SinglePage/Meled',
  },
  {
    path: '/brandInfo',
    name: '品牌介绍',
    component: './SinglePage/MeledInfo',
  },
  {
    path: '/homePage',
    name: '',
    component: './homePage',
  },
  {
    path: '/report',
    name: '',
    component: './report',
  },
  {
    path: '/demo',
    name: '',
    component: './Demo',
  },
];
