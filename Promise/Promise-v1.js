//完整版，代码后面附有实例，方便检验

(function(window,undefined){

  // resolve 和 reject 最终都会调用该函数
  var final = function(status,value){
      var promise = this, fn, st;
          
      if(promise._status !== 'PENDING') return;
      
      // 所以的执行都是异步调用，保证then是先执行的
      setTimeout(function(){
          promise._status = status;
          st = promise._status === 'FULFILLED'
          queue = promise[st ? '_resolves' : '_rejects'];
  
          while(fn = queue.shift()) {
              value = fn.call(promise, value) || value;
          }
  
          promise[st ? '_value' : '_reason'] = value;
          promise['_resolves'] = promise['_rejects'] = undefined;
      });
  }
  
  
  //参数是一个函数，内部提供两个函数作为该函数的参数,分别是resolve 和 reject
  var Promise = function(resolver){
      if (!(typeof resolver === 'function' ))
          throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
      //如果不是promise实例，就new一个
      if(!(this instanceof Promise)) return new Promise(resolver);
  
      var promise = this;
      promise._value;
      promise._reason;
      promise._status = 'PENDING';
      //存储状态
      promise._resolves = [];
      promise._rejects = [];
      
      //
      var resolve = function(value) {
          //由於apply參數是數組
          final.apply(promise,['FULFILLED'].concat([value]));
      }
  
      var reject = function(reason){
          final.apply(promise,['REJECTED'].concat([reason]));
      }
      
      resolver(resolve,reject);
  }
  
  Promise.prototype.then = function(onFulfilled,onRejected){
      var promise = this;
      // 每次返回一个promise，保证是可thenable的
      return new Promise(function(resolve,reject){
          
          function handle(value) {
              // 這一步很關鍵，只有這樣才可以將值傳遞給下一個resolve
              var ret = typeof onFulfilled === 'function' && onFulfilled(value) || value;
  
              //判断是不是promise 对象
              if (ret && typeof ret ['then'] == 'function') {
                  ret.then(function(value) {
                      resolve(value);
                  }, function(reason) {
                      reject(reason);
                  });
              } else {
                  resolve(ret);
              }
          }
  
          function errback(reason){
              reason = typeof onRejected === 'function' && onRejected(reason) || reason;
              reject(reason);
          }
  
          if(promise._status === 'PENDING'){
              promise._resolves.push(handle);
              promise._rejects.push(errback);
          }else if(promise._status === FULFILLED){ // 状态改变后的then操作，立刻执行
              handle(promise._value);
          }else if(promise._status === REJECTED){
              errback(promise._reason);
          }
      });
  }
  
  Promise.prototype.catch = function(onRejected){
      return this.then(undefined, onRejected)
  }
  
  Promise.prototype.delay = function(ms,value){
      return this.then(function(ori){
          return Promise.delay(ms,value || ori);
      })
  }
  
  Promise.delay = function(ms,value){
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(value)
      }, ms)
    })
  }
  
  Promise.resolve = function(arg){
      return new Promise(function(resolve, reject) {
        resolve(arg)
      })
  }
  
  Promise.reject = function(arg){
      return new Promise(function(resolve, reject) {
        rejext(arg)
      })
  }
  
  Promise.all = function(promises){
      const res = [];
      let len = promises.length, count = len;
      if (!Array.isArray(promises)) {
          throw new TypeError('You must pass an array to all.');
      }
      
      return new Promise((resolve, reject) => {
        function resolver(index) {
          return function(value) {
            resolveAll(index, value);
          }
        }

        function rejecter(reason) {
          reject(reason);
        }

        function resolveAll(index, value) {
          result[index] = value;
          if(--count == 0) {
            resolve(result);
          }
        }

        for(let i = 0; i < len; i++) {
          promises[i].then(resolver(i), rejecter);
        }
      })
  }
  
  Promise.race = function(promises){
    if (!Array.isArray(promises)) {
      throw new TypeError('promises must be an array')
    }

    return new Promise(function(resolve, reject) {
      for(let i =0, len =  promises.length; i < len; i++) {
        promises[i].then(resolve, reject);
      }
    })
  }
  
  window.Promise = Promise;
  
  })(window);
  
