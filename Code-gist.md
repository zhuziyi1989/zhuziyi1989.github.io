### 2.进制转换

```js
/**
 * 进制转换
 */
parseInt('1111101000', 2).toString(10); //二进制 1111101000 转换成十进制

// 1.十进制转其他 
var a = 100; // a为十进制
console.log(a.toString(2)); //1100100   十进制 → 二进制
console.log(a.toString(8)); //144       十进制 → 八进制
console.log(a.toString(16)); //64       十进制 → 十六进制

// 2.其他转十进制 
// Number.parseInt(string[, radix]) 第二个参数代表当前数字的进制
var b = '110'; // b为字符串
console.log(parseInt(b, 2)); // b为二进制
console.log(parseInt(b, 8)); // b为八进制
console.log(parseInt(b, 16)); // b为十六进制

// 3.其他进制转其他进制
// 这里需要转换两次， 首先使用parseInt转换到十进制， 然后使用toString转换到目标进制。
var c = '147';
var c_8 = parseInt(c, 8); //这里把 c 视为八进制，c_8为十进制
var c_16 = c_8.toString(16) // 将c_8为十进制转换为十六进制
console.log(c_16); // 67

```

### 3.一个字符串的字符组合成的字符串集合

```js
const anagrams = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str.split('').reduce((acc, letter, i) =>
acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)), []);
};
console.log(anagrams('123')) // [ '123', '132', '213', '231', '312', '321' ]
```

### 4.数组去重

```js
/**
 *
 * 数组去重
 */

// 手写数组去重 - 基础版
Array.prototype.unique = function() {
    let result = [];
    let hashMap = {};
    for (let i = 0; i < this.length; i++) {
        if (!hashMap[this[i]]) {
            hashMap[this[i]] = true;
            result.push(this[i]);
        }
    }
    return result
}
console.log([1, 1, 2, 3, 4].unique())

// Set 数据结构 + 展开运算符
console.log(`展开运算符 -- ${JSON.stringify([...new Set([1,1,2,3,4,5])])}`)

// Set 数据结构 + Arrary.from()
console.log(`Arrary.from() -- ${JSON.stringify(Array.from(new Set([1,1,2,3,4,5])))}`)
```

### 5.手写源码系列 call

```javascript
/**
 * 手写源码系列 call
 *
 * 思路：
 * 1、为传入的context扩展一个属性，将原函数指向这个属性
 * 2、将context之外的所有参数全部传递给这个新属性，并将运行结果返回。 
 *
 */
Function.prototype.meCall = function(context, ...args) {
    var result;
    var context;
    const contextType = Object.prototype.toString.call(context).slice(8,-1);
    switch (contextType) {
        // 首先判断是否是undefined和null
        case 'Undefined':
            context = window;
        break;
        case 'Null':
            context = window;
            break;
        // 判断是否是 object
        case 'Object':
            break;
        default:
            throw new TypeError(context + 'error')
    }
    context.fn = this;
    reslut = context.fn(...args); // 相当于 context 在调用，当然 this 值也指向 context 了。
    delete context.fn
    return result;
}

const test1 = function(arg1, arg2, arg3) {
    console.log(`${this.name}--${arg1}--${arg2}--${arg3}`)
}

name = 'chrome'

const person = {
    name: "bill"
}

console.log(test1(1, 2, 3))

console.log(test1.meCall(undefined, 1, 2, 3))
console.log(test1.meCall(null, 1, 2, 3))
console.log(test1.meCall(person, 1, 2, 3))
```

### 6.手写源码系列 apply、bind  → 类似 call

### 7.逗号操作符

```js
/**
 * 逗号操作符
 */
var x = 20;
var temp = {
    x: 40,
    foo: function() {
        var x = 10;
        return this.x;
    }
};
(temp.foo, temp.foo)(); // 20，而不是40

// 即逗号操作符会从左到右计算它的操作数， 返回最后一个操作数的值。
// 所以 (temp.foo, temp.foo)(); 等价于 var fun = temp.foo; fun();，
// fun调用时this指向window， 所以返回20。
```

