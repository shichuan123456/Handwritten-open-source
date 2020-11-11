
function _bind(asThis, ...rest1) {
  let fn = this;  
  return function(...rest2) {  
      return fn.call(asThis, ...rest1, ...rest2);
  }
}


function _bind1(asThis, ...rest1) {
  if(typeof this !== 'function') {
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }
  var fn = this;
  var resultFn = function(...rest2) {
    fn.apply(this instanceof resultFn ? this : asThis, [...rest1, ...rest2])
  }
  resultFn.prototype = Object.create(fn);
  return resultFn;
}

Function.prototype.bind = Function.prototype.bind || _bind;
