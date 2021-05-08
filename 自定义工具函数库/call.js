/*  */
function call(fn, obj, ...rest) {

  if(obj === null || obj === void 0) {
    obj = globalThis
  }
  
  obj.tempFn = fn
  const result = obj.tempFn(...rest)
  delete obj.tempFn
  return result
}

function apply(fn, obj, rest) {
  if(obj === undefined || obj === null) {
    obj = globalThis
  }
  obj.tempFn = fn
  const result = obj.tempFn(...rest)
  delete obj.tempFn
  return result
}

function bind(fn, obj, ...args) {
  return function(...args2) {
    return call(fn, obj, ...args.concat(args2))  // ...args, ...args2
  }
}