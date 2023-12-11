var removeElement = function (nums, val) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1)
      i--
    }
  }
  return [nums, nums.length]
};

const res = removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)

console.log(res);


// 双指针
function removeElement1(nums, val) {
  let n = nums.length
  let left = 0
  for (let right = 0; right < n; right++) {
    if (nums[right] !== val) {
      nums[left] = nums[right]
      left++
    }
  }

  return left
}

const res1 = removeElement1([0, 1, 2, 2, 3, 0, 4, 2], 2)
console.log(res1);

// 2. 删除有序数组中的重复项
var removeDuplicates = function (nums) {
  let n = nums.length
  if (!nums.length) {
    return 0
  }
  let left = 1
  for (let i = 1; i < n; i++) {
    if (nums[i] !== nums[left - 1]) {
      nums[left] = nums[i]
      left++
    }
  }
  return left
};

console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));

// 多数元素
var majorityElement = function (nums) {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if(map.get(nums[i]) === undefined) {
      map.set(nums[i], 0)
    }
    map.set(nums[i], map.get(nums[i]) + 1)
  }
  const keys = map.keys()
  let result
  Array.from(keys).forEach(key => {
    if (map.get(key) > nums.length / 2) {
      result = key
    }
  })
  return result
};
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]));

// 189. 轮转数组
// 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
var rotate = function(nums, k) {
  
};

console.log(rotate([1,2,3,4,5,6,7], 3));