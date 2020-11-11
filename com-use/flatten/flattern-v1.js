function flatternForever(target, result) {
  for(var i = 0, len = target.length; i < len; i++) {
    if(Array.isArray(target[i])) {
      flatternForever(target[i], result);
    }else{
      result.push(target[i]);
    }
  }
  return result;
}


function flatternWithDepth(target, result, depth) {
  for(var i = 0, len = target.length; i < len; i++) {
    if(Array.isArray(target[i]) && depth > 0) {
      flatternWithDepth(target[i], result, depth - 1);
    }else{
      result.push(target[i]);
    }
  }
  return result;
}

function arrayFlattern(target, depth) {
  if(depth == undefined) {
    return flatternForever(target, []);
  }
  return flatternWithDepth(target, [], depth);
}

const target = [[1,2,3], [4,[5,6,7,[8,9]]]]
console.log(arrayFlattern(target));
console.log(arrayFlattern(target, 1));