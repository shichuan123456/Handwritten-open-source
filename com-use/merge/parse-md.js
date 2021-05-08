// 解析器  - Parsing & Compiling
class Parser {
  constructor(options) {
      this.tokens = [];
      this.token = null;
      this.options = options || {};
      this.renderer = new Renderer();
  }
  parse(src) {
      this.tokens = src.reverse(); // 先进先出
      var out = '';
      while (this.next()) {
          out += this.tok();
      }
      return out;
  }
  next() {
      this.token = this.tokens.pop();
      return this.token;
  }
  tok() {
      switch (this.token.type) {
       // ...
      case 'heading': {
          return this.renderer.heading(
              this.token.text,
              this.token.depth
          )
      }
      // ...
      }
  }
}
// 渲染器（代码生产器） 
class Renderer {
  constructor(options) {
      this.options = options || {};
  }
  heading(text, level, raw) {
      if (this.options.headerIds) {
          return '<h'
          + level
          + ' id="'
          + this.options.headerPrefix
          + '">'
          + text
          + '</h'
          + level
          + '>\n';
      }
      return '<h' + level + '>' + text + '</h' + level + '>\n';
  };
}