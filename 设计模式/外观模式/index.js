// function model1() {}

// function model2() {}

// // 可以提供一个更高阶的接口，组合好了model1和model2给外部使用
// function use() {
//   model2(model1());
// }


// // 一个选项卡类，他内部可能有多个子模块
// function Tab() {}

// Tab.prototype.renderHTML = function() {}    // 渲染页面的子模块
// Tab.prototype.bindEvent = function() {}    // 绑定事件的子模块
// Tab.prototype.loadCss = function() {}    // 加载样式的子模块

// // 对外不需要暴露上面那些具体的子模块，只需要一个高级接口就行
// Tab.prototype.init = function(config) {
//   this.loadCss();
//   this.renderHTML();
//   this.bindEvent();
// }


function addEvent(dom, type, fn) {
  if(dom.addEventListener) {
    addEvent = dom.addEventListener(type, fn, false);
  } else if(dom.attachEvent) {
    addEvent = dom.attachEvent("on" + type, fn);
  } else {
    addEvent = function() {
      dom["on" + type] = fn;
    }
  }
  addEvent(dom, type, fn);
}


