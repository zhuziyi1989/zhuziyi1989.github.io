

# Map 的各种用法收集

>  map()对数组的每个元素进行一定的操作（映射）后，会返回一个新的数组; 常用在处理服务器返回的大量数据。

````javascript
const items = [{
    "name": "祝梓毅",
    "sex": "男",
    "age": 31,
    "birthday": 1900,
    "weight": "60",
    "hobby": "足球",
  },
  {
    "name": "卢敏",
    "sex": "女",
    "age": 26,
    "birthday": 1900,
    "weight": "51",
    "hobby": "羽毛球",
  }
];

/* 重新格式化对象数组中的对象 */
const new1 = items.map(function(item, index, arr) {
  let obj ={};
  obj[item.sex] = item.hobby
  obj[item.weight] = item.age
  return obj //注意这个返回值
})
// new1 [{60: 31,男: "足球"}, {51: 26,女: "羽毛球"}]

/* 获取json数组中的某个属性集合 (然后修改一个键的值) */
const new2 = items.map( (item) => item.age.toFixed(2) )
//["1000.00", "2000.00"]

/* 新增一个键，并赋予值 */
let new3 = items.map((item) => {
	item['newKey'] = item.sex + "-VIP";
  return item //注意这个返回值
})
console.log('+++++',new3)


/* let array = [1, 2, 3, 2, 1, 2, 3, 4] */
/* console.log([...new Set(array)]) */

/* var arr = [0, 1, 2, 3, 4, 5];
var arr1 = arr.map(item => {
  return item * 2
}); */
/* console.log(arr, arr1) */

````
