## 学习笔记

### 浏览器工作原理总论

URL --HTTP--> HTML --parse--> DOM --CSS Computing--> DOM with CSS --layout--> DOM with prosition --render--> Bitmap

### 有限状态机
* 每一个状态都是一个机器
    * 每一个机器里都可以计算、存储、输出。。。
    * 所有的机器接受的输入都是一致的
    * 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是一个纯函数
* 每一个机器知道下一个状态
    * 每个机器都有确定下一个状态 - Moore
    * 每个机器根据输入决定下一状态 - Mealy

**在JS中状态机的一个理想的实现方式就是一系列返回状态函数的这样的一批状态函数**

### HTTP 请求
#### HTTP协议的解析
##### ISO - OSI 七层网络模型
* 应用              - HTTP
* 表示              - HTTP
* 会话              - HTTP
* 传输              - TCP
* 网络              - Internet
* 数据链路层        - 4G/5G/WiFi
* 物理层            - 4G/5G/WiFi


#### HTTP请求总结
* 第一步：发起一个 HTTP 请求
1. 设计一个 HTTP 请求类
2. Content-Type 是一个必要的字段，要有默认值
3. body 是 k-v 的格式
4. 不同的 Content-Type 影响 body 的格式

* 第二步： Send 函数
1. 在 Request 构造器中，收集必要信息
2. 设计一个 send 函数，把请求真实的发送到服务器
3. send 函数应该是异步的，所以返回 Promise

* 第三步：发送请求
1. 设计支持已有的 connection 或者 自己重新创建
2. 收到数据传给 parse

* 第四步：Response 
1. Response 必须分分段构造，所以我们需要一个 ResponseParse 来 '装配'
2. ResponseParse 分段处理 ResponseText ， 我们用状态机来分析文本结构