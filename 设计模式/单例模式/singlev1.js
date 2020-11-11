var Ball = /** @class */ (function () {
    // 构造函数申明为 private，就可以阻止 new Ball() 行为
    function Ball() {
    }
    Ball._instance = undefined;
    Ball.getInstance = function () {
        if (Ball._instance === undefined) {
            Ball._instance = new Ball();
        }
        return Ball._instance;
    };
    return Ball;
}());

var ball1 = Ball.getInstance();
var ball2 = Ball.getInstance();
console.log(ball1 === ball2);
