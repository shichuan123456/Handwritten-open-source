class Render {
  tokens = [];
  end = 0;
  start = 0;
  tagStart = "{{";
  tagEnd = "}}";
  type = "text";
  constructor(template, data) {
    this.template = template;
    this.data = data;
    this.tailStr = this.template.slice(this.end);
  }

  scan(tag) {
    this.end += tag.length;
    this.start = this.end;
    this.tailStr = this.template.slice(this.end);
  }

  eos() {
    return this.end >= this.template.length - 1;
  }

  scanUtil(tag) {
    while (!this.eos() && this.tailStr.indexOf(tag) !== 0) {
      this.end++;
      this.tailStr = this.template.substring(this.end);
    }
    if (
      this.eos() &&
      this.type == "text" &&
      this.template.slice(this.start, this.end) !== ""
    ) {
      this.tokens.push([this.type, this.template.slice(this.start, this.end)]);
      return;
    }

    if (this.tailStr.indexOf(tag) === 0) {
      const tokenStr = this.template.slice(this.start, this.end);
      const tokenStrTrimed = tokenStr.trim();
      this.type = tokenStrTrimed[0] === "#" ? "#" : this.type;

      if (this.type === "text" && tokenStr !== "") {
        this.tokens.push([this.type, tokenStr]);
        this.type = "name";
      } else if (this.type === "name" && tokenStrTrimed !== "") {
        this.tokens.push([this.type, tokenStrTrimed]);
        this.type = "text";
      } else if (this.type === "#" && tokenStrTrimed !== "") {
        this.tokens.push([this.type, tokenStrTrimed.slice(1)]);
        this.type = "text";
      }
    }
  }

  transformTemplateToTokens() {
    while (!this.eos()) {
      this.scanUtil(this.tagStart);
      this.scan(this.tagStart);
      this.scanUtil(this.tagEnd);
      this.scan(this.tagEnd);
    }
  }

  transformTokensToNested() {
    const nestedTokens = [],
      stack = [];
    let collection = nestedTokens;
    for (let i = 0, len = this.tokens.length; i < len; i++) {
      const type =
        this.tokens[i][0] === "#" && this.tokens[i][1] === "/"
          ? "/"
          : this.tokens[i][0];
      switch (type) {
        case "#": {
          collection.push(this.tokens[i].slice());
          collection = collection[i][2] = [];
          stack.push(collection);
          break;
        }
        case "/": {
          stack.pop();
          collection =
            stack.length === 0 ? nestedTokens : stack[stack.length - 1];
          break;
        }
        default: {
          collection.push(this.tokens[i]);
          break;
        }
      }
    }
    console.log(nestedTokens, "nestedTokens");
    return nestedTokens;
  }

  getValByPath(data, path) {
    const pathArr = path.split(".");
    let cur = data;
    for (let i = 0, len = pathArr.length; i < len; i++) {
      if (cur) {
        cur = cur[pathArr[i]];
      }
    }
    return cur;
  }

  composeNestedTokensToDomStr(data, tokens) {
    let domStr = "";
    for (let i = 0, il = tokens.length; i < il; i++) {
      if (tokens[i][0] === "text") {
        domStr += tokens[i][1];
      } else if (tokens[i][0] === "name") {
        domStr += data[tokens[i][1]];
      } else if (tokens[i][0] === "#") {
        for (let j = 0, jl = data[tokens[i][1]].length; j < jl; j++) {
          domStr += this.composeNestedTokensToDomStr(
            data[tokens[i][1]][j],
            tokens[i][2]
          );
        }
      }
    }
    return domStr;
  }
  render() {
    this.transformTemplateToTokens();
    const nestTokens = this.transformTokensToNested();
    console.log(this.composeNestedTokensToDomStr(this.data, nestTokens));
    return this.composeNestedTokensToDomStr(this.data, nestTokens);
  }
}

export default Render;
