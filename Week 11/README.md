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

