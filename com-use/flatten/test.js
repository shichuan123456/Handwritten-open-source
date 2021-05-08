const arr = [1,[2,3,4,[5,6,7,{a: 'b'}]]]

console.log(arr.flat(Infinity));
// 会将所有元素字符串话
console.log(arr.toString().replace(/\[|\]/g, "").split(','));
// 如果对象里面的属性是数组会有问题
console.log(JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, "") + ']'));

const flatten = arr => {
  return arr.reduce((t, c) => {
    return t.concat(Array.isArray(c) ? flatten(c) : c);   // concat对待数值和数组一样，也就是说可以去掉一层数组
  }, [])
}

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


function flattern2(arr) {
  while(arr.some(Array.isArray)) {
    arr = [].concat(...arr)
  }
  return arr
}