import { LoadQueue } from 'hilojs';

/**
 * 预加载文件处理
 *
 * @param {list}  加载数据列表
 * @param {Boolean} fn 回调导出当前加载数量
 * @returns
 */
export const uploadResponents = (list = [], fn) => {
  let responents = new LoadQueue();
  responents.add(list);
  responents.start();
  responents.on('load', function (e) {
    console.log(responents.getTotal());
    fn && fn(responents.getLoaded(), responents);
  });
  responents.on('error', function (e) {
    console.log('error:', e.detail);
  });
  responents.on('complete', function (e) {
    console.log(e);
  });
};
