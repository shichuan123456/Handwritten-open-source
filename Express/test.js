const express = require("./index");

const app = express();

app.get(
  "/name",
  (req, res, next) => {
    console.log("/name-1");
    next();
  },
  (req, res, next) => {
    console.log("/name-1-2");
    next();
  }
);

app.get("/name", (req, res, next) => {
  console.log("/name-2");
  next();
  // res.end("/name-end");
});

// app.get("/users/:userId/books/:bookId", function (req, res) {
//   console.log(req.params);
//   res.end("/users/:userId/books/:bookId");
// });

app.listen(4000, () => {
  console.log("server is started");
});
