const path = require("path")
const fs = require("fs")
const vm = require("vm")


function MyModule(id = "") {
  this.id = id;
  this.dirname = path.dirname(id)
  this.exports = {}
  this.filename = ""
  this.loaded = false
}

MyModule.prototype.require = function(id) {
  return MyModule._load(id)
}

MyModule._cache = Object.create(null)
MyModule._extensions = Object.create(null)

MyModule._load = function(request) {
  const filename = MyModule._resolveFilename(request)

  const cachedModule = MyModule._cache[filename]
  if(cachedModule !== undefined) {
    return cachedModule.exports
  }

  const module = new MyModule(filename)

  MyModule._cache[filename] = module;

  module.load(filename);

  return module.exports

}

MyModule._resolveFilename = function (request) {
  const filename = path.resolve(request) // 获取传入参数的绝对路径
  const extname = path.extname(request)  // 获取后缀
  if(!extname){
    const exts = Object.keys(MyModule._extensions)
    for(let i =  0; i < exts.length; i++) {
      const currentPath = `${filename}${exts[i]}`
      if(fs.existsSync(currentPath)) {
        return currentPath
      }
    }

  }

  return filename

}

MyModule.prototype.load = function(filename) {
  const extname = path.extname(filename)
  MyModule._extensions[extname](this, filename);

  this.loaded = true;
}

MyModule._extensions['.js'] = function (module, filename) {
  const content = fs.readFileSync(filename, 'utf8');
  module._compile(content, filename);
}

MyModule.wrapper = [
  '(function (exports, require, module, __filename, __dirname',
  '\n});'
]

MyModule.wrap = function(script) {
  return MyModule.wrapper[0] + script + MyModule.wrapper[1]
}

MyModule.prototype._compile = function(content, filename) {
  const wrap = MyModule.wrap(content)
  const compiledWrapper = vm.runInNewContext(wrap, {
    filename,
    lineOffset: 0,
    displayErrors: true,
  })

  const dirname = path.dirname(filename)

  compiledWrapper.call(this,exports, this.exports, this,require, this, filename, dirname)
}

MyModule._extensions['.json'] = function(module, filename) {
  const content = fs.readFileSync(filename, 'utf-8');
  module.exports = JSON.parse(content);
}