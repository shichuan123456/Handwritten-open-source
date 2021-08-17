const http = require("http");
const Router = require("./router");
const methods = require("./utils/methods");
function App() {
  this._router = new Router();
}

methods.forEach((method) => {
  App.prototype[method] = function (path, ...handlers) {
    this._router[method](path, handlers);
  };
});

App.prototype.use = function (path, handler) {
  this._router.use(path, handler);
};

App.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    this._router.handle(req, res);
  });

  server.listen(...args);
};
module.exports = App;
