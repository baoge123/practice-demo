let p1 = new Promise((resolve, reject) => {
    resolve('成功')
    reject('失败')
})
console.log('p1', p1)

let n1 = 0.1, n2 = 0.2
console.log((n1 + n2).toFixed(1))