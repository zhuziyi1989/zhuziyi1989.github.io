function selectSort(arr) {
    var len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = i; j < len; j++) {
            if (arr[j] < arr[i]) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }
    return arr
}
var result = selectSort([1, 2, 3, 7, 6, 1, 3])
console.log(result)