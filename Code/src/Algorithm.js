if(!String.prototype.repeatX) {
    String.prototype.repeatX = function (count) {
        if (this == null) {
            throw new TypeError('can\'t convert ' + this + ' to object');
        }

        let str = '' + this;
        count = +count;
        if (count != count) {
            count = 0;
        }
        if (count < 0) {
            throw new RangeError('repeat count must be non-negative');
        }
        if (count == Infinity) {
            throw new RangeError('repeat count must be less than infinity');
        }
        count = Math.floor(count); // round 四舍五入；ceil 上进一位；floor 舍去一位
        if (str.length == 0 || count == 0) {
            return '';
        // eslint-disable-next-line no-empty
        }else{
            
        }
    }
}
// eslint-disable-next-line no-console
console.log(`舍去一位: Math.floor(3.7)=${Math.floor(3.7)}\n上进一位：Math.ceil(3.3)=${Math.ceil(3.3)}\n四舍五入：Math.round(3.6)=${Math.round(3.6)}`)


// 算法  冒泡排序

let bubbleSort = (arrary)=>{
    const length = arrary.length;
    for (let i = 0; i <= length; i++){
        for (let j = i + 1; j < length;j++){
            if(arrary[i] > arrary[j]){
                let temp = arrary[i];
                arrary[i] = arrary[j];
                arrary[j] = temp;
            }
        }
    }
    return arrary
}

console.log(`${bubbleSort([1, 20, 5])}`)


// for(①;②;③){
//     ④；
// }
//                ↓———————————————|
//   start → ① → ② → true → ④ → ③
//                  ↓
//                false
//                  ↓
//                 end


// 算法  快速排序

// 去掉一组整型数组重复的值

let arrary_test = [1, 13, 24,1 ,2,11, 11, 14, 1, 2];

let unique = (arrary) => {
    let hashObj = {};//储存标记
    let newArrary = [];//新数组
    const arrary_length = arrary.length;
    for(let i=0;i<arrary_length;i++){
        if (!(hashObj[arrary[i]] === '1')) {//只要未被标记为 1 ，就 push 到新数组
            hashObj[arrary[i]] = '1';
            newArrary.push(arrary[i])
        }
    }
    return newArrary
}

console.log(unique(arrary_test))

// 返回字符串中最多的那个字符

const str_test = 'affaaaedfjak';

let findMaxDuplicateChar = (str)=>{
    // 如果只有一个字符时
    if(str.length===1){
        return str;
    }
    let hashObj={}
    for(let i=0,length=str.length;i<length;i++){
        if (!hashObj[str[i]]){
            hashObj[str[i]] = 1;//第 1 次标记为 1
        }else{
            hashObj[str[i]]+=1;//第2、3、4...次标记
        }
    }
    let maxKey = '',maxValue = 1;// 初始化最大的key和value
    for (var key in hashObj){//遍历储存标记的对象
        if (hashObj[key] > maxValue) {
            maxKey = key; //更新 maxKey
            maxValue = hashObj[key]; //更新 maxValue
        }
    }
    return maxKey
}

console.log(findMaxDuplicateChar(str_test))
