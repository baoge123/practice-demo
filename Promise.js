/**
 * Promise 是异步编程的一种解决方案：
从语法上讲，promise是一个对象，从它可以获取异步操作的消息；从本意上讲，它是承诺，承诺它过一段时间会给你一个结果。
promise有三种状态：pending(等待态)，fulfiled(成功态)，rejected(失败态)；状态一旦改变，就不会再变。创造promise实例后，它会立即执行。
回调地狱，代码难以维护， 常常第一个的函数的输出是第二个函数的输入这种现象
promise可以支持多个并发的请求，获取并发请求中的数据
这个promise可以解决异步的问题，本身不能说promise是异步的

根据promise A+规范原理，promise在自己的框架中，封装了一系列的内置的方法。
then 链式操作的用法 then中传了两个参数，then方法可以接受两个参数，第一个对应resolve的回调，第二个对应reject的回调。
捕获错误的方法 catch()
解析全部方法 all()
竞赛 race()
生成一个成功的promise  resolve()
生成一个失败的promise  reject()

 */
// let arr = 1
// let p1 = new Promise((resolve, reject) => {
//     console.log(arr)
//     resolve('成功')
//     reject('失败')
// })
// console.log("p1",p1)

// new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('FULFILLED')
//     }, 1000)
//   })

/**
 * Promise 的声明  
 * 首先呢，promise肯定是一个类，我们就用class来声明。
   由于new Promise((resolve, reject)=>{})，所以传入一个参数（函数），秘籍里叫他executor，传入就执行。
    executor里面有两个参数，一个叫resolve（成功），一个叫reject（失败）。
    由于resolve和reject可执行，所以都是函数，我们用let声明。
 */

// class Promise {
//     // 构造器
//     constructor(executor) {
//         // 成功
//         let resolve = () => {
//             console.log("成功")
//         };
//         // 失败
//         let reject = () => {
//             console.log("失敗")
//         };
//         // 立即执行
//         executor(resolve, reject);
//     }
// }

/**
 * class Promise{
    constructor(executor){
      // 初始化state为等待态
      this.state = 'pending';
      // 成功的值
      this.value = undefined;
      // 失败的原因
      this.reason = undefined;
      let resolve = value => {
        // state改变,resolve调用就会失败
        if (this.state === 'pending') {
          // resolve调用后，state转化为成功态
          this.state = 'fulfilled';
          // 储存成功的值
          this.value = value;
        }
      };
      let reject = reason => {
        // state改变,reject调用就会失败
        if (this.state === 'pending') {
          // reject调用后，state转化为失败态
          this.state = 'rejected';
          // 储存失败的原因
          this.reason = reason;
        }
      };
      // 如果executor执行报错，直接执行reject
      try{
        executor(resolve, reject);
      } catch (err) {
        reject(err);
      }
    }
  }
 * 
 */
//   Promise的几道基础题
//   const promise1 = new Promise((resolve, reject) => {
//     console.log('promise1')
//   })
//   console.log('1', promise1);
//   过程分析：

// 从上至下，先遇到new Promise，执行该构造函数中的代码promise1
// 然后执行同步代码1，此时promise1没有被resolve或者reject，因此状态还是pending

// 结果：
// 'promise1'
// '1' Promise{<pending>}


// 1.2 题目二
/**
 * const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve('success')
    console.log(2);
  });
  promise.then(() => {
    console.log(3);
  });
// promise.then(function resolve(value) {
//     console.log(10)
//     // console.log(value)
// },function reject (value) {
//      // console.log(100)
//     console.log(value)
// })
  console.log(4);
*/
//   过程分析：

// 从上至下，先遇到new Promise，执行其中的同步代码1
// 再遇到resolve('success')， 将promise的状态改为了resolved并且将值保存下来
// 继续执行同步代码2
// 跳出promise，往下执行，碰到promise.then这个微任务，将其加入微任务队列
// 执行同步代码4
// 本轮宏任务全部执行完毕，检查微任务队列，发现promise.then这个微任务且状态为resolved，执行它。

// 结果：
// 1 2 4 3

// 1.3 题目三
// const promise = new Promise((resolve, reject) => {
//     console.log(1);
//     console.log(2);
//   });
//   promise.then(() => {
//     console.log(3);
//   });
//   console.log(4);

//   过程分析

// 和题目二相似，只不过在promise中并没有resolve或者reject
// 因此promise.then并不会执行，它只有在被改变了状态之后才会执行。
// 结果：

// 1 2 4


// 1.4 题目四
// const promise1 = new Promise((resolve, reject) => {
//   console.log('promise1')
//   resolve('resolve1')
// })
// const promise2 = promise1.then(res => {
//   console.log(res)
// })
// console.log('1', promise1);
// console.log('2', promise2);
// 复制代码过程分析：

// 从上至下，先遇到new Promise，执行该构造函数中的代码promise1
// 碰到resolve函数, 将promise1的状态改变为resolved, 并将结果保存下来
// 碰到promise1.then这个微任务，将它放入微任务队列
// promise2是一个新的状态为pending的Promise
// 执行同步代码1， 同时打印出promise1的状态是resolved
// 执行同步代码2，同时打印出promise2的状态是pending
// 宏任务执行完毕，查找微任务队列，发现promise1.then这个微任务且状态为resolved，执行它。

// 结果：
// 'promise1'
// '1' Promise{<resolved>: 'resolve1'}
// '2' Promise{<pending>}
// 'resolve1'
