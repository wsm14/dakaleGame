var fs = require('fs');
const compressing = require('compressing');
const request = require('request');
let components = [];
function deleteFolder(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file, index) {
      let curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}
//文件夹
const mkdir = async (filepath) => {
  deleteFolder(filepath);
  fs.mkdirSync(filepath);
  addJson();
  let zipName = await addZip();
  var boundaryKey = '----WebKitFormBoundary' + new Date().getTime();
  let jsonInfo = fs.createReadStream('./uploadPage/MappingTable.json');
  let zipInfo = fs.createReadStream(`./uploadPage/${zipName}`);
  request(
    {
      url: `https://devgateway.dakale.net/user/sign/game/feedFood`,
      method: 'POST',
      formData: {
        MappingTable: jsonInfo,
        zipName: zipInfo,
      },
      headers: {
        'Content-Type': 'multipart/form-data; boundary=' + boundaryKey,
      },
    },
    function (err, response, body) {
      console.log(err, response, body);
      //回调里面处理成功和失败
      if (err) {
      } else {
      }
    },
  );
};
////移除并重新生成文件夹 生成压缩包以及JSon后提交服务器
function addJson() {
  const files = fs.readdirSync('./dist/static');
  files.forEach(function (item, index) {
    components.push({
      url: `https://web-new.dakale.net/product/game/sign/static/${item}`,
      path: `static/${item}`,
    });
  });

  let str = JSON.stringify(components);
  fs.writeFile('./uploadPage/MappingTable.json', str, function (err) {
    console.log(err);
  });
}
//生成Json 文件
const addZip = async (callback) => {
  let name = `gameSign${Date.parse(new Date())}.zip`;
  await compressing.zip.compressDir('./dist/', `./uploadPage/${name}`, {
    ignoreBase: true,
  });

  return name;
};
//生成压缩包
mkdir('uploadPage');
