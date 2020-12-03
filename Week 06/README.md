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

