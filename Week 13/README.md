# 重学 HTML
## HTML 的定义
> XML 和 SGML
### DTD 与 namespace
* HTML namespace
* SVG namespace
* MathML namespace

## HTML 标签语义
* aside - 元素页面主内容之外的某些内容（比如侧栏）
* main - 页面主体内容
* article - 文章、论文、报道
* strong - 表示一个词在整个文章中的重要性
* em - 表示一个词在一句话中的重音的意思

## HTML 语法
### 合法元素
* Element
* Text
* Comment
* DocumentType
* ProcessingInstruction 
* CDATA

### 字符引用
* &#161;
* &amp;
* &lt;
* &quot;

## 浏览器API 
### DOM API
#### 导航类操作
* parentNode  < - >  parentElement
* childNodes  < - >  children
* firstChild  < - >  firstElementChild
* lastChild  < - >  lastElementChild
* nextSibling  < - >  nextElementSibling
* previousSibling  < - >  previousElementSibling

#### 修改操作
* appendChild
* insertBefore
* removeChild
* replaceChild

#### 高级操作
* computeDocumentPosition - 比较两个节点中的关系函数
* contains - 检查一个结点是否包含另一个结点
* isEqualNode 检查两个结点是否完全相同
* isSameNode - 检查是否是同一个结点（相等于 ===）
* cloneNode - 拷贝一个结点，如果参数传true，则子节点也会被拷贝

### 事件 API
* Event.addEventListener(type, listener [, options])
