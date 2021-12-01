# [Array.prototype.map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 的常见使用场景

>  map()对数组的每个元素进行一定的操作（映射）后，会返回一个新的数组; 常用在处理服务器返回的大量数据。

````javascript
const items = [{
    "name": "祝梓毅",
    "sex": "男",
    "age": 31,
    "birthday": 1989,
    "weight": "60",
    "hobby": "足球",
  },
  {
    "name": "王小丫",
    "sex": "女",
    "age": 26,
    "birthday": 1995,
    "weight": "51",
    "hobby": "羽毛球",
  }
];

/* 重新格式化对象数组中的对象 */
let obj ={};
const new1 = items.map(function(item, index, arr) {
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


````
