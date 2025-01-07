## <font style="background-color:#74B602;"> </font> any 类型
在 TS 中，编译的时候一定要有类型，如果 TS 无法确定一个变量的类型是什么，则默认为`any`类型。这就是兜底的类型，相当于回归于 JS 的弱类型状态，是 TS 中所有类型的“教父”。

```typescript
let a: any = 666;
let b: any = ['danger'];

// 🤔 let c: any
let c = a + b;
```

正常情况下`a+b`在 TS 的环境下应该是会报错才对，谁会去计算一个数字和数组的和呢？

但是如何显式的声明了为`any`类型，就不会报错了，也就说和 JS 的处理是一模一样的。



如果要使用`any`通常要显式的定义，否则如果是 TS 推导出来的某些情况下就会报错：

```typescript
// 🤔 let foo: any
let foo; // ✅

// 🤔 function func(foo: any, bar: any): void
function func(foo, bar) { } // ❌参数“foo”隐式具有“any”类型
```

<br/>warning
🔔 提示

默认情况下，Typescript 是宽容的，在推导出类型为`any`时其实不会报错，如果在 tsconfig.json 中启用了`noImplcitAny`标志，就会遇到隐式`any`类型时报错。

`noImplcitAny`隶属于 TSC 的`strict`标志家族，如果已经在 tsconfig.json 中启用了`strict`，那就不需要专门设置`noImplcitAny`标志了，效果是一样的。

<br/>



如果给函数的参数显式的定义为`any`类型则不会错误：

```typescript
function func(foo: any, bar: any) {} // ✅
```



总的来说，`any`类型就是回归到了 JS 的原始状态，不会进行任何的类型检查，可以进行任何的操作，包括赋值、访问、方法调用等等，这样就丢失了 TS 的优势。

```typescript
let anyVar: any = null;

anyVar.foo.bar.fn();

anyVar[0][1][2].prop;
```



## <font style="background-color:#74B602;"> </font> unknown 类型
在一些情况下，如果确实无法预知一个值的类型，不要使用`any`类型，更合理的是使用`unknown`类型。

`unknown`类型也表示任何值。`<font style="color:#0e0e0e;">unknown</font>`<font style="color:#0e0e0e;">就像</font>`<font style="color:#0e0e0e;">any</font>`<font style="color:#0e0e0e;">一样，能够被赋值为任意类型的值：</font>

```typescript
let value: unknown;

value = 42;        // 可以是数字
value = "hello";   // 可以是字符串
value = true;      // 可以是布尔值
value = [];        // 可以是数组
value = {};        // 可以是对象
```

但是，一个`unknown`类型的变量，不能直接赋值给除`any`和`unknown`以外的类型：

```typescript
let value: unknown;
let str: string;
let num: number;
let anyVar: any;
let unknownVar: unknown;

// 🤔 let value: unknown
value = "TypeScript";

str = value; // ❌ 不能将 unknown 类型赋值给 string

num = value; // ❌ 不能将 unknown 类型赋值给 number

anyVar = value; // ✅

unknownVar = value; // ✅
```



如果想要把`unknown`类型赋值给其他的类型，需要进行类型检查或者类型的断言：

```typescript
if (typeof value === "string") {
  str = value; // ✅ 现在可以安全赋值
}

num = value as number; // ✅ 使用类型断言
```



简单来说，`any`放弃了所有的类型检查，而`unknown`并没有。

```typescript
let anyFn:any;
let unknownFn: unknown;

anyFn.foo();
unknownFn.foo(); // ❌ 对象的类型为"unknown"
```

所以，在未知的情况下更推荐使用的是`unknown`类型。

