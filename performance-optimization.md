## 性能专题 Performance optimization



### 1. 防止重复发送请求

1. setTimeout + clearTimeout 连续的点击会把上一次点击清除掉，也就是ajax请求会在最后一次点击后发出去
2. UI上限制用户，比如按钮 disable、waiting动画（合理的timeout，失败提示等）
3. 客户端对同一个 form 提交时产生一个相同的 nonce 参数，服务器收到相同的 nonce 参数时，仅处理第一个请求，这样就保持了幂等性。

### 2. 如何实现函数节流(Throttling)和函数防抖(Debouncing)？ #js

