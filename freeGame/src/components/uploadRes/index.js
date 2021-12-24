import { LoadQueue } from 'hilojs';
export const uploadResponents = (list = [], fn, fn2) => {
  let responents = new LoadQueue();
  responents.add(list);
  responents.start();
  responents.on('load', function (e) {
    fn && fn(responents.getLoaded());
  });
  responents.on('error', function (e) {});
  responents.on('complete', function (e) {
    responents.off('complete');
    const imgObj = list.reduce((prev, cur) => {
      prev[cur.id] = responents.getContent(cur.id);
      return prev;
    }, {});
    fn && fn2(responents.getLoaded(), imgObj);
  });
};
