const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

const resolvePromise = (promise2, x, resolve, reject) => {

}

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = ''
    this.reason = ''


    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    function resolve(value) {
      if(this.status === PENDING) {
        this.status = RESOLVED
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    function reject(reason) {
      if(this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())

      }
    }

    try{
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }

  then(onfulfilled, onrejected) {
    let promise2 = new Promise((resolve, reject) => {
      if(this.status === RESOLVED) {
        setTimeout(() => {
         try{
          let x = onfulfilled(this.value)
          // 判断x的值 => promise2的状态
          resolvePromise(promise2, x, resolve, reject)
         } catch(e) {
           reject(e)
         }
        }, 0)
      }
      if(this.status === REJECTED) {
        setTimeout(() => {
          try{
           let x = onrejected(this.reason)
           // 判断x的值 => promise2的状态
           resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
         }, 0)
      }
      if(this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try{
             let x = onfulfilled(this.value)
             // 判断x的值 => promise2的状态
             resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
           }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try{
             let x = onrejected(this.reason)
             // 判断x的值 => promise2的状态
             resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
           }, 0)
          
        })
      }
    })
  }
}