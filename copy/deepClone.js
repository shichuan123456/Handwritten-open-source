function deepCopy(obj) {
  if (!obj && typeof obj !== 'object') {
    throw new Error('error arguments');
  }
  const targetObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        targetObj[key] = deepCopy(obj[key]);
      } else {
        targetObj[key] = obj[key];
      }
    }
  }
  return targetObj;
}


function shallowClone(source) {
  const targetObj = source.constructor === Array ? [] : {}; 
  for (let keys in source) { 
    if (source.hasOwnProperty(keys)) {
      targetObj[keys] = source[keys];
    }
  }
  return targetObj;
}
