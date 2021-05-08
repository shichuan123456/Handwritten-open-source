Function.prototype.bind = function(ctx, ...args) {
  const fn = this
  return function(...args1) {
    return fn.apply(ctx, [...args, args1])
  }
}

Function.prototype.bind1 = function(ctx, ...args) {
  const fn = this;
  const retFn = function(...args1) {
    return this instanceof retFn ? fn.apply(this, [...args, ...args1]) : fn.apply(ctx, [...args, ...args1])
  }
  retFn.prototype = Object.create(fn)
  return retFn
}