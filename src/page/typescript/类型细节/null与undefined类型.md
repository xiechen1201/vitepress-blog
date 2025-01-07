在 JavaScript 中`null`和`undefined`都表示缺少什么，TypeScript 也支持这两个值，并且都有各自类型，类型的名称就是`null`和`undefined`。

这两个类型比较特殊，在 TS 中`undefined`类型只有`undefined`一个值，`null`类型也只有`null`一个值。

我们在写 JavaScript 的时候，这两个在语义上也有细微的差别，`undefined`一般表示尚未定义的，`null`则表示缺少值。

<br/>warning
⚠️ 注意

`null`和`undefined`在没有开启`strictNullChecks: true`的严格检查情况下，它们会被视作为其他类型的子类型，例如`string`类型则会被认为包含了`null`和`undefined`。

tsconfig.json 中设置了`strict:true`默认开启，如果想关闭，可以设置`strictNullChecks:false`。

<br/>



例如定义`undefined`和`null`类型的数据：

```typescript
// 🤔 const temp1: undefined
const temp1: undefined = undefined;
// 🤔 const temp2: null
const temp2: null = null;
```



在`strict:true`或者`strictNullChecks: true`的情况下，`null`和`undefined`不能赋值给其他类型：

```typescript
// 🤔 const temp3: string
// 仅在关闭了 strictNullChecks 时才成立
const temp3: string = null; // ❌ 不能将类型“null”分配给类型“string”

// 🤔 const temp4: string
// 仅在关闭了 strictNullChecks 时才成立
const temp4: string = undefined; // ❌ 不能将类型“undefined”分配给类型“string”
```

同样的函数的返回值也遵循这个规则：

```typescript
function getStr(): string {
  // 可能返回一个字符串，或者 null undefined
  if (Math.random() > 0.3) {
    return 'hello';
  } else if (Math.random() > 0.6) {
    return null; // ❌不能将类型“null”分配给类型“string”
  }
  return undefined; // ❌不能将类型“undefined”分配给类型“string”
}
```

如果确实要赋值就要使用联合类型：

```typescript
let temp5: string | null = null; // ✅
```



在使用`let`声明一个值为`null`的变量的时候，如果没有指定类型，则推导类型为`any`:

```typescript
// 🤔 let temp6: any
let temp6 = undefined;

// 🤔 let temp7: any
let temp7 = null;
temp7 = 123; // ✅
```

