# 学习笔记

## JS表达式 - Expression

### 运算符的优先级
1. Member Expression
  * a.b
  * a[b]
  * foo`string`
  * super.b
  * super[b]
  * new.target
  * new Foo()
2. New Expression
  * new Foo
3. Call Expression
  * foo()
  * super()
  * foo().b - 这种方式会让点运算降低
  * foo()[b]
  * foo()`string`
4. Left Handside & Right Handside Expression
5. Update Expression
  * a++
  * a--
  * --a
  * ++a
6. Unary Expression - 单目运算符
  * delete a.b
  * void foo()
  * typeof a
  * \+ a
  * \- a
  * !a
  * await a
7. Exponental Expression
  * \**
8. Multiplicative Expression
  * \* / %
9. Additive Expression
  * \+ -
10. Shift Expression
  * << >> >>>
11. Relationship Expression
  * < > <= >= instanceof in
12. Equality Expression
  * ==
  * !=
  * ===
  * !==
13. Bitwise Expression
  * & ^ |
14. Logical Expression
  * &&
  * ||
15. Conditional Expression
  * ? : 

```javascript
  // 例子
  new a()()    // (new a())()
  new new a()  // new (new a())
  new a()[b]   // (new a())[b]
  a.b = c
  a + b = c    // Uncaught SyntaxError: Invalid left-hand side in assignment
  ++a++        // Uncaught SyntaxError: Invalid left-hand side expression in prefix operation
  ++(a++)      // Uncaught SyntaxError: Invalid left-hand side expression in prefix operation
  3 ** 2 ** 3
```

### Reference
当通过 `a.b` 的方式获取对象的属性的时候，获得其实是 `Reference` 对象，只是我们在代码中无法访问。  

一个 `Reference` 对象分成两个部分， `Object` 和 `Key`，完全记录了 Member 运算的左右两个部分。

## JS表达式 | 类型转换 - Type Convertion

### Unboxing - 拆箱转换
> 就是把一个 object 转换成一个 基本类型

#### ToPrimitive
当一个对象参与运算时，会调用该对象的 `ToPrimitive`  

##### 对象的三个方法会影响 ToPrimitive
* Symbol.toPrimitive - 优先级最高
* toString
* valueOf

```javascript
  const o = {
    valueOf(){ return 1 },
    toSting(){ return '2' },
    [Symbol.toPrimitive](){ return 3 }
  }
  const x = {}

  // 当 + 运算时，在没有 ToPrimitive 时，会调用 valueOf
  console.log('x' + o)
  // 当 o 作为属性名时，会优先调用 toString 
  x[o] = 1
```

### Boxing - 装箱转换
> 会获得对应类型的实例对象

* Number => new Number(1)  
* String => new String('a')    
* Boolean => new Boolean(true)  
* Symbol => new Object(Symbol('a'))  


## JS语句
* Grammar
  * 简单语句
  组合语句
  声明
* Runtime
  * Completion Record - 存储语句执行后的结果
  * Lexical Environment

### Completion Record
#### 私有属性
[[type]]: normal, break, continue, return, throw
[[value]]: 基本类型
[[target]]: label (带标签的语句时的标签)

### 简单语句
* ExpressionStatement
* EmptyStatement
* DebuggerStatement
* ThrowStatement
* ContinueStatement
* BreakStatement
* ReturnStatement

### 复合语句
* BlockStatement
* IfStatement
* SwitchStatement
* IterationStatement
* WithStatement
* LabelledStatement
* TryStatement

### 声明
* FunctionDeclaration
* GeneratorDeclaration
* AsyncFunctionDeclaration
* AsyncGeneratorDelcaration
* VariableStatement
* ClassDeclaration
* LexicalDeclaration

#### 注意
* `function`、`function*`、`async function`、`async function*`、`var`  
  * 这几种声明的范围都是 function body，而且没有先后顺序
* `class`、`const`、`let`
  * 作用范围是`{}`，在同一作用域中，声明之前使用会报错


## JS 结构化

### JS执行粒度 （运行时）
* 宏任务
* 微任务（Promise）
* 函数调用 （Execution Content）
* 语句/声明（Completion Record）
* 表达式（Reference）
* 直接量/变量/this...


### 函数的调用
函数调用会形成 `Execution Context`，保存 Execution Context 的数据结构叫 `Execution Context Stack`，且栈顶的 Execution Context 被称为 `Running Execution Context`


### Execution Context
#### ECMAScript Code Execution Context
* code evaluation state
* Function
* Script or Module
* Realm 
* LexicalEnvironment
* VariableEnvironment

#### Generator Execution Contexts
* code evaluation state
* Function
* Script or Module
* Realm 
* LexicalEnvironment
  * this
  * new.target
  * super
  * 变量
* VariableEnvironment
  * 处理 var 声明，是个历史包袱
* Generator

#### Environment Record
* Declarative Environment Records
  * Function Environment Records
  * module Environment Records
* Globla Environment Records
* Object Environment Records