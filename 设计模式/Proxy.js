// v1 用代理模式实现 loading
const createImg = (function () {
  const imgNode = document.createElement("img");
  document.body.appendChild(imgNode);
  return {
    setSrc: function (src) {                                                                                                                 
      imgNode.src = src;
    },
  };
})();

const proxyCreateImg = (function () {
  const img = new Image();
  img.onload = function () {
    createImg.setSrc(this.src);
  };
  return function (src) {
    createImg.setSrc("file://fd.png");
    img.src = src;
  };
})();

// v2
var proxySynchronousFile = (function () {
  var cache = [],
    timer;
  return function (id) {
    cache.push(id);
    if (timer) {
      return;
    }
    timer = setTimeout(function () {
      synchronousFile(cache.join(","));
      clearTimeout(timer);
      timer = null;
      cache.length = 0;
    }, 2000);
  };
})();

// v3
var createProxyFactory = function (fn) {
  var cache = {};
  return function () {
    var args = Array.prototype.join.call(arguments, ",");
    if (args in cache) {
      return cache[args];
    }
    return (cache[args] = fn.apply(this, arguments));
  };
};

// v4
var miniConsole = (function () {
  var cache = [];
  var handler = function (ev) {
    if (ev.keyCode === 113) {
      var script = document.createElement("script");
      script.onload = function () {
        for (var i = 0, fn; (fn = cache[i++]); ) {
          fn();
        }
      };
      script.src = "miniConsole.js";
      document.getElementsByTagName("head")[0].appendChild(script);
      document.body.removeEventListener("keydown", handler); // 只加载一次miniConsole.js
    }
  };
  document.body.addEventListener("keydown", handler, false);
  return {
    log: function () {
      var args = arguments;
      cache.push(function () {
        return miniConsole.log.apply(miniConsole, args);
      });
    },
  };
})();

// miniConsole.js 代码
miniConsole = {
  log: function () {
    // 真正代码略
    console.log(Array.prototype.join.call(arguments));
  },
};
