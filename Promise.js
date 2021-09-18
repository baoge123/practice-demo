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


// 2.2 题目二
// const promise = new Promise((resolve, reject) => {
//   console.log(1);
//   setTimeout(() => {
//     console.log("timerStart");
//     resolve("success");
//     console.log("timerEnd");
//   }, 0);
//   console.log(2);
// });
// promise.then((res) => {
//   console.log(res);
// });
// console.log(4);
// 复制代码过程分析：
// 和题目1.2很像，不过在resolve的外层加了一层setTimeout定时器。

// 从上至下，先遇到new Promise，执行该构造函数中的代码1
// 然后碰到了定时器，将这个定时器中的函数放到下一个宏任务的延迟队列中等待执行
// 执行同步代码2
// 跳出promise函数，遇到promise.then，但其状态还是为pending，这里理解为先不执行
// 执行同步代码4
// 一轮循环过后，进入第二次宏任务，发现延迟队列中有setTimeout定时器，执行它
// 首先执行timerStart，然后遇到了resolve，将promise的状态改为resolved且保存结果并将之前的promise.then推入微任务队列
// 继续执行同步代码timerEnd
// 宏任务全部执行完毕，查找微任务队列，发现promise.then这个微任务，执行它。

// 因此执行结果为：
// 1
// 2
// 4
// "timerStart"
// "timerEnd"
// "success"


// 2.3 题目三
// 题目三分了两个题目，因为看着都差不多，不过执行的结果却不一样，大家不妨先猜猜下面两个题目分别执行什么：
// (1):
// setTimeout(() => {
//   console.log('timer1');
//   setTimeout(() => {
//     console.log('timer3')
//   }, 0)
// }, 0)
// setTimeout(() => {
//   console.log('timer2')
// }, 0)
// console.log('start')
// 复制代码(2):
// setTimeout(() => {
//   console.log('timer1');
//   Promise.resolve().then(() => {
//     console.log('promise')
//   })
// }, 0)
// setTimeout(() => {
//   console.log('timer2')
// }, 0)
// console.log('start')
// 复制代码执行结果：
// 'start'
// 'timer1'
// 'timer2'
// 'timer3'
// 复制代码'start'
// 'timer1'
// 'promise'
// 'timer2'
// 复制代码这两个例子，看着好像只是把第一个定时器中的内容换了一下而已。
// 一个是为定时器timer3，一个是为Promise.then
// 但是如果是定时器timer3的话，它会在timer2后执行，而Promise.then却是在timer2之前执行。
// 你可以这样理解，Promise.then是微任务，它会被加入到本轮中的微任务列表，而定时器timer3是宏任务，它会被加入到下一轮的宏任务中。
// 理解完这两个案例，可以来看看下面一道比较难的题目了。


// .6 题目六
// Promise.resolve().then(() => {
//   return new Error('error!!!')
// }).then(res => {
//   console.log("then: ", res)
// }).catch(err => {
//   console.log("catch: ", err)
// })
// 复制代码猜猜这里的结果输出的是什么 🤔️ ？
// 你可能想到的是进入.catch然后被捕获了错误。
// 结果并不是这样的，它走的是.then里面：
// "then: " "Error: error!!!"
// 复制代码这也验证了第4点和第6点，返回任意一个非 promise 的值都会被包裹成 promise 对象，因此这里的return new Error('error!!!')也被包裹成了return Promise.resolve(new Error('error!!!'))。
// 当然如果你抛出一个错误的话，可以用下面👇两的任意一种：
// return Promise.reject(new Error('error!!!'));
// // or
// throw new Error('error!!!')

"async1 start"
"async2"
"start"
"async1 end"
'timer2'
'timer3'
'timer1'
