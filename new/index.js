const _new = function() {
  // exclude null
  let obj = Object.create(null);
  const Cons = Array.prototype.shift.call(arguments);
  const args = Array.prototype.slice.call(arguments);
  let res = Cons.apply(obj, args);
  obj.__proto__ = Cons.prototype;
  return typeof res === 'object' ? res || obj : obj      
}
















