import { judgeDataType } from "./index";

type numType = number | string;

/**
 * @description: 把错误的数据转正(eg:(0.09999999999999998)=0.1)
 */
export function strip(num: numType, precision = 15): number {
  return +parseFloat(Number(num).toPrecision(precision));
}

/**
 * @description:计算小数长度
 * @param {*num} num Input number
 * @return {number}
 */
export function digitLength(num: numType): number {
  const eSplit = Number(num).toString().split(/[eE]/);
  const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}

/**
 * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 * @param {*num} num 输入数
 */
function float2Fixed(num: numType): number {
  if (Number(num).toString().indexOf("e") === -1) {
    return Number(Number(num).toString().replace(".", ""));
  }
  const dLen = digitLength(Number(num));
  return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
}

/**
 * 迭代操作
 */
function iteratorOperation(
  arr: numType[],
  operation: (...args: numType[]) => number
): number {
  const [num1, num2, ...others] = arr;
  let res = operation(num1, num2);

  others.forEach((num) => {
    res = operation(res, num);
  });

  return res;
}

/**
 * @description: 精确加法
 * @return {number}
 */
export function plus(...nums: numType[]): number {
  if (nums.length > 2) {
    return iteratorOperation(nums, plus);
  }

  const [num1, num2] = nums;
  // 取最大的小数位
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  // 把小数都转为整数然后再计算
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}

/**
 * @description: 精确减法
 * @return {number}
 */
export function minus(...nums: numType[]): number {
  if (nums.length > 2) {
    return iteratorOperation(nums, minus);
  }

  const [num1, num2] = nums;
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}

/**
 * 精确乘法
 */
export function times(...nums: numType[]): number {
  if (nums.length > 2) {
    return iteratorOperation(nums, times);
  }

  const [num1, num2] = nums;
  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  const baseNum = digitLength(num1) + digitLength(num2);
  const leftValue = num1Changed * num2Changed;

  return leftValue / Math.pow(10, baseNum);
}

/**
 * 精确除法
 */
export function divide(...nums: numType[]): number {
  if (nums.length > 2) {
    return iteratorOperation(nums, divide);
  }

  const [num1, num2] = nums;
  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);

  // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
  return times(
    num1Changed / num2Changed,
    strip(Math.pow(10, digitLength(num2) - digitLength(num1)))
  );
}

/**
 * @description: 精确四舍五入
 * @param {number} num
 * @param {number} ratio
 * @return {number}
 */
export function round(num: numType, ratio: number): number {
  const base = Math.pow(10, ratio);
  let result = divide(Math.round(Math.abs(times(num, base))), base);
  if (num < 0 && result !== 0) {
    result = times(result, -1);
  }

  return result;
}

export function parseRound(num: numType, ratio: number): string {
  let result = round(num, ratio).toString();

  // 如果是科学计数法则转换成正常数值
  if (result.toString().indexOf("-") > -1) {
    result = toNonExponential(result);
  }

  return result;
}

/**
 * @description:判断是否为科学计数数字
 * @param {number} value
 * @return {boolean}
 */
export const isNumberE = (value: number): boolean => {
  if (Number.isNaN(value)) return false;
  if (!value) return false;
  const str = value.toString();
  return /e/i.test(str);
};

/**
 * @description:科学计数转化为正常数字
 * @param {string} value
 * @return {string}
 */
export const toNonExponential = (value: string | number): string => {
  const num = Number(value);
  const match: any = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
  const precision = Math.max(0, (match[1] || "").length - match[2]);
  return num.toFixed(Math.min(precision, 20));
};

/**
 * @description:百分比处理
 * @param {number} num
 * @param {number} precision 精度
 * @return {string}
 */
export const percentageHandle = (
  num: number,
  precision: number = 0
): string => {
  if (judgeDataType(num) !== "Number") num = 0;
  if (Number.isNaN(num)) num = 0;
  return `${(num * 100).toFixed(precision).toString()}%`;
};

/**
 * @description:数字千分位处理
 * @param {number} value
 * @return {string} 1,000
 */
export const amtFilter = (value: number): string => {
  const val = value.toString().split(".");
  const [integer, decimal] = val;
  const reg = /(?=(\B\d{3})+\b)/g;
  const integertext = integer.replace(reg, ",");
  const result = decimal ? `${integertext}.${decimal}` : integertext;

  return result;
};

/**
 * 数字向下保留小数
 * @param value  值
 * @param radio  保留小数位数
 * @returns {string}  123.456 -> 123.45
 */
export function parseFloor(value: numType, radio: number): string {
  const num = Number(value);
  if (
    value === "" ||
    Object.is(null, value) ||
    Number.isNaN(num) ||
    !Number.isFinite(num)
  ) {
    return value.toString();
  }

  let valueStr = value.toString();
  // 如果是科学计数法则转换成正常数值
  if (valueStr.indexOf("e") > -1) {
    valueStr = toNonExponential(value);
  }
  const [int, float = ""] = valueStr.split(".");
  if (float === "") return int;

  const realFloat = float.length > radio ? float.substring(0, radio) : float;
  return radio > 0 ? `${int}.${realFloat}` : `${int}`;
}
