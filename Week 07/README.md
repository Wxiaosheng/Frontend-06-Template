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
