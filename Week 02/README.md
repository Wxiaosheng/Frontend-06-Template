## 学习笔记

### 广度优先搜索
"逐层扩散"

```javascript
// 代码模板
var bfs = function (root) {
  if (root == null) return []
  const queue = [[root, 1]], result = []
  while (queue.length) {
    const [node, level] = queue.shift()
    // process node ...
    result.push(node.val)
    if (node.left) queue.push([node.left, level+1])
    if (node.right) queue.push([node.right, level+1])
  }
  return result
}
```

#### 自定义优先级类
```javascript
class Sorted {
  constructor (data, compare) {
    this.data = data
    this.compare = compare || ((a, b) => a - b)
  }
  take () {
    if (!this.data.length) return
    let minIdx = 0, min = this.data[0]
    for (let i = 0; i < this.data.length; i++) {
      if (this.compare(this.data[minIdx], min) < 0) {
        minIdx = i, min = this.data[i]
      }
    }
    this.data[minIdx] = this.data[this.data.length - 1]
    this.data.pop()
    return min
  }
  give(v) {
    this.data.push(v)
  }
}
```