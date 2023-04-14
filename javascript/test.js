// 
// function showName() {
//   console.log(arguments);
//   console.log(Array.from(arguments));
//   console.log( arguments.length );
//   console.log( arguments[0] );
//   console.log( arguments[1] );

//   // 它是可遍历的
//   // for(let arg of arguments) console.log(arg);
// }

// // 依次显示：2，Julius，Caesar
// showName("Julius", "Caesar");

// // 依次显示：1，Ilya，undefined（没有第二个参数）
// showName("Ilya");



function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
console.log(counter());
console.log(counter());
console.log(counter());