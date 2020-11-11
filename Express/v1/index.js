const express = require('./express')

const app = express();
const PORT = 3000;

app.get("/api/users", function(req, res) {
  res.end("123" + req.name + req.age)
})

app.all("/api/hh", function(req, res) {
  res.end("456"  + req.name + req.age)
})

app.use(function(req, res, next) {
  req.age = 18;
  next();
})

app.all("*", function(req, res) {
  res.end("all*" + req.name + req.age)
})

app.listen(PORT, () => {
  console.log("server is started!!!");
});