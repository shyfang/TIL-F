function getType(obj){
  let type  = typeof obj;
  if (type !== "object") {    // 先进行typeof判断，如果是基础数据类型，直接返回
    return type;
  }
  // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1'); 
}

// Promise
// Async
// Proxy
// reduce
// Genetator

/** 防抖 节流 */

/** 比较 */
function compare(value1, value2) {
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
const handleCopy = () => {
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

function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
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



