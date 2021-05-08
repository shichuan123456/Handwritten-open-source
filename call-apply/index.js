function callFn(asThis, ...rest) {
  asThis = asThis || window;
  asThis.fn = this;
  asThis.fn(...rest);
  delete asThis.fn;
}

function applyFn(asThis, rest) {
  asThis = asThis || window;
  asThis.fn = this;
  asThis.fn(...rest);
  delete asThis.fn;
}



