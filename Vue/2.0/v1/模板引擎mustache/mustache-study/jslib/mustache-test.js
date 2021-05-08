function Scanner(string) {
  this.string = string
  this.tail = string
  this.pos = 0
}

Scanner.prototype.eos = function eos() {
  return this.tail === ''
}

Scanner.prototype.scan = function scan(re) {
  var match = this.tail.match(re)

  if(!match || match.index !== 0) {
    return ''
  }

  var string = match[0]

  this.tail = this.tail.substring(string.length)
  this.pos += string.length

  return string
}

Scanner.prototype.scanUntil = function scanUntil(re) {
  var index = this.tail.search(re), match;

  switch(index) {
    case -1: 
      match = this.tail
      this.tail = ''
    case 0:
      match = '';
      break;
    default:
      match = this.tail.substring(0, index)
      this.tail = this.tail.substring(index)
  }

  this.pos += match.length

  return match;
}


var str1 = "NaN means not a number. Infinity contains -Infinity and +Infinity in JavaScript.",
    str2 = "My grandfather is 65 years old and My grandmother is 63 years old.",
    str3 = "The contract was declared null and void.";

console.log(str1.match(/[a-e]/g));   // "number" 是字符串。返回["number"]
