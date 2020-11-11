/* 事件持续触发，每n秒执行一次 */

// version1: 时间戳 最后一次触发没有执行
function throttle1(func, wait) {
  let preTime = 0, curTime = 0;
  return function() {
    const context = this, args = arguments;
    curTime = +(new Date());
    if(curTime - preTime > wait) {
      func.apply(context, args);
      curTime = curTime;
    }
  }
}

// version2: 定时器 第一次触发没有执行, 最后一次触发了
function throttle2(func, wait) {
  let timer;
  return function() {
    const context = this, args = arguments;
    if(!timer) {
      timer = setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, wait);
    }
  }
}

// version3 首次触发立即执行，停止触发后最后一次执行
function throttle3(func, wait) {
  let timer, context, args, result;
  let previous = 0;
  if(!options) options = {}

  let later = function() {
    previous = options.leading === false ? 0 : +new Date();
    timeout = null;
    func.apply(context, args);
  }

  let throttled = function() {
    var now = +new Date();
    if(!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 没有剩余时间或者改了系统时间
    if(remaining <= 0 || remaining > wait) {
      if(timeout) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      func.apply(context, args);
      if(!timeout) context = args = null;
    }else if(!timer && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  }
  return throttled;
}
