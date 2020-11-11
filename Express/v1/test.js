function getQueryVariable(url, key) {
  var query = url;
  var vars = query.split("?");
  if (vars[1] == undefined) {
    return;
  } else {
    let atrr = vars[1].split('&');
    if (key != undefined) {
      // 获取url中参数为key的值
      for (var i = 0; i < atrr.length; i++) {
        var pair = atrr[i].split("=");
        if( key == "token" && pair[0].toLowerCase() == 'token') {
          return decodeURIComponent(pair.slice(1).join("="));
        }
        if (pair[0] == key) { return decodeURIComponent(pair[1]); }
      }
      return "";
    }
    return;
  }
}

const url = "http://localhost:4200/#/data/flow-data/overview?Token=8a849c8c67a586ec0167a5898ada0001-ff80808167c97ccc0167c97cccac00001545273658540@8a849c8c67a586ec0167a58aaec20002:8a849c8c67a586ec0167a58bdb600004@4a_xuzhenfei@AJjfasMf======++++fds===&a=b"
const token = "8a849c8c67a586ec0167a5898ada0001-ff80808167c97ccc0167c97cccac00001545273658540@8a849c8c67a586ec0167a58aaec20002:8a849c8c67a586ec0167a58bdb600004@4a_xuzhenfei@AJjfasMf======++++fds==="
console.log(getQueryVariable(url, 'a'));
console.log(getQueryVariable(url, 'token') === token);