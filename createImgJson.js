var fs = require('fs');
let components = [];
function mkdir(filepath) {
  fs.mkdirSync(filepath);
}

mkdir('uploadPage');
const files = fs.readdirSync('./dist/static');
// files.forEach(function (item, index) {
//   let stat = fs.lstatSync('./dist/static/' + item);
//   components.push({
//     url: `https://web-new.dakale.net/product/game/sign/static/${item}`,
//     path: `static/${item}`,
//   });
// });

// let str = JSON.stringify(components);
// fs.writeFile('./uploadPage/MappingTable.json', str, function (err) {
//   console.log(err);
// });
