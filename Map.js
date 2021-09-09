// 多条件判断
let actions = new Map([
    [1, ["3333","000000"]],
    [2, ['fail', 'FailPage']],
    [3, ['fail', 'FailPage']],
    [4, ['success', 'SuccessPage']],
    [5, ['cancel', 'CancelPage']],
    ['default', ['other', 'Index']],
  ])
  console.log(actions)
    function fun  (state) {
        
     let arr = actions.get(state) || actions.get('default')
     console.log(arr)
  }