# 算法

## 一、初级

### 1. 快速排序

```javascript
//常规快速排序算法，递归的利用
function quicksort(arr)
{
    if (arr.length == 0) return [];
    let left = [];
    let right = [];
    let pivot = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
           left.push(arr[i]);
        } else {
           right.push(arr[i]);
        }
    }
    return quicksort(left).concat(pivot, quicksort(right));
}
console.log(quicksort([2,4,5,49,63,4,5,55,2,4,43])); // [2, 2, 4, 4, 4, 5, 5, 43, 49, 55, 63]
/*
简单版本的缺点是，它需要Ω(n)的额外存储空间，也就跟归并排序一样不好。
额外需要的存储器空间配置，在实际上的实现，也会极度影响速度和高速缓存的性能。
*/
```

### 2.Fibonacci（斐波那契）

```javascript
//循环 O(n)
function fibonacci(n){
  var fibo = Array(0,1);
  if (n === 0) return 0;
	if (n <= 2) return 1;
	for(let i = 2; i<=n; i++){
		fibo[i] = fibo[i-1]+fibo[i-2]
	}
 	return fibo[n];
} 
fibonacci(12); //  = 144

//递归方法 O(2n)
function fibonacciX(n){
  if(n <= 1) {
      return n;
  } else {
      return fibonacciX(n-1) + fibonacciX(n-2);
  }
}
fibonacciX(15); //  = 610

//递归方法之 ES6简写 O(2n)-
const fibonacciX = () =>  (n <= 1 ? n : fibonacciX(n-1) + fibonacciX(n-2))
fibonacciX(20); //  = 6765
```

### 

## 进阶

### 1. 哈希表问题

参考：[前端进阶算法8：头条正在面的哈希表问题 #49
](https://github.com/sisterAn/JavaScript-Algorithms/issues/49)