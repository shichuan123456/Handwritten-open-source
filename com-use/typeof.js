function typeofSelf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

console.log(typeofSelf({}));