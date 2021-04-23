# 草稿纸



```javascript
const batches = (recipe, available)=>{
	Math.min(…(Object.keys(recipe).map((item,index,arr)=>{  					
    Math.floor(available[item]/recipe[item]) || 0  
  })))
}
```



```javascript
batches(
  { milk: 100, butter: 50, flour: 5 },
  { milk: 132, butter: 48, flour: 51 }
)
```

Math.min(…[1,2,3])

↓

[1,2,3]

↓

[132/100,48/50,51/5]

↓

available/recipe

↓

Object.keys({ milk: 132, butter: 48, flour: 51 })  // [ 'milk', 'butter', 'flour' ]  寻找规律，两个参数的键都一样。

**Object.values({ milk: 132, butter: 48, flour: 51 })** // [ 132, 48, 51 ]

Math.min(…(Object.keys(recipe).map((item,index,arr)=>{  Math.floor(available.item/recipe.item) || 0  })))





```
const map = function(arr, callback){
	let result = [];
	const length = arr.length;
	for(let i = 0; i < length; i++){
		result.push(callback(arr[i],i));
	}
	return result;
}

map([1,2,3,4,5], (item,index) => item * 2 +index)
```

Callback 回调函数  ▶  new Promise () ▶ async(); await();

Object.assign({},a,b)   b»a»{}

delete 是个操作符    delete Obj.key

**展开语法(Spread syntax)** ...

事件绑定（三种 ：HTML 上、js 直接赋值、事件监听）

事件委托(绑祖先元素 event.tearget) 

事件订阅

```
// duplicate([1, 2, 3, 4, 5]); → [1,2,3,4,5,1,2,3,4,5]

function duplicate(arr){
	const arrtoString = arr.toString();
	let result = (arrtoString + arrtoString).join(',');
	return result
}
```







## webpack 相关知识点 草稿

gulp、grunt 更加关注前端工程流，是前端的工具应用，关键词 刷新、压缩、合并、插件、编译 Scss 和 Sass 等。

webpack、browseify 主要是**模块打包**方案，另外与 Gulp 相似的，开发工具、插件功能。

- gulp和webpack的区别？(模块与流，Common Chunks 抽出公共模块)
- Webpack 的工作原理？路由懒加载

