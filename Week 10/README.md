## 学习笔记

### 排版
#### 一、根据浏览器属性进行排版
第一代：正常流，包含了 position、display、float 等
第二代：flex
第三代：grid

#### 二、收集元素 分行(hang)
* 根据主轴尺寸，把元素分进 行
* 若设置了 no-wrap，则强行分配进第一行

#### 三、计算主轴
* 计算主轴方向
  * 找出所有 flex 元素
  * 把主轴方向的剩余尺寸按比例分配给这个写元素
  * 若剩余空间为负数，所有 flex 元素为 0，等比压缩剩余元素