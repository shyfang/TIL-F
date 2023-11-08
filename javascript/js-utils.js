export function getType(obj) {
  let type = typeof obj;
  if (type !== "object") {    // 先进行typeof判断，如果是基础数据类型，直接返回
    return type;
  }
  // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
  // return Object.prototype.toString.call(obj).slice(8, -1); 
}

// Promise
// Async
// Proxy
// reduce
// Genetator

/** 防抖 节流 ：定义、实现思路重点、使用场景、this绑定 arguments */
// 定义：防抖函数用于限制函数的执行频率，在连续的调用【停止一段时间后】才【执行函数】。
// 思路：防止抖动，单位时间内事件触发会被【重置】（timer），避免事件被误触发多次
// 重点：重在清零 clearTimeout,【频繁触发时，计时器重新计时】比如等电梯，只要有一个人进来，就需要再等一会儿
// 使用场景：窗口调整事件\ 输入框实时搜索\ 按钮点击事件
export function debounce(fn, time) {
  let timer = null;

  // 频繁触发时，计时器重新计时
  return function debounceHandler() {
    let args = arguments;
    if (timer != null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null;
    }, time)
  }
}

/**
 * 节流的重点 节流函数用于限制函数的执行频率，在指定的时间间隔内只执行【一次】函数。
 * @param {*} fn 
 * @param {*} time 
 * @returns 
 */
// 定义：节流函数用于限制函数的执行频率，在指定的时间间隔内只执行【一次】函数。
// 使用场景: 页面滚动事件、鼠标移动事件
export function throttle(fn, time = 300) {
  let timer = null;

  // 这里不用箭头函数的原因是为了能够使用调用这个函数的对象的this上下文
  return function throttleHandler(...args) {
    if (timer === null) {
      // 这里不用 fn(...args)的原因还是为了保证this，因为 fn(...args) 会被编译成 fn.apply(undefined, args);
      fn.apply(this, args);
      timer = setTimeout(() => {
        timer = null;
      }, time);
    }
  };
}



/** 比较 */
export function compare(value1, value2) {
  if (value1 < value2) {
    return -1;
  } else if (value1 > value2) {
    return 1;
  } else {
    return 0;
  }
}

/** Clipboard 复制  */
// https://www.zhangxinxu.com/wordpress/2021/10/js-copy-paste-clipboard/
const Clipboard = (text) => {
  let textArea = ''

  //创建文本元素
  function createTextArea(text) {
    textArea = document.createElement('textArea')
    textArea.value = text
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
  }
  //选择内容
  function selectText() {
    if (!document.execCommand('Copy')) {
      const range = document.createRange()
      range.selectNodeContents(textArea)

      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)

      textArea.setSelectionRange(0, 999999)
    } else {
      textArea.select()
    }
  }

  //复制到剪贴板
  function copyToClipboard() {
    return new Promise((resolve, reject) => {
      createTextArea(text)
      selectText()
      try {
        if (document.execCommand('Copy')) {
          resolve(true)
        } else {
          resolve(false)
        }
      } catch (err) {
        resolve(false)
      } finally {
        document.body.removeChild(textArea)
      }
    })
  }

  return {
    copy: copyToClipboard,
  }
}
export const handleCopy = () => {
  const { copy } = Clipboard('value')
  copy().then((res) => {
    if (res) {
      console.log(res);
    } else {
      console.log('err');
    }
  })
}


/** 异步解决方案 */
// 回调函数
// Promise 对象
// generator 函数
// async/await
let myObj = { foo: 3, bar: 7 };

export function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    console.log(key, obj[key])
    yield [key, obj[key]];
  }
}

// iterable?
for (let item of Object.entries(myObj)) {
  console.log(item);
}




/** ES6 Module  export import */
const firstName = ''
export const LastName = ''
export { firstName }
export { firstName as Name }
// export { default as Col } from './common/Col' 复合用法
// export default firstName

// import { listApi } from './api'
// import { listApi as getListApi } from './api'
// import * as api from './api'

// 动态加载
// 异步加载
// import('/modules/myModule.mjs')
//   .then((module) => {
//     // Do something with the module.
//   });

// import dynamic from 'next/dynamic'
// dynamic(() =>
//   import(
//     /* webpackChunkName: "KycInstitutionBr" */
//     '../../../components/Kyc/Institution/Brazil'
//     )
// )


/** 国际化 常用格式化方法*/

/** 判断数据类型 封装方法 */

/** 下载文件方法 */


/** querystring */
// const url = "https://shanyue.tech?a=3&b=4&c=5";
function parseQueryString(url) {
  const queryString = url.split('?')[1];
  const params = new URLSearchParams(queryString);
  const result = {};

  for (const [key, value] of params) {
    if (result[key]) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}


function parseUrl(url) {
  const reg = /([^?&#]+)=([^?&#]+)/g;
  return url.match(reg).reduce((pre, cur) => {
    const [key, value] = cur.split(/=/);
    return {
      ...pre,
      [key]: value,
    };
  }, {});
}