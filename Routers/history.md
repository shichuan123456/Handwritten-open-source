# history

## 概述

* 表示当前窗口的浏览历史
* 保存了当前窗口访问过的所有页面的网址 

```javascript
window.history.length
```
* 为了安全，不允许脚本读取这些地址，但是允许在地址之间导航,浏览器工具栏的前进和后退按钮，其实就是对history对象进行操作

```javascript
history.back()
history.go(-1)
```
## 属性
> history.length: 当前窗口访问过的网址数量（包括当前网址）
> history.state: History堆栈最上层的状态值 

## 方法
> history.back()   
> history.forward()   
> history.go()  "0": 刷新当前页面   

*注意，移动到以前访问过的页面时，页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页*

>history.pushState(state, title, url)  
*state: 状态对象，用于popstate事件*   
*title: 新页面标题，但是，现在所有浏览器都忽视这个参数，所以这里可以填空字符串*   
*url: 新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址*   

**pushState()方法不会触发页面刷新，只会到时history对象发生变化，地址栏有反应，通过history.state获取状态对象**

> history.replaceState()
*用来修改history对象的当前记录，其余和pushState方法一致*

```javascript
history.pushState({page: 1}, 'title 1', '?page=1')
// URL 显示为 http://example.com/example.html?page=1

history.pushState({page: 2}, 'title 2', '?page=2');
// URL 显示为 http://example.com/example.html?page=2

history.replaceState({page: 3}, 'title 3', '?page=3');
// URL 显示为 http://example.com/example.html?page=3

history.back()
// URL 显示为 http://example.com/example.html?page=1

history.back()
// URL 显示为 http://example.com/example.html

history.go(2)
// URL 显示为 http://example.com/example.html?page=3

```

## popstate事件

每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。

*注意，仅仅调用pushState()方法或replaceState()方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用History.back()、History.forward()、History.go()方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。页面第一次加载的时候，浏览器不会触发popstate事件*

```javascript
window.onpopstate = function (event) {
  console.log('location: ' + document.location);
  console.log('state: ' + JSON.stringify(event.state));
};

// 或者
window.addEventListener('popstate', function(event) {
  console.log('location: ' + document.location);
  console.log('state: ' + JSON.stringify(event.state));
});


```

## URLSearchParams API

```javascript
  var paramsString = 'q=URLUtils.searchParams&topic=api';
  var searchParams = new URLSearchParams(paramsString);

  has()：返回一个布尔值，表示是否具有某个参数
  get()：返回指定参数的第一个值
  getAll()：返回一个数组，成员是指定参数的所有值
  set()：设置指定参数
  delete()：删除指定参数
  append()：在查询字符串之中，追加一个键值对
  toString()：返回整个查询字符串
  keys()：遍历所有参数名
  values()：遍历所有参数值
  entries()：遍历所有参数的键值对
```



```javascript
// URL: https://example.com?version=1.0
var params = new URLSearchParams(location.search.slice(1));
params.set('version', 2.0);

window.history.replaceState({}, '', `${location.pathname}?${params}`);
// URL: https://example.com?version=2.0
```