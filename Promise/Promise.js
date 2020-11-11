const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(excutor) {
  const self = this;
  self.status = PENDING;
  self.onFulfilled = [];
  self.onRejected = [];
  if(typeof excutor !== 'function') {
    throw new TypeError('must pass function')
  }

  function resole(value) {
    if(self.status === PENDING) {
      self.value = value;
      self.status = FULFILLED;
      self.onFulfilled.forEach(fn => fn);
    }
  }

  function reject(reason) {
    if(self.status === REJECTED) {
      self.reason = reason;
      self.status = onRejected;
      self.onRejected.forEach(fn => fn);
    }
  }

  try {
    excutor(resole, reject)
  } catch (e) {
    reject(e)
  }
}


Promise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason};

  

}