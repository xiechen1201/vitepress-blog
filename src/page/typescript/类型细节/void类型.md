在 JavaScript 中，`void`具有特殊的用法，例如`a`元素用来阻止默认行为：

```html
<a href="javascript:void(0)">点击</a>
```

<br />

在 TypeScript 中`void`也表示一种类型，用于描述一个函数内部没有`return`语句，或者没有显式`return`一个值的函数的返回值，例如：

```typescript
// 🤔 function fn1(): void
function fn1() {}

// 🤔 function fn2(): void
function fn2() {
  return;
}

// 🤔 function fn3(): undefined
function fn3() {
  return undefined;
}

// 🤔 let m1: void
let m1 = fn1();
// 🤔 let m2: void
let m2 = fn2();
// 🤔 let m3: undefined
let m3 = fn3();

console.log(m1, m2, m3);
```

`fn1()`和`fn2()`的返回值类型都会被隐式的推导为`void`，只有显式的返回了`undefined`的`fn3()`其返回值类型才会被推导为`undefined`。

::: warning

`fn3()`只有在`tsconfig.json`中开启了`strictNullChecks:true`的情况下，其返回值类型才会被推导为`undefined`，如果没有开启`strict`模式，或者设置了`strictNullChecks: flase`，`fn3()`函数的返回值类型会被默认推导为`any`。

:::

<br />

虽然`fn3()`函数的返回值类型被推导为`undefined`，但是仍然可以使用`void`类型进行标注：

```typescript
function fn3():void {
  return undefined;
}
```

<br />

`undefined` 能够被赋值给 `void` 类型的变量，就像在 JavaScript 中一个没有返回值的函数会默认返回一个 `undefined` ，其实主要还是为了兼容性。但是，在`strict`模式下，`null`类型会报错，除非关闭`strictNullChecks`：

```typescript
function fn3():void {
  return undefined;
}

function fn4():void {
  // 关闭strictNullChecks不报错
  return null; // ❌ 不能将类型null分配给类型void
}

let v1: void = undefined;
let v2: void = null; //  ❌ 不能将类型null分配给类型void
```