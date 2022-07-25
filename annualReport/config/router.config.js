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
  {
    path: '/topic',
    name: '',
    component: './SinglePage/TopicGame',
  },
  {
    path: '/free',
    name: '哒卡乐翻天',
    component: './SinglePage/freeCharge',
  },
  {
    path: '/coupon',
    name: '哒卡乐翻天',
    component: './SinglePage/Coupon',
  },
  {
    path: '/help',
    name: '助力',
    component: './SinglePage/Help',
  },
  {
    path: '/address',
    name: '地址列表',
    component: './SinglePage/Address',
  },
];
