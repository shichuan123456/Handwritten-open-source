// function stateFactory(status = "") {
//   const stateObj = {
//     status: "",
//     state: {
//       state1: function() {},
//       state2: function() {}
//     },
//     run: function() {
//       this.state[status]();
//     }
//   }

//   stateObj.status = status;
//   return stateObj
// }

// stateFactory('state1').run()

// 有三个模块需要显示，不同角色看到的模块应该不同
// function showPart1() {}
// function showPart2() {}
// function showPart3() {}

// // 获取当前用户的角色，然后决定显示哪些部分
// axios.get('xxx').then((role) => {
//   if(role === 'boss'){
//     showPart1();
//     showPart2();
//     showPart3();
//   } else if(role === 'manager') {
//     showPart1();
//     showPart2();
//   } else if(role === 'staff') {
//     showPart3();
//   }
// });

// // 先把各种角色都包装到一个ShowController类里面
// function ShowController() {
//   this.role = '';
//   this.roleMap = {
//     boss: function() {
//       showPart1();
//       showPart2();
//       showPart3();
//     },
//     manager: function() {
//       showPart1();
//     	showPart2();
//     },
//     staff: function() {
//       showPart3();
//     }
//   }
// }

// ShowController.prototype.show = function() {
//   axios.get('xxx').then((role) => {
//     this.role = role;
//     this.roleMap[this.role]();
//   });
// }

// // 使用时
// new ShowController().show();


// 先来四个方向的基本运动
function moveUp() {}
function moveDown() {}
function moveLeft() {}
function moveRight() {}

// 具体移动的方法，可以接收一个或两个参数，一个就是基本操作，两个参数就是左上，右下这类操作
function move(...args) {
  if(args.length === 1) {
    if(args[0] === 'up') {
      moveUp();
    } else if(args[0] === 'down') {
      moveDown();        
    } else if(args[0] === 'left') {
      moveLeft();        
    } else if(args[0] === 'right') {
      moveRight();        
    }
  } else {
    if(args[0] === 'left' && args[1] === 'up') {
      moveLeft();
      moveUp();
    } else if(args[0] === 'right' && args[1] === 'down') {
      moveRight();
      moveDown();
    }
    // 后面还有很多if...
  }
}

// 建一个移动控制类
function MoveController() {
  this.status = [];
  this.moveHanders = {
    // 写上每个指令对应的方法
    up: moveUp,
    dowm: moveDown,
    left: moveLeft,
    right: moveRight
  }
}

// MoveController添加一个实例方法来触发运动
MoveController.prototype.run = function(...args) {
  this.status = args;
  this.status.forEach((move) => {
    this.moveHanders[move]();
  });
}

// 使用时
new MoveController().run('left', 'up')
