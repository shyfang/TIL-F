interface DateFace extends Date {
  format: Function;
}
interface timeMapFace {
  [key: string]: string;
}

interface excessTimeFace {
  day: number;
  hour: number;
  minute: number;
  second: number;
}

(Date.prototype as any).format = function (fmt: string) {
  const timeMap: timeMapFace = {
    "(y+)": this.getFullYear(),
    "(M+)": this.getMonth() + 1,
    "(d+)": this.getDate(),
    "(h+)": this.getHours(),
    "(m+)": this.getMinutes(),
    "(s+)": this.getSeconds(),
  };

  for (let k in timeMap) {
    const reg = new RegExp(k);
    if (reg.test(fmt)) {
      const time =
        timeMap[k].toString().length === 1 ? "0" + timeMap[k] : timeMap[k];
      fmt = fmt.replace(reg, time);
    }
  }
  return fmt;
};

export const ymdhms = "yyyy-MM-dd hh:mm:ss";
export const mdhm = "MM-dd hh:mm";

/**
 * @description:时间格式化
 * @param {Date | string | number} time
 * @param {string} format 处理格式
 * @return {string} 处理后格式
 */
export const timeFormat = (
  time: Date | string | number,
  format: string = ymdhms
): string => {
  return (new Date(time) as DateFace).format(format);
};

/**
 * @description:目标时间转剩余时间
 * @param {Date} targetTime 目标时间:格式时间或者时间戳
 * @return {object}  {day: number; hour: number; minute: number;second: number}
 */
export const targetTimeToExcessTime = (
  targetTime: Date | string | number
): excessTimeFace => {
  return excessTime(new Date(targetTime).getTime() - new Date().getTime());
};

/**
 * @description:剩余时间处理
 * @param {number} timeLeft 剩余时间时间戳
 * @return {object}  {day: number; hour: number; minute: number;second: number}
 */
export const excessTime = (timeLeft: number): excessTimeFace => {
  const baseDay = timeLeft / (24 * 60 * 60 * 1000);
  const day = Math.floor(baseDay);

  const baseHour = (baseDay - day) * 24;
  const hour = Math.floor(baseHour);

  const baseMinute = (baseHour - hour) * 60;
  const minute = Math.floor(baseMinute);

  const second = Math.floor((baseMinute - minute) * 60);

  return {
    day,
    hour,
    minute,
    second,
  };
};
