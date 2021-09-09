/**
 * arr.reduce(function(prev,cur,index,arr){
...
}, init);
@arr 表示原数组；
@prev 表示上一次调用回调时的返回值，或者初始值 init;
@cur 表示当前正在处理的数组元素；
@index 表示当前正在处理的数组元素的索引，若提供 init 值，则索引为0，否则索引为1；
@init 表示初始值。
 * 
 */

// 数组项求和
let arr = [3, 3, 4, 3, 6, 0, 90];
const sum = arr.reduce((pre, cur) => {
    return pre + cur
}, 0)
console.log(sum)
// 数组项最大值
const max = arr.reduce((pre,cur) => {
  return Math.max(pre,cur)
},0)
console.log(max)
// 数组去重
// let uniqua = [...new Set(arr)]
const uniqua = arr.reduce((pre,cur) => {
  pre.indexOf(cur) === -1 && pre.push(cur);
  return pre
},[])
console.log(uniqua,"uniqua")
// 多维的叠加执行操作
// 各科成绩占比重不一样， 求结果
var result = [
    { subject: 'math', score: 88 },
    { subject: 'chinese', score: 95 },
    { subject: 'english', score: 80 }
  ];
  var dis = {
      math: 0.5,
      chinese: 0.3,
      english: 0.2
  };
//   let res =  dis[result[0]['subject']]
  var res = result.reduce((accumulator, cur) => dis[cur.subject] * cur.score + accumulator, 0);
  console.log(res)

  // 扁平化数组
  let arr1 = [[1, 2, 8], [3, [4, 9]], [5, 6, 10]];
  const newArr = arr1.reduce((pre,cur) => {
    //   pre.concat(cur)
    Array.isArray(cur)
    },[])
  console.log(newArr)
