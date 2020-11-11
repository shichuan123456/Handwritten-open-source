class Ball {
  private static _instance = undefined

  // 构造函数申明为 private，就可以阻止 new Ball() 行为
  private constructor() {}

  public static getInstance = () => {
    if (Ball._instance === undefined) {
      Ball._instance = new Ball()
    }

    return Ball._instance
  }
}

// 使用
const ball1 = Ball.getInstance()
const ball2 = Ball.getInstance()
console.log(ball1 === ball2)
