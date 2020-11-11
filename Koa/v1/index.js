// const Koa = require('koa');
const Koa = require("./myKoa/application");
const app = new Koa();

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  //   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  console.log(`${ctx.req.method} ${ctx.req.url} - ${ms}ms`);
});

app.use((ctx) => {
 return new Promise((resolve, reject) => {
  setTimeout(() => {
    ctx.body = "robert"
    resolve()
  }, 3000)
 })
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}/`);
});