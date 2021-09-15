+true;
!"Lydia";
console.log(+true)

let arr = [
    [1, 2, 1],
    [3, [4, 1]],
    [5, 1, 10]
];

function newArr(arr) {
    // return arr.reduce((pre,cur) => [... new Set(pre.concat(Array.isArray(cur)? newArr(cur):cur))],[])
    let a = []
    arr.reduce((pre, cur) =>{ a = [...new Set(pre.concat(Array.isArray(cur) ? newArr(cur) : cur))]}, [])
    return a
}
console.log(newArr(arr))

let num = newArr(arr).reduce((pre, cur) => {
    return pre - cur
})

console.log(num, "num")