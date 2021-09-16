+true;
!"Lydia";
console.log(+true)

let arr = [
    [1, 2, 1],
    [3, [4, 1]],
    [5, 1, 10]
];
 console.log(arr.flat(2),"======================")
 function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}

function newArr(arr) {
    // return arr.reduce((pre,cur) => [... new Set(pre.concat(Array.isArray(cur)? newArr(cur):cur))],[])
    let a = []
    arr.reduce((pre, cur) => a = [...new Set(pre.concat(Array.isArray(cur) ? newArr(cur) : cur))], [])
    return a
}
console.log(newArr(arr))

let num = newArr(arr).reduce((pre, cur) => {
    return pre - cur
})

console.log(num, "num")

/**
 * 函数防抖
 * 触发事件后在n秒后执行，如果n秒内又触发事件，则重新计算时间
 */
 function debounce(fn, wait = 1000) {
    let timer;
    return function () {
      let context = this;
      let args = arguments;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
      
    };
  }
  function debounce (fn ,wait = 1000) {
    let timer ; // 缓存一个定时器对象
    return function (...args) {
      // 当触发时定时器对象存在，则清除重新计时
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this,args) // 需要防抖的操作
        timer = null
      }, wait);
    }
  }
  /**
   * 函数节流
   * 触发事件立即执行，但在n秒内连续触发则只执行一次
   */
  function throttle(fn, wait = 1000) {
    let timer;
    return function () {
      if (timer != null) return;
      let context = this;
      let args = arguments;
      fn.apply(context, args);
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    };
  }
  function throttle (fn, wait = 1000) {
    let timer;
    return function (...args) {
      if(flag) return
      timer = setTimeout(() => {
        fn.apply(this,args)
        timer = null
      }, wait);
    }
  }
  function li () {
      console.log("====")
  }
//   btnThrottle: throttle(function () {
//     this.fn()
//   }, 2000),
throttle(li,2000)
