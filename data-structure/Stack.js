function Stack() {
  this.stack = [];
}

Stack.prototype = {
  constructor: Stack,
  push(value) {
    return this.stack.push(value);
  },
  pop() {
    return this.stack.pop();
  },
  clear() {
    this.stack = [];
  },
  readTop() {
    return this.stack[this.stack.length - 1];
  },
  read() {
    return this.stack;
  }
};

function reverse(arr){
  var ArrStack = new Stack();
  for(var i = arr.length - 1; i >= 0; i--){
      ArrStack.push(arr[i]);
  }
  return ArrStack.read();
}

const arr = [1,2,3,4,5]
console.log(reverse(arr));

