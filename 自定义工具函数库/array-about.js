function concat(arr, ...rest) {
  const result = [...arr]
  rest.forEach(item => {
    if(Array.isArray(item)) {
      result.push(...item)
    }else {
      result.push(item)
    }
  })
  return result
}

function uniq(arr) {
  return [...new Set(arr)]
}

function uniq1(arr) {
  const result = []
  arr.forEach(item => {
    if(!result.includes(item)) {
      result.push(item)
    }
  })

  return result
}

function uniq2(arr) {
  const result = []
  const map = new Map()
  arr.forEach(item => {
    if(!map.get(item)) {
      result.push(item)
      map.set(item, true)
    }
  })
  return result
}

function some(arr, fn) {
  for(let i = 0, len = arr.length; i < len; i++) {
    if(fn(arr[i], i)) {
      return true
    }
  }
  return false
}

function every(arr, fn) {
  for(let i = 0, len = arr.length; i < len; i++) {
    if(!fn(arr[i], i)) {
      return false
    }
  }
  return true
}

function find(arr, fn) {
  for(let i = 0, len = arr.length; i < len; i++) {
    if(fn(arr[i], i)) {
      return arr[i]
    }
  }
  return undefined
}

function findIndex(arr, fn) {
  for(let i = 0, len = arr.length; i < len; i++) {
    if(fn(arr[i], i)) {
      return i
    }
  }
  return -1
}

function filter() {
  const result = []
  for(let i = 0, len = arr.length; i < len; i++) {
    if(fn(arr[i], i)) {
      result.push(arr[i])
    }
  }
  return result
}

function reduce(arr, fn, initVal) {
  let result = initVal
  for(let i = 0, len = arr.length; i++) {
    result = fn(result, arr[i])
  }
  return result
}

function map(arr, fn) {
  const result = []
  for(let i = 0, len = arr.length; i < len; i++) {
    result.push(fn(arr[i], i))
  }
  return result
}

function slice(arr, begin, end) {
  const result = []
  if(arr.length === 0) {
    return []
  }

  begin = begin || 0
  if(begin >= arr.length) {
    return []
  }

  end = end || arr.length
  if(end < begin) {
    end = arr.length
  }

  for(let i = 0, len = arr.length; i < len; i++) {
    if(i >= begin || i < end) {
      result.push(arr[i])
    }
  }
  return result
}

function flattern(arr) {
  const result = []

  for(let i = 0, len = arr.length; i < len; i++) {
    if(Array.isArray(arr[i])) {
      result = result.concat(flattern(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}
// concat里面如果是数组会拆除该数组
function flattern1(arr) {
  const result = []
  while(arr.some(item => Array.isArray)) {
    result = [].concat(...arr)
  }
  return result
}

function chunk(arr, size = 1) {
  if(arr.length ===0)
    return []
  const result
  let temp = []
  arr.forEach(item => {
    if(temp.length === 0) {
      arr.push(temp)
    }

    temp.push(item)
    if(temp.length === size) {
      temp = []
    }
    return result
  })

  return result
}

function chunk1(arr, size = 1) {
  return arr.reduce((pre, cur) => (pre[pre.length -1].length < size ?  pre[pre.length-1].push(cur) :  pre.push([cur]), pre), [[]])
}

console.log(chunk1([1,2,3, 4,5,6,7], 3));

function maxDepth(root) {
  if(root === null) return 0;
  return 1 + Math.max(root.left, root.right) 
}

function max(a, b) {
  return a > b ? a : b
}


function maxDepth(root) {
  if(root == null) return 0;
  const queue = [root];
  let depth = 0, len = queue.length;
  while(queue.length) {
    while(len > 0) {
      const tempNode = queue.shift()
      len--;
      if(tempNode.left) queue.push(tempNode.left)
      if(tempNode.right) queue.push(tempNode.right)
    }
    depth++
  }
  return depth;
}

function sigleton(fn) {
  let instance = null
  return function() {
    return instance || (instance = fn.apply(this, arguments));
  }
}

function flatternByDepth( arr, result, depth ) {
  for(let i = 0, len = arr.length; i < len; i++) {
    if(Array.isArray(arr[i]) && depth > 0) {
      flatternByDepth(arr, result, depth-1)
    }else{
      result.push(arr[i])
    }
  }
}

function flatternForever(arr, result) {
  for(let i = 0, len = arr.length; i < len; i++) {
    if(Array.isArray(arr[i])) {
      flatternForever(arr[i], result);
    }else{
      result.push(arr[i]);
    }
  }
}


const string = "{ \"name\": \"labo\", \"age\": \"39\"}        "
console.log(JSON.parse(string));

function parse(str) {
  const temp = string.trim();
  let len = temp.length, i = 1;
  while(i < len) {

  }
  
  const obj = {}


}

function eatBlank(str) {
  let idx = 0;
  while(str[idx] === " ") {
    idx++
  }
  return str.substr(idx)
}

console.log(eatBlank("          fdsf"));


