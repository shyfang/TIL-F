import { DataType, osTypeFace, paramsType } from "../interface";

/**
 * @description:判断数据类型
 * @param {paramsType} item
 * @return {DataType}
 */
export const judgeDataType = (item: paramsType): DataType => {
  return Object.prototype.toString.call(item).slice(8, -1) as DataType;
};

/**
 * @description: 判断数据是否为空
 * @param {paramsType} item
 * @return {boolean}
 */
export const judgeData = (item: paramsType): boolean => {
  switch (judgeDataType(item)) {
    case "Object":
      return JSON.stringify(item) !== "{}";
    case "Array":
      return (item as Array<paramsType>).length !== 0;
    case "Number":
      return item !== 0;
    case "String":
      return (item as string).trim() !== "";
    case "Null":
      return false;
    case "Undefined":
      return false;
    case "Boolean":
      return item as boolean;
    default:
      return true;
  }
};

/**
 * @description:url解析
 * @param {string} url
 * @return {object}
 */
export const parseUrl = (
  url: string = window.location.href
): {
  [key: string]: string;
} => {
  const reg = /([^?&=#]+)=([^?&=#]+)/g;
  return url.match(reg)!.reduce((pre, cur) => {
    const [key, value] = cur.split(/=/);
    return {
      ...pre,
      [key]: value,
    };
  }, {});
};

/**
 * @description:环境判断
 * @param {string} ua
 * @return {osTypeFace}
 */
export const judgeOs = (
  ua: string = window.navigator.userAgent
): osTypeFace => {
  if (ua.includes("iPhone")) return "iPhone";
  if (ua.includes("Android")) return "Android";
  return "pc";
};

/**
 * @description:web复制文本
 * @param {string} content
 * @return {void}
 */
export const copyContent = (content: string): void => {
  const el = document.createElement("input");
  el.value = content;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

/**
 * @name: 图片保存至本地
 * @param {HTMLCanvasElement} canvas
 * @param {string} name
 * @return {Promise<void>}
 */
export const imgSaveAlbum = async (
  canvas: HTMLCanvasElement,
  name: string
): Promise<void> => {
  const url = canvas.toDataURL("image/png");
  const image = new Image();
  image.setAttribute("crossOrigin", "anonymous");
  image.onload = function () {
    const a = document.createElement("a");
    const event = new MouseEvent("click");
    a.download = name || "img";
    a.href = url;
    a.dispatchEvent(event);
  };
  image.src = url;
};

/**
 * @description:
 * @param {object} data {str:所截字符串,frontRetain:前面所保留位置,backRetain:后面所保留位置}
 * @return {string} string
 */
export const strAdHandle = (data: {
  str: string;
  frontRetain?: number;
  backRetain?: number;
}): string => {
  const { str, frontRetain = 5, backRetain = 4 } = data;
  const reg = new RegExp(
    `(?<=\\w{${frontRetain}})(\\w+)(?=\\w{${backRetain}})`,
    "g"
  );
  return str ? str.replace(reg, "...") : "";
};
