// 递归
function sun(num) {
    if (num === 1) return 1;
    return num + sun(num - 1)
}
// console.log(sun(10))

// 扁平化数组
/** 
function flatten (oldArr) {
    var newArr = [] 
    for(var i = 0; i < oldArr.length; i++){ 
     if(Array.isArray(oldArr[i])){ 
         newArr = newArr.concat(flatten(oldArr[i])) 
     } else { 
         newArr.push(oldArr[i])
      }
    }
    return newArr;
 }
 console.log(flatten([1,[2,[3,4]],5]))
 */

// tree 扁平化
/** 
let tree = [{
    "id": 1,
    "name": "1",
    "pid": 0,
    "children": [{
            "id": 2,
            "name": "2",
            "pid": 1,
            "children": []
        },
        {
            "id": 3,
            "name": "3",
            "pid": 1,
            "children": [{
                "id": 4,
                "name": "4",
                "pid": 3,
                "children": []
            }]
        }
    ]
}]
function treeToArray(tree) {
    let res = []
    for (const item of tree) {
      const { children, ...i } = item
      if (children && children.length) {
        res = res.concat(treeToArray(children))
      }
      res.push(i)
    }
    return res
  }
  console.log(treeToArray(tree))

  // reduce 实现tree 扁平化
  function treeToArray(tree) {
    return tree.reduce((res, item) => {
      const { children, ...i } = item
      return res.concat(i, children && children.length ? treeToArray(children) : [])
    }, [])
  }
  */

  // 扁平化数组转 tree
  let arr = [
    {id: 1, name: '1', pid: 0},
    {id: 2, name: '2', pid: 1},
    {id: 3, name: '3', pid: 1},
    {id: 4, name: '4', pid: 3},
    {id: 5, name: '5', pid: 3},
   ]
  let newArr = (item) => {
    let res = []
    let getChildren = (res, pid) => {
        for (const i of item) {
            if (i.pid === pid) {
                const newItem = { ...i, children: [] }
                res.push(newItem)
                getChildren(newItem.children, newItem.id)
            }
        }
    }
    getChildren(res, 1)
    return res
  }
  
  console.log (newArr(arr))