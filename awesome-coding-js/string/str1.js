// 正则
// 请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy。则经过替换之后的字符串为We%20Are%20Happy。
function sEncode(str) {
  return str.replace(/\s/g, "%20")
}

const res = sEncode("We Are Happy")
// console.log(res);



// 输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba
// 思路: abc -> [a, b, c] -> firstChart: a\b\c 

function getRes(str) {
  let res = []
  const arr = str.split("")
  // 
  for (let i = 0; i < arr.length; i++) {
    let currentStr = ''

    const element = arr[i];
    currentStr += element

    let newArr = [...arr]
    newArr.splice(i, 1)

    for (let j = 0; j < newArr.length; j++) {
      const elementj = newArr[j];
      currentStr+=elementj

      let newArrj = [...newArr]
      newArrj.splice(i, 1)

      for (let z = 0; z < newArrj.length; z++) {
        const elementz = newArrj[z];
        currentStr+=elementz
        
        res.push(currentStr)
      }
    }
  }
  
  return res
}

function queueEle(arr, res){
  for (let i = 0; i < arr.length; i++) {
    let currentStr = ''

    const element = arr[i];
    currentStr += element

    let newArr = [...arr]
    if(newArr.length === 0) {
      currentStr = newArr[0]
      res.push(currentStr)
    } else {
      newArr.splice(i, 1)
      // console.log("leftElements", i, newArr);
      queueEle(newArr, res)
    }
  }
}

console.log(getRes("abc"));

function Permutation(str) {
  const result = [];
  if (str) {
    queue = str.split('')
    PermutationCore(queue, result);
  }
  result.sort();
  return [... new Set(result)];
}

function PermutationCore(queue, result, temp = "", current = "") {
  current += temp;
  if (queue.length === 0) {
    result.push(current);
    console.log("result----", result);
    return;
  }
  for (let i = 0; i < queue.length; i++) {
    temp = queue.shift();
    PermutationCore(queue, result, temp, current);
    queue.push(temp);
  }
}

// console.log(Permutation("abc"));



// 请实现一个函数用来找出字符流中第一个只出现一次的字符。例如，当从字符流中只读出前两个字符"go"时，第一个只出现一次的字符是"g"。 当从该字符流中读出前六个字符“google"时，第一个只出现一次的字符是"l"。
// 如果当前字符流没有存在出现一次的字符，返回#字符。
 
// 思路？
// Map 记录char出现次数
// Arr 记录char顺序流
// 遍历str 记录字符出现次数 -> countMap
// 遍历Arr 取出出现次数为1的字符
function getFirstUniqueChar(str) {
  const countMap = new Map()
  const streamArr = []

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if(!countMap.get(char)){
      streamArr.push(char)
    }
    countMap.set(char, (countMap.get(char) || 0) + 1)
  }
  
  if(streamArr.length > 0){
    let j = 0
    while (j < streamArr.length) {
      let charRes = streamArr[j]
      const count = countMap.get(charRes)
      if(count === 1) {
        return charRes
      } else {
        j++
      }
    }
  } 
  // while (streamQueue.length > 0) {
  //   const char = streamQueue[0];
  //   if (charCount.get(char) === 1) {
  //     return char;
  //   } else {
  //     streamQueue.shift();
  //   }
  // }
  return '#'
}

const uniqueChar = getFirstUniqueChar("google")
console.log("uniqueChar__", uniqueChar);



// 输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。为简单起见，标点符号和普通字母一样处理。例如输入字符串"I am a student."，则输出"student. a am I"。
// 思路：数组

function reverseSentence(str) {
  return str?.split(" ")?.reverse()?.join(" ") || ''
}
console.log(reverseSentence("I am a student."));


// 字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如输入字符串"abcdefg"和数字2，该函数将返回左旋转2位得到的结果"cdefgab"。
// 思路:
function leftReverseSentence(str, n){
  
}


