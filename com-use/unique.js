const arr = [1,2,3,4,5,5,4,3,2,1]
// v1
const res1 = Array.from(new Set(arr));

// v2
const unique = arr => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        len--;    // 数组长度减少
        j--;     // 访问序号没变需要减1
      }
    }
  }
  return arr;
}

// v3
const unique2 = arr => {
  const res = [];    // 没有了再加入
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) res.push(arr[i]);
  }
  return res;
}


// v4
const unique3 = arr => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (!res.includes(arr[i])) res.push(arr[i]);
  }
  return res;
}

// v5
const unique4 = arr => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
}

console.log(unique4(arr))

// v6
const unique5 = arr => {
  const map = new Map();
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], true)
      res.push(arr[i]);
    }
  }
  return res;
}

console.log(unique5(arr));