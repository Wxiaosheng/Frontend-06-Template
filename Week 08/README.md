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

#### 服务端环境准备