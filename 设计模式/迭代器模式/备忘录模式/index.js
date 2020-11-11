// function memo() {
//   const cache = {};

//   return function (arg) {
//     if (cache[arg]) {
//       return cache[arg];
//     } else {
//       // 没缓存的时候先执行方法，得到结果res
//       // 然后将res写入缓存
//       cache[arg] = res;
//       return res;
//     }
//   };
// }

// function pageCache(pageId) {
//   const cache = {};
  
//   return function(pageId) {
//     // 为了保持返回类型一致，我们都返回一个Promise
//     if(cache[pageId]) {
//       return Promise.resolve(cache[pageId]);
//     } else {
//       return axios.get(pageId).then((data) => {
//         cache[pageId] = data;
//         return data;
//       })
//     }
//   }
// }


function moveDiv() {
  this.states = [];       // 一个数组记录所有状态
  this.currentState = 0;  // 一个变量记录当前状态位置
}

// 移动方法，每次移动记录状态
moveDiv.prototype.move = function(type, num) {
  changeDiv(type, num);       // 伪代码，移动DIV的具体操作，这里并未实现
  
  // 记录本次操作到states里面去
  this.states.push({type,num});
  this.currentState = this.states.length - 1;   // 改变当前状态指针
}

// 前进方法，取出状态执行
moveDiv.prototype.forward = function() {
  // 如果当前不是最后一个状态
  if(this.currentState < this.states.length - 1) {
    // 取出前进的状态
    this.currentState++;
    const state = this.states[this.currentState];
    
    // 执行该状态位置
    changeDiv(state.type, state.num);
  }
}

// 后退方法是类似的
moveDiv.prototype.back = function() {
  // 如果当前不是第一个状态
  if(this.currentState > 0) {
    // 取出后退的状态
    this.currentState--;
    const state = this.states[this.currentState];
    
    // 执行该状态位置
    changeDiv(state.type, state.num);
  }
}

