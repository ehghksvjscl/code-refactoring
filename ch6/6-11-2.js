import fs from 'fs';

run(process.argv);

function run(args) {

  parseCommend(args)

  function parseCommend(args) {
    if (!args[2]) {
      throw new Error('파일 이름을 입력하세요');
    }

    const fileName = `./${args[2]}.json`;
    if (!fs.existsSync(fileName)) {
      throw new Error('파일이 존재하지 않습니다');
    }
  }
  
  function countOrder(fileName) {
    const rawData = fs.readFileSync(fileName);
    const orders = JSON.parse(rawData);
    if (args.includes('-r')) {
      console.log(orders.filter((order) => order.status === 'ready').length);
    } else {
      console.log(orders.length);
    }
  }
  const rawData = fs.readFileSync(fileName);
  const orders = JSON.parse(rawData);
  if (args.includes('-r')) {
    console.log(orders.filter((order) => order.status === 'ready').length);
  } else {
    console.log(orders.length);
  }
}
