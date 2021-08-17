const url = require("url");
const methods = require("../utils/methods");
const Layer = require("./layer");
const Route = require("./route");

function Router() {
  this.stack = [];
}

methods.forEach((method) => {
  Router.prototype[method] = function (path, handler) {
    const route = new Route();
    const layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    route[method](path, handler);
  };
});

Router.prototype.use = function (path, handlers) {
  if (typeof path === "function") {
    handlers.unshift(path);
    path = "/";
  }

  handlers.forEach((handler) => {
    const layer = new Layer(path, handler);
    layer.isUseMiddleware = true;
    this.stack.push(layer);
  });
};

Router.prototype.handle = function (req, res) {
  const { pathname } = url.parse(req.url);
  const method = req.method.toLowerCase();
  let index = 0;

  const next = () => {
    if (index >= this.stack.length) {
      return res.end(`Can not get ${pathname}`);
    }

    const layer = this.stack[index++];
    const match = layer.match(pathname);
    if (match) {
      req.params = req.params || {};
      Object.assign(req.params, layer.params);
    }
    // 顶层只判定请求路径，内层判定请求方法 ，顶层调用的handler其实就是dispatch函数
    if (match) {
      return layer.handler(req, res, next);
    }
    next();
  };
  next();
};
module.exports = Router;
