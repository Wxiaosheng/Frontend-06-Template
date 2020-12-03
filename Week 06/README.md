# 学习总结

## JS语言通识
### 泛用语言分类方法
按语法分类：
* 非形式语言 - 中文、英文
* 形式语言 (乔姆斯基谱系)
  * 0型 - 无限制文法
  * 1型 - 上下文相关文法
  * 2型 - 上下文无关文法
  * 3型 - 正则文法


## 产生式
> 是一种工具
在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句

### 巴科斯诺尔范式（ BNF）
是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言

#### 规则：
* 用尖括号括起来的名称来表示语法结构名
* 语法结构分成基础结构和需要用其他语法结构定义的符合结构
* 基础结构成为终结符，复合结构称非终结符
* 引号和中间的字符表示终结符
* 可以有括号
* \* 表示重复多次
* | 表示 或
* \+ 表示至少1次

### 课后练习
```
<MultiplicativeExpression>::=<Number>|
  <MultiplicativeExpression>"*"<Number>|
  <MultiplicativeExpression>"/"<Number>|
  "("<Number>"+"<Number>")"|
  "("<Number>"-"<Number>")"|
  "("<MultiplicativeExpression>"+"<Number>")"|
  "("<MultiplicativeExpression>"-"<Number>")"|
<AddtiveExpression>::=<MulitiplicativeExpression>|
  <AddtiveExpression>"+"<MultiplicativeExpression>|
  <AddtiveExpression>"-"<MultiplicativeExpression>|

优秀示例：
<MultiplicativeExpression>::=<Number>|
  <MultiplicativeExpression>"*"<Number>|
  <MultiplicativeExpression>"/"<Number>|
  "("<Number>"+"<Number>")"|
  "("<Number>"-"<Number>")"|
  "("<MultiplicativeExpression>"+"<Number>")"|
  "("<MultiplicativeExpression>"-"<Number>")"|
<AddtiveExpression>::=<MulitiplicativeExpression>|
  <AddtiveExpression>"+"<MultiplicativeExpression>|
  <AddtiveExpression>"-"<MultiplicativeExpression>|
```

## 语言的分类
形式语言 - 用途
* 数据描述语言
  * JSON、HTML、CSS等
* 编程语言
  * C、C++、Java、JavaScript等

形式语言 - 表达方式
* 声明式语言
* 命令型语言


## 编程语言的性质
### 图灵完备性
通常指 **具有无限存储能力的通用物理机器或编程语言**
* 命令式 - 图灵机
  * goto 语句
  * if 和 while
* 声明式 - Lambda
  * 递归


### 动态 与 静态
#### 动态
* 在用户设备上/在线服务器上
* 产品实际运行时
* Runtime

#### 静态
* 程序员设备上
* 产品开发时
* Compiletime

## 类型系统
* 动态类型 与 静态类型
* 强类型与弱类型
  * String + Number
  * String == Boolean
* 复合类型
  * 结构体
  * 函数签名
* 子类型
* 泛型
  * 逆变/协变

