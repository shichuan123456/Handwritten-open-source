function throttle(fn, time) {
  let pre = 0;
  return function(e) {
    const now = new Date()
    if(now - pre >= time) {
      fn.call(this, e)
      pre = now
    }
  }
}

function debounce(fn, time) {
  let timer = null
  return function(e) {
    const that = this
    if(timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.call(that, e)
      timer = null
    }, time)
  }
}