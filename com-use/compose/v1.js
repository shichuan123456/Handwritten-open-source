function compose(...fns) {
  return function(x) {
    return fns.reduce((prev, cur) => cur(prev), x); 
  }
}

const add1 = function(x) { return x + 1}
const add2 = function(x) { return x + 2}

console.log(compose(add1, add2)(5));