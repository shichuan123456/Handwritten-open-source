
/* 现状：操作系统，计算机网络，数据结构和算法 没用 不了解 用不到 java api 开发框架
用途：面试，应用到项目中，接口、框架翻译，不需要自己实现不代表不需要了解 基础框架 redis 调表（有序结构）
代码：健壮、拓展性强、性能
目的：高质量代码，训练逻辑思维，

系统高效的学习数据结构和算法 抽象 
数据结构：一组数据的存储结构，是为算法服务，静态，组织数据的方式
算法：操作数据的一种方法，作用于特定的数据结构之上，操作数据结构
数组随机访问：二分查找 链表不可以
提高效率，节省存储空间
是什么，为什么
复杂度分析：更快更省 二分图，最大流 20个
边学边练
讨论，互动，请教
打怪升级目标
沉淀法：反复迭代不断沉淀
书读百遍其义自见

如何分析统计算法的执行效率和资源消耗

快和省 执行效率 时间空间复杂度分析
事后统计法：直接运行代码，通过统计监控获取时间和占用的内存大小 ：
1、测试结果非常依赖测试环境
2、测试结果受数据规模的影响很大（数据的有序度，数据规模的大小，小规模：插入会比快速排序快）
假定每行代码执行时间相同 T(n) = (2n+2)*unit_time 所有代码执行的时间和每行代码执行次数成正比

T(n) = O(f(n))
T(n):表示代码执行的时间，n：数据规模的大小
f(n):每行代码执行次数综合
O：表示成正比
O(n)
代码执行时间随数据规模增长的变化趋势：渐进时间复杂度
1、循环法则：只关注循环执行次数最多的一段代码
2、加法法则：总复杂度等于量级最大的那段代码的复杂度 常数阶不管多大对于执行时间有多大的影响，对增长的趋势都没有影响
3、乘法法则：O(1) O(logn) O(n) O(nlogn) O(n2) O(z**n) O(n!) 多项式量级和非多项式量级















 */













const cluster = require('cluster');
const os = require('os');
const cupCount = os.cpus().length; 

module.exports = fork;

/**
 * @name {Function} frok
 * @param {Object} options 
 * - {String} exec [必填]进程文件 
 * - {Array} args [必填]进程命令参数
 * - {Boolean} silent 是否要发送输 默认false
 * - {Number} count, 进程数量 默认为CPU核数
 * - {Boolean} refork, 当work进程退出或者断开，是否需要重启, 默认是true
 */
function fork (options = {}) {
  if (cluster.isWorker) {
    return;
  }

  if( !options.exec ) {
    return;
  }

  const totalWorkerCount = options.count > 0 ? options.count : cupCount;

  let opts = {
    exec: options.exec
  }; 
  let newWorker;
  let workerCount = 0;

  // 启动主进程
  cluster.setupMaster(opts);

  for( let i=0; i<totalWorkerCount; i++ ) { 
    // 根据配置启动相关的子进程
    newWorker = forkWorker();
  }

  /**
   * @name forkWorker worker进程启动方法
   * @return {Object} 
   */
  function forkWorker() { 
    // 判断进程是否超过CPU数量
    if( workerCount >= cupCount ) {
      return;
    }
    // 如果不超过CPU数量的就fork worker进程
    workerCount ++;
    return cluster.fork();
  }

  /**
   * @name reforkWorker worker进程重启方法
   * @return {Object} 
   */
  function reforkWorker() {
    return forkWorker()
  }

  // 监听进程是否退出
  cluster.on('exit', (worker, code, signal) => { 
    console.log( `the worker pid  ${worker.process.pid} has exited` )
    // 重新fork进程
    reforkWorker();
  });

  // 监听进程是否断开连接
  cluster.on('disconnect', (worker) => { 
    console.log( `the worker pid  ${worker.process.pid} has disconnected` )
    let isDead = worker.isDead && worker.isDead();
    if ( isDead ) {
      console.log( `the worker pid  ${worker.process.pid} is dead` )
      return;
    } 
    workerCount --;
    reforkWorker();
  });

  return cluster;
}