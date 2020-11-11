const arr = [1,[2,3,4,[5,6,7,8]]]
// v1
console.log(arr.flat(Infinity));

// v2 数据类型会变成字符串
console.log(arr.toString().replace(/\[|\]/g, "").split(","));

// v3 
console.log(JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, "") + ']'));

// v4
const flatten = arr => {
  return arr.reduce((t, c) => {
    return t.concat(Array.isArray(c) ? flatten(c) : c);   // concat对待数值和数组一样，也就是说可以去掉一层数组
  }, [])
}
console.log(flatten(arr));

// v5

function flattern1 (arr) {
  let res = [];
  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      res = res.concat(flattern1(arr[i])) // concat不改变数组本身
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}

console.log(flattern1(arr));

// v6
function flattern2(arr) {
  while(arr.some(Array.isArray)) {
    arr = [].concat(...arr)   // 通过concat一层一层去掉
  }
  return arr;
}

