function calculator(type, a, b) {
  const strategy = {
    add: function(a, b) {
      return a + b;
    },
    minus: function(a, b) {
      return a - b;
    },
    division: function(a, b) {
      return a / b;
    },
    times: function(a, b) {
      return a * b;
    }
  }
  
  return strategy[type](a, b);
}

calculator('add', 1, 1);
