function compose(...fns) {
  return function (initial) {
    return fns.reduce((t, fn) => fn.call(null, t), initial);
  };
}

function compose1(middleware) {
  if (!Array.isArray(middleware)) {
    throw new Error("middleware stack must be an array!");
  }

  for (let fn of middleware) {
    if (typeof fn !== "function") {
      throw new Error("middleware must be composed of functions");
    }
  }
  return function (next) {
    return dispatch(0);
    function dispatch(i) {
      let fn = middleware[i]

      if(i === middleware.length) {
        fn = next
      }

      if(!fn) {
        return Promise.resolve()
      }

      try {
        return Promise.resolve(fn(dispatch.bind(null, i +1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

const add1 = function (x) {
  return x + 10;
};
const add2 = function (x) {
  return x + 20;
};

console.log(compose1([add1, add2])(5).then(data => console.log(data)));
