const http = require('http')
const process = require('process')

const PORT = 3001

const server = http.createServer((req, res) => {
  res.write('hello fork')
  res.end()
})

server.listen(PORT, () => {
  console.log(`the server is start at port ${PORT}, PID=${process.pid}`);
})
