function callFn(asThis, ...rest) {
  var asThis = asThis || window;
  asThis.fn = this;
  asThis.fn(...rest);
  delete asThis.fn;
}


function applyFn(asThis, rest) {
  var asThis = asThis || window;
  asThis.fn = this;
  asThis.fn(...rest);
  delete asThis.fn;
}