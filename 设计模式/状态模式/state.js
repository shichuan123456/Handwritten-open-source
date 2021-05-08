/*  
  更快更小更易于维护，更好的多端渲染支持，更好的兼容Vue2.0
  VirturalDom重构 更多的编译优化带来更好的运行时的效率的提升
  Vue2.0：不管是原生Dom还是自定义组件都传入给h函数，知道运行时才会
    去判断。这样就减损了运行时开发效率。
  优化slots的生成，生成render函数，就不用更多的渲染，不用用户手动优化
  new Proxy({})
  customerRenderApi runtimeCore virtual Dom算法 与Dom无关
  hooks 可以在任何框架使用的概念，逻辑的重用和组合机制 取代mixin plugin ts里面的decorator
  
 */

// 对象中：1、当前状态。2、所有状态以及各自对应的执行方法。3、run，执行方法
function stateFactory(status = "") {
  const statusObj = {
    status: status,
    stats: {
      stat1: function() { console.log('stats'); },
      stat2: function() { console.log('stats'); }
    },
    run() {
      this.stats[status]()
    }
  }
  return statusObj
}

stateFactory('state1').run()

// 有三个模块需要显示，不同角色看到的模块应该不同
function showPart1() {}
function showPart2() {}
function showPart3() {}

// 获取当前用户的角色，然后决定显示哪些部分
axios.get('xxx').then((role) => {
  if(role === 'boss'){
    showPart1();
    showPart2();
    showPart3();
  } else if(role === 'manager') {
    showPart1();
    showPart2();
  } else if(role === 'staff') {
    showPart3();
  }
});


function ShowController() {
  this.role = ''
  this.showMap = {
    boss() {
      showPart1();
      showPart2();
      showPart3();
    },
    manager() {
      showPart1();
      showPart2();
    },
    staff() {
      showPart3();
    }
  }
}
ShowController.prototype.show(role) {
  this.role = role
  this.showMap[this.role] && this.showMap[this.role]
}



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

