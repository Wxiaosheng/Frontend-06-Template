## 学习笔记

### 字典树
我们经常在网页中，能看到这样的功能，在搜索内容时会有自动补全的功能，其实这种功能背后就是通过 字典树（Trie） 实现的

下面提供一份相对比较完善的 自定义字典树
```javascript
class Trie {
  constructor () {
    this.root = Object.create(null)
    this.$ = Symbol("$")
  }

  insert (word) {
    let node = this.root
    for (let c of word) {
      if (!node[c]) node[c] = Object.create(null)
      node = node[c]
    }
    node[this.$] = node[this.$] ? node[this.$] + 1 : 1
  }

  most() {
    let max = 0, maxWord = null
    const visited = (node, word) => {
      if (node[this.$] && node[this.$] > max) max = node[this.$], maxWord = word
      for (let c in node) {
        visited(node[c], word + c)
      } 
    }
    visited(this.root, "")
    return maxWord
  }

  search (word) {
    let node = this.root
    for (let c of word) {
      if (!node[c]) return false
      node = node[c]
    }
    return !!node[this.$]
  }

  startWith(start) {
    let node = this.root
    for (let c of start) {
      if (!node[c]) return false
      node = node[c]
    }
    return true
  }
}
```