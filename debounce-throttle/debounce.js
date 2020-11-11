/* 事件持续触发，但只有当事件停止触发后n秒才执行函数 */

 function debounce1(fn, delay) {
  var timer
  return function () {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

// 对本来要执行的方法进行包装
function debounce2(func, wait, immediate) {
  let timer = null;
  let isFirstcalled = true;
  const result = [];
  const debounced = function () {
    const context = this;
    const args = arguments;
    let result;
    if (immediate) {
      if (isFirstcalled) {
        result = func.apply(context, args);
      }
      isFirstcalled = false;
      timer = setTimeout(() => {
        isFirstcalled = true;
      }, wait);
    } else {
      timer = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };
  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };
  return debounced;
}
