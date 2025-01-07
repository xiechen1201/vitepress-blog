::: info

`bigint`是 ES11(ES2020) 新增的一种基本数据类型，在 JS 中，可以用 Number 表示的最大整数为 2^53 - 1，可以写为`Number.MAX_SAFE_INTEGER`。如果超过了这个界限，那么就可以用 BigInt 来表示，它可以表示任意大的整数。

在一个整数字面量后面加`n`的方式定义一个`bigint`，或者调用函数`BigInt()`。

:::


有了`boolean`类型的讲述，其他的基本数据类型基本一致。

```typescript
// number 类型

// 🤔 let a: number
let a = 123;

// 🤔 let b: number
let b = Infinity * 0.1;

// 🤔 const c: 567
const c = 567;

// 🤔 let d: boolean
let d = a < b;

// 🤔 let e: number
let e: number = 100;

// 🤔 let f: 26.218
let f: 26.218 = 26.218;

// 🤔 let g: 26.218
let g: 26.218 = 10; // ❌ 不能将类型10分配给类型26.218
```

```typescript
// bigint 类型

// 🤔 let a1: bigint
let a1 = 1234n;

// 🤔 let b1: bigint
const b1 = BigInt(1234);

// 🤔 let b2: bigint
const b2 = 1234n;

// 🤔 let d1: boolean
let d1 = a < a1;

// 🤔 let e1: number
let e1 = 1234.5n; // ❌ bigint字面量必须是整数

// 🤔 let f1: bigint
let f1: bigint = 1234; // ❌ 不能将类型number分配给类型bigint

// 🤔 let g1: bigint
let g1: bigint = 100n;

// 🤔 let h1: bigint
let h1: 100n = 100n;
```

根据代码可以知道：

-  TypeScript 可以自动推导出`number`和`bigint`类型（如`a1`和`b1`）；

- 可以使用显式类型注解来指定`number`或`bigint`类型（如`f1`）；

- `const`声明的字面量会被推导为具体的字面量类型（如`b2`）；

- `bigint`字面量必须为整数，并且`number`和`bigint`之间不能直接互相赋值；


<br />

`string`与`boolean`和`number`形式是一样的，而且`string`字符串形式同样有单引号''、双引号""和模板字符串``的形式。

```typescript
let str1: string = 'Hello World';    // 单引号
let str2: string = "Hello World";    // 双引号
let str3: string = `Hello World`;    // 模板字符串
```

`string`的字面量类型：

```typescript
let status: "success" | "error" | "pending";
status = "success"; // ✅ 正确
status = "loading"; // ❌ 错误：不能将类型 "loading" 分配给 "success" | "error" | "pending"
```

