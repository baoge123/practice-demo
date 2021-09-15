// 递归
function sun(num) {
    if (num === 1) return 1;
    return num + sun(num - 1)
}
console.log(sun(4),"====")

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
// reduce  扁平化数组
//  let arr = [1,[2,[3,4]],5]
//  const newArr = (arr) => {
//     return arr.reduce((pre,cur)=>pre.concat(Array.isArray(cur)?newArr(cur):cur),[])
//  }
//  console.log(newArr(arr))

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

  /** 
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
  */

   /** 
  let arr = [
    {id: 1, name: '1', pid: 0},
    {id: 2, name: '2', pid: 1},
    {id: 3, name: '3', pid: 1},
    {id: 4, name: '4', pid: 3},
    {id: 5, name: '5', pid: 3},
   ]

  // 边做map存储，边找对应关系 扁平化数组转 tree
  function arrayToTree(items) {
    let res = [] // 存放结果集
    let map = {}
    // 判断对象是否有某个属性
    let getHasOwnProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property)

    // 边做map存储，边找对应关系
    for (const i of items) {
        map[i.id] = {
            ...i,
            children: getHasOwnProperty(map, i.id) ? map[i.id].children : []
        }
        const newItem = map[i.id]
        if (i.pid === 0) {
            res.push(newItem)
        } else {
            if (!getHasOwnProperty(map, i.pid)) {
                map[i.pid] = {
                    children: []
                }
            }
            map[i.pid].children.push(newItem)
        }
    }
    return res
}
console.log (arrayToTree(arr))
*/
 /** 
// reduce 扁平化数组转tree结构
let Arr=[
    {
       id: '1',
      menu_name: '设置',
      menu_url: 'setting',
      parent_id: 0
    }, {
      id: '1-1',
      menu_name: '权限设置',
      menu_url: 'setting.permission',
      parent_id: '1'
    }, {
      id: '1-1-1',
      menu_name: '用户管理列表',
      menu_url: 'setting.permission.user_list',
      parent_id: '1-1'
    }, {
      id: '1-1-2',
      menu_name: '用户管理新增',
      menu_url: 'setting.permission.user_add',
      parent_id: '1-1'
    }, {
      id: '1-1-3',
      menu_name: '角色管理列表',
      menu_url: 'setting.permission.role_list',
      parent_id: '1-1'
    }, {
      id: '1-2',
      menu_name: '菜单设置',
      menu_url: 'setting.menu',
      parent_id: '1'
    }, {
      id: '1-2-1',
      menu_name: '菜单列表',
      menu_url: 'setting.menu.menu_list',
      parent_id: '1-2'
    }, {
      id: '1-2-2',
      menu_name: '菜单添加',
      menu_url: 'setting.menu.menu_add',
      parent_id: '1-2'
    }, {
      id: '2',
      menu_name: '订单',
      menu_url: 'order',
      parent_id: 0
    }, {
      id: '2-1',
      menu_name: '报单审核',
      menu_url: 'order.orderreview',
      parent_id: '2'
    }, {
      id: '2-2',
      menu_name: '退款管理',
      menu_url: 'order.refundmanagement',
      parent_id: '2'
    }
 ]

 let treeList = Arr.reduce((prev,cur)=>{
    prev[cur['id']] = cur;
    return prev
  },{})
  // console.log(treeList)
  let result = Arr.reduce((prev,cur)=>{
    let pid = cur.parent_id;
    // pid为0的就找不到父对象，找到当前cur的父对象
    // 对象的浅拷贝，引用关系存在，在后面处理parent的时候也会导致cur的改变，达到递归的效果
    let parent = treeList[pid]
    // console.log(parent,1)
    // 如果父对象存在，就将cur压到父对象的children属性中
    if(parent){
      // parent和cur存在引用关系
      parent.children? parent.children.push(cur) : parent.children = [cur]
    } else if(pid === 0){
      // 没有父对象，则此cur为树的根元素
      prev.push(cur)
    }
    return prev
  },[])
  console.log(result)
  */