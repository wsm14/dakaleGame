// https://umijs.org/config/
import { defineConfig } from 'umi';
import routes from './router.config';
import define from './env.config';

const path = require('path');
const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  fastRefresh: {},
  history: { type: 'hash' },
  esbuild: {},
  antd: {},
  dva: {
    hmr: true,
  },
  alias: {
    '@public': path.resolve(__dirname, '../public'),
  },
  publicPath: './',
  lessLoader: { javascriptEnabled: true },
  // chunks: ['vendors', 'umi'],
  chainWebpack: function (config, {}) {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendors: {
              // 基本框架
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
            },
            antdesigns: {
              name: 'antdesigns',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
              priority: 11,
            },
            jsdk: {
              name: 'jsdk',
              chunks: 'initial',
              test: /[\\/]node_modules[\\/](lodash|moment)[\\/]/,
              priority: 11,
            },
            'async-commons': {
              // 其余异步加载包
              chunks: 'async',
              minChunks: 2,
              name: 'async-commons',
              priority: 9,
            },
          },
        },
      },
    });
  },
  nodeModulesTransform: {
    type: 'none',
  },
  targets: {
    ie: 11,
    firefox: false,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  ...define[REACT_APP_ENV || 'dev'],
});
