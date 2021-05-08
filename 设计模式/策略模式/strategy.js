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


var strategies = {
  isNotEmpty(value, errorMsg) {
    if(value === '') {
      return errorMsg
    }
  },
  minLength(value, len, errorMsg) {
    if(value.length < len) {
      return errorMsg
    }
  },
  isMobileNumber(value, errorMsg) {
    if(!/1[3|5|8][0-9]{9}$/.test(value)) {
      return errorMsg
    }
  }
}

var Validator = function() {
  this.cache = []
}

Validator.prototype.add = function() {

}

Validator.prototype.start = function() {
  
}