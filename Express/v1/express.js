// const http = require("http");
// const url = require("url");

// const createApplication = function () {
//   app.routes = [];
//   function app(req, res) {
//     app.index = 0;
//     const urlParsed = url.parse(req.url);
//     const { pathname } = urlParsed;
//     const methodReq = req.method.toLowerCase();
    
//     function next(err) {
//       if (app.index >= app.routes.length) {
//         console.log("can not math the path");
//         return;
//       }
//       console.log(app.index, app.routes);
//       const { method, path, handler } = app.routes[app.index++];
//       if ((method == "middle")) {
//         if(path === "/" || pathname === path || pathname.startsWith(path + "/")) {
//           if(handler.length === 4) {
//             handler(req, res, next, err);
//           }else{
//             handler(req, res, next);
//           }
//         }
//         // next();
//       } else {
//         if (
//           (method === methodReq || method === "all") &&
//           (pathname === path || path === "*")
//         ) {
//           handler(req, res);
//         } else {
//           next()
//         }
//       }
//     }
//     next();
   
//   }

//   function addMethodsToApp() {
//     http.METHODS &&
//       http.METHODS.forEach((method) => {
//         method = method.toLowerCase();
//         app[method] = function (path, handler) {
//           app.routes.push({
//             method,
//             path,
//             handler,
//           });
//         };
//       });
//     app.all = function (path, handler) {
//       app.routes.push({
//         method: "all",
//         path,
//         handler,
//       });
//     };

//     app.use = function (path, handler) {
//       if(typeof path === "function") {
//         handler = path;
//         path = "/"
//       }

//       app.routes.push({
//         method: "middle",
//         path,
//         handler
//       })
//     };

//     app.use(function(req, res, next) {
//       req.name = "rober";
//       console.log(123);
//       next()
//     })

//     app.listen = function (...rest) {
//       const server = http.createServer(app);
//       server.listen(...rest);
//     };
//   }
  
//   addMethodsToApp();
//   return app;
// };

// exports = module.exports = createApplication;

