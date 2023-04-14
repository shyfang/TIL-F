// var regexAllTags = /<([a-zA-Z1-6]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)/gim
// var html = '<h3 class="any" id="hey">Test</h3> raw text here <a href="http://google.com">hehe</a><Button onClick={this.handleClick}>React Button</Button>'

// var htmlTags = html.match(regexAllTags)
// console.log('htmlTags', htmlTags);
// ["<h3 class="any" id="hey">Test</h3>", "<a href="http://google.com">hehe</a>"]

// var regexSingleTag = /<([a-zA-Z1-6]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)/
// for (var i = 0; i < htmlTags.length; i++) {
//   var text = regexSingleTag.exec(htmlTags[i])
//   console.log('Tag #' + i, text)
// }


var regexAllTags = /<(\w*)([^<]+)*>(.*)<\/\1>/gim
var html = '<h3 class="any" id="hey">Test</h3> raw text here <a href="http://google.com">hehe</a><Button onClick={this.handleClick}>React Button</Button>'

var htmlTags = html.match(regexAllTags)
console.log('htmlTags', htmlTags);

function verifyTag(str) {
  // const reg = /<(\S*?)[^>]>.?</\1>|<.*?/>/

  const reg = /(\<\/?\w*\>)(.*)(\<\/1\>)/
  return str.match(reg)
  // return reg.test(str)

  // const reg = /^(\<\/?\w*\>).*(\<\/?\w*\>)$/;
  // return reg.test(str)

  // const reg = /(\<\/?\w*\>)/g;
  // return str.replace(reg, '')
}
// console.log(verifyTag('<span>e1212sx.ee1</span><p>1r3/p>'))

{
  /* <path>asdasdfas</path>

<url>dsfs</url>

path , sdasdfas */
}

// const regexTags = /<(\w*)>(.*)<\/\1>/gim
// const xmlStr = '<path>asd<p>as</p>dfas</path><url>dsfs</url>'
// // const xmlStr = '<path>asdasdfas</path><url>dsfs</url><p>12</p>'
// const xmlTags = xmlStr.match(regexTags)
// console.log('xmlTags', xmlTags);

// const regexTag = /<(\w*)>(.*)<\/\1>/
// let result = xmlTags.map(item => regexTag.exec(item))

const regexFullTags = /<(\w*)>(.*)<\/\1>/gim
const regexSingleTag = /<(\w*)>(.*)<\/\1>/
let result = []
const getKeyContent = (xmlStr) => {
  const xmlTags = xmlStr.match(regexFullTags)
  // console.log('xmlTags', xmlTags)
  xmlTags &&xmlTags.reduce((pre, cur) => {
      const signleTagMatch = regexSingleTag.exec(cur)
      const [full, key, content] = signleTagMatch
      // console.log('signleTagMatch', signleTagMatch)
      if (content.match(regexFullTags)) {
        // getKeyContent(cur)
      } else {
        return [
          // ...pre,
          // {[key]: content},
        ]
      }
    }, [])
}

// console.log('result', result);
result = getKeyContent('<path>asd<p>as</p>dfas</path><url>dsfs</url>')
//
console.log(result);


const str = "<span>12<p>222<div>333<th>55</th></div></p>11</span>";

const reg = /((?<=\<)[\>\w]+)|(\w+\<\/\w+(?=\>))/g;

console.log(str.match(reg));





