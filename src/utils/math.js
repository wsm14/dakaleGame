import * as math from 'mathjs';
export default {
  // 加
  add(num1, num2) {
    return Number(math.add(math.bignumber(num1), math.bignumber(num2)));
  },
  // 乘
  multiply(num1, num2) {
    return Number(math.multiply(math.bignumber(num1), math.bignumber(num2)));
  },
  // 减
  subtract(num1, num2) {
    return Number(math.subtract(math.bignumber(num1), math.bignumber(num2)));
  },
  // 除
  divide(num1, num2) {
    return Number(math.divide(math.bignumber(num1), math.bignumber(num2)));
  },
};
