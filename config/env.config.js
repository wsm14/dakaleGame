const target = 'https://devgateway.dakale.net';

export default {
  dev: {
    define: {
      APIURL: 'https://devgateway.dakale.net',
    },
    proxy: {
      '/user': {
        target: target,
        changeOrigin: true,
      },
      '/common': {
        target: target,
        changeOrigin: true,
      },
    },
  },
  test: {
    define: {
      APIURL: 'https://devgateway.dakale.net',
    },
    proxy: {
      '/api/': {
        target: 'your pre url',
        changeOrigin: true,
      },
    },
  },
  // 预发布环境
  pre: {
    define: {
      APIURL: 'https://pregateway.dakale.net',
    },
  },
  // 生产环境proxy代理 不生效
  prod: {
    define: {
      APIURL: 'https://gateway1.dakale.net',
      // APIURL: 'https://devgateway.dakale.net',
    },
  },
};