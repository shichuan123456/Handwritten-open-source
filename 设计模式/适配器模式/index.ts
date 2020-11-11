interface ITarget {
  // 标准方式是 hello
  hello: () => void
}

class Adaptee {
  // 要被适配的类方法叫 sayHello
  sayHello() {
    console.log('hello')
  }
}

// 适配器继承 Adaptee 并实现 ITarget
class Adapter implements ITarget {
  private adaptee: Adaptee 

  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee
  }

  hello() {
    // 用 adaptee.sayHello 对接到 hello
    this.adaptee.sayHello()
  }
}
