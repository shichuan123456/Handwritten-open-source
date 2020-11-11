/* JSON.stringify:支持的数据类型：object，number，string，true，false，null， */

function deepClone(obj) {
  var dist;
  if(obj && typeof obj === 'object') {
    if(obj instanceof Array) {
      dist = [];
    }else if(obj instanceof Date) {
      dist = new Date(obj);
    } else if(obj instanceof RegExp) {
      dist = new RegExp(obj.source, obj.flags);
    } else if(obj instanceof Function) {
      dist = function() {
        return obj.apply(this, arguments)
      };
    } else {
      dist = {}
    }
    
    for(let key in obj) {
      if(obj.hasOwnProperty(key)) {
        dist[key] = deepClone(obj[key]);
      }
    }
  } else {
    return obj;
  }
  return dist;
}


var obj


const a = {
  b: {
    c: [1,2,3],
    d: /bc/g,
    e: function() {
      return 3
    }
  }
}

dd = deepClone(a)
dd.b.c = 3

console.log(a.b.e(), dd.b.e());


