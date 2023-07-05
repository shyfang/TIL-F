const args = [8, 5] as const; // 通过 as const 语法将其变为只读元组便可以解决这个问题。
const angle = Math.atan2(...args);