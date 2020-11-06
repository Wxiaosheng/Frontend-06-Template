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

## 自定义实现 堆 （Heap） - 启发式搜索
**通过一维数组，实现 二叉堆**

```javascript
// 自定义 Heap - 使用一维数组实现二叉堆 (小顶堆)
class Heap {
  constructor(compare) {
    this.data = []
    this.compare = compare || ((a, b) => a - b)
  }

  push(v) { // log(N)
    // 将元素添加到末尾
    this.data.push(v)
    // 依次上调整整个 Heap 结构
    // 1. 与其父节点进行比较 确定是否交换位置
    let idx = this.data.length - 1, parentIdx = Math.floor((idx - 1) / 2)
    while (idx != 0 && this.compare(this.data[parentIdx], this.data[idx]) > 0) {
      [this.data[idx], this.data[parentIdx]] = [this.data[parentIdx], this.data[idx]]
      idx = parentIdx, parentIdx = Math.floor((idx - 1) / 2)
    }
  }

  pop() { // log(N)
    // 将堆顶元素弹出， 并将最后一位放在堆定位置
    const v = this.data[0]
    this.data[0] = this.data[this.data.length - 1]
    this.data.pop()
    if (!this.data.length) return v;
    // 依次向下调整整个 Heap 结构
    // 分别与左右两个子节点相比较，如果需要交换位置，则与较大的子节点交换
    let idx = 0
    while (1) {
      if (this.data.length == 1) break
      if (this.data.length == 2) {
        if (this.compare(this.data[0], this.data[1]) > 0) {
          [this.data[0], this.data[1]] = [this.data[1], this.data[0]]
        }
        break
      } else {
        let left = 2 * idx + 1, right = 2 * idx + 2
        if (left >= this.data.length || right >= this.data.length) break
        const min = this.compare(this.data[left], this.data[right]) < 0 ? left : right
        const diff = this.compare(this.data[idx], this.data[min])
        if (min >= this.data.length || diff <= 0) break
        if (diff > 0) {
          [this.data[idx], this.data[min]] = [this.data[min], this.data[idx]]
          idx = min
        }
      }
    }
    return v
  }
}
```