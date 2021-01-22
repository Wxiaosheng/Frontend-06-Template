# 重学 CSS

## 一、CSS 总论
### 第一步：CSS 语法的研究
#### CSS 总体结构
* @charset
* @import
* rules
  * @media
  * @page
  * rule

### 第二步：CSS @规则的研究
#### At-rules
* @charset ： https://www.w3.org/TR/css-syntax-3/  
* @import ：https://www.w3.org/TR/css-cascade-4/  
* @media ：https://www.w3.org/TR/css3-conditional/  
* @page ： https://www.w3.org/TR/css-page-3/  
* @keyframes ：https://www.w3.org/TR/css-animations-1/  
* @fontface ：https://www.w3.org/TR/css-fonts-3/  
* @supports ：https://www.w3.org/TR/css3-conditional/  
* @namespace ：https://www.w3.org/TR/css-namespaces-3/  
* @counter-style ：https://www.w3.org/TR/css-counter-styles-3   

### 第三步：CSS 规则的结构
#### CSS 规则
* Selector - 选择器
  * https://www.w3.org/TR/selectors-3/  
  * https://www.w3.org/TR/selectors-4/  
* 声明
  * Key
    * Properties
    * Variables: https://www.w3.org/TR/css-variables/  
  * Value
    * https://www.w3.org/TR/css-values-4/  


### 收集标准
在 https://www.w3.org/TR/ 页面，直接抓取数据
```javascript
Array.prototype.slice.call(
  document.querySelector("#container").children)
  .filter(e => e.getAttribute("data-tag").match(/css/))
  .map(e => ({
    name: e.children[1].innerText,
    url: e.children[1].children[0].href
  })
)
```

## 选择器
### 选择器语法
* 简单选择器
  * \*
  * div span svg|a(三种命名空间)
  * .class
  * #id
  * [attr=value]
  * :hover
  * ::before
* 复合选择器
  * <简单选择器><简单选择器><简单选择器>
  * \* 或 div，必须写在最前面，伪类 和 伪元素 必须写在最后面
* 复杂选择器
  * <复合选择器><sp><复合选择器>
  * <复合选择器>">"<复合选择器>
  * <复合选择器>"~"<复合选择器>
  * <复合选择器>"+"<复合选择器>
  * <复合选择器>"||"<复合选择器> 

### 选择器的优先级
* 简单选择器 计数

### 伪类
* 链接/行为
  * :any-link - 匹配所有的超链接
  * :link - 匹配所有还未访问过的超链接
  * :visted - 匹配所有还访问过的超链接
  * :hover
  * :active
  * :focus
  * :target
* 树结构
  * :empty
  * :nth-child()
  * :nth-last-child()
  * :first-child :last-child :only-child
* 逻辑型
  * :not
  * :where :has

### 伪元素
* ::before - 内容前面
* ::after - 内容后面
* ::first-line - 选中第一行
  * font系列
  * color系列
  * background系列
  * word-spacing
  * letter-spacing
  * text-decoration
  * line-height
* ::first-letter - 选中第一个字母
  * font系列
  * color系列
  * background系列
  * word-spacing
  * letter-spacing
  * text-decoration
  * line-height
  * float
  * vertical-align 
  * 盒模型系列 margin, padding, border


### 课后作业
编写一个 match 函数。它接收两个参数，第一个参数是一个选择器字符串性质，第二个是一个 HTML 元素。这个元素你可以认为它一定会在一棵 DOM 树里面。  
通过选择器和 DOM 元素来判断，当前的元素是否能够匹配到我们的选择器。  
（不能使用任何内置的浏览器的函数，仅通过 DOM 的 parent 和 children 这些 API，来判断一个元素是否能够跟一个选择器相匹配。）  
以下是一个调用的例子
```javascript
// 本题就相当于 判断一棵树中是否存在当前结点 - 使用 BFS 或 DFS 都可

// BFS 
function match_bfs (selector, element) {
  const queue = [document.body]
  while (queue.length) {
    const node = queue.unshift()
    for (let child of node.children) {
      if (child === element) return true
      queue.push(child)
    }
  }
  return false
}

function match_dfs (selector, element) {
  const root = document.body
  if (root === element) return true

  const helper = function (node) {
    // terminator
    if (!!node.children || node.children.length === 0) return false
    // process
    // drill down
    for (let child of node.children) {
      if (child === element) return true
      return helper(child)
    }
  }

  return helper(root)
}


match_bfs("div #id.class", document.getElementById("id"));
match_dfs("div #id.class", document.getElementById("id"));
```

### 思考题
#### 为什么 `::first-letter` 可以设置 `display: block` 之类的，而 `::first-line` 却不行呢？

因为 `::first-letter` 选择器选择的内容是固定，不会随着页面渲染以及其他样式的影响而变化，  
但是 `::first-line` 表示的是页面排版后的第一行，也就意味着它选择的内容会被其他导致排版变化的样式而影响，所以不支持设置 `display: block` 之类的样式

