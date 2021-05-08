const fork = require('./fork.js')
const path = require('path')

fork({
  exec: path.resolve(__dirname, './worker.js')
})