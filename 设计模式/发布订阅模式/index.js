class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if(this.events[event]) {
      this.events[event].push(callback);
    } else {
      this.events[event] = [callback]
    }
  }

  publish(event, ...args) {
    const subscribedEvents = this.events[event];
    if(subscribedEvents && subscribedEvents.length) {
      subscribedEvents.forEach(callback => {
        callback.call(this, ...args);
      });
    }
  }

  unsubscribe(event, callback) {
    const subscribedEvents = this.events[event];
    if(subscribedEvents && subscribedEvents.length) {
      this.events[event] = this.events[event].filter(cb => cb !== callback)
    }
  }
}


const request = require("request");
const pubSub = new PubSub();

request('https://www.baidu.com', function (error, response) {
  if (!error && response.statusCode == 200) {
    console.log('get times 1');
    // 发布请求1成功消息
    pubSub.publish('request1Success');
  }
});

// 订阅请求1成功的消息，然后发起请求2
pubSub.subscribe('request1Success', () => {
  request('https://www.baidu.com', function (error, response) {
    if (!error && response.statusCode == 200) {
      console.log('get times 2');
      // 发布请求2成功消息
      pubSub.publish('request2Success');
    }
  });
})

// 订阅请求2成功的消息，然后发起请求3
pubSub.subscribe('request2Success', () => {
  request('https://www.baidu.com', function (error, response) {
    if (!error && response.statusCode == 200) {
      console.log('get times 3');
      // 发布请求3成功消息
      pubSub.publish('request3Success');
    }
  });
})
