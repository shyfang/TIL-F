// https://www.hello-algo.com/chapter_searching/replace_linear_by_hashing/#1041
var twoSum = function (nums, target) {
    //   for(let i=0; i<nums.length;i++) {
    //       for(let j=i+1; j< nums.length;j++) {
    //           if(nums[i] + nums[j] === target) {
    //               return [i, j]
    //           }
    //       }
    //   }
    let dic = new Map()
    for (let i = 0; i < nums.length; i++) {
        const element = target - nums[i];
        if (dic.has(element)) {
            return [dic.get(element), i]
        } else {
            dic.set(target - element, i); // 要找的值，配对的index
        }
    }
};

const res = twoSum([2, 7, 11, 15], 9)
const res1 = twoSum([3, 2, 4], 6)
const res2 = twoSum([3, 3], 6)
console.log(res, res1, res2);