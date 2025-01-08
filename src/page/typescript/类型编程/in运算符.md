之前的文章中讲过`in`运算符在 TS 中可以用来检查属性，在控制流中实现对类型的守卫。

除了上面的作用，`in`运算符还能遍历联合类型中的每一个成员类型：

```typescript
type U = "a" | "b" | "c";

type Foo = {
    [key in U]: string;
};

// 等同于
/* type Foo = {
  a: string,
  b: string,
  c: string
}; */

let obj: Foo = {
    a: "a",
    b: "b",
    c: "c"
    d: "d" // ❌ 对象字面量只能指定已知属性，并且“d”不在类型“Foo”中
}
```

使用`in`可以对索引签名类型`key`进行限制。

<br />

结合`keyof`的作用，我们完全可以将`in`+`keyof`应用在对象索引签名类型中：

```typescript
type User = {
    readonly id: number;
    name: string;
    tel: string;
    address?: string;
};

type CopyUser = {
    [key in keyof User]: User[key];
};

const u: CopyUser = {
    id: 1,
    name: "aaa",
    tel: "123456",
    address: "beijing"
};

u.id = 2; // ❌ 无法为“id”赋值，因为它是只读属性
```

以上示例中，`keyof User`会得到一个联合类型`"id"|"name"|"tel"|"address"`，`in`会将`key`的限制在这个联合类型中，也就是`key`必须是联合类型中的某一个，这样就极大的限制了`key`的范围。

要注意的是，如果将`keyof User`单独抽离一个新的类型别名，则不会保留`User`类型中`id`属性的`reaonly`：

```typescript
type UserKeys = keyof User & {};

type CopyUser = {
    [key in UserKeys]: User[key];
};

const u: CopyUser = {
    id: 1,
    name: "aaa",
    tel: "123456",
    address: "beijing"
};

u.id = 2; // ✅
```

为了让`CopyUser`这个类型别名更加通用，我们可以使用泛型：

```typescript
type Copy<T> = {
    [key in keyof T]: T[key];
};

type User = {
    readonly id: number;
    name: string;
    tel: string;
    address?: string;
};

type Animal = {
    name: string;
    age: number;
    color: string;
    type: string;
};
```

```typescript
const u: Copy<User> = {
    id: 1,
    name: "aaa",
    tel: "123456",
    address: "beijing"
};

const dog: Copy<Animal> = {
    name: "jack",
    age: 3,
    color: "black",
    type: "dog"
};
```
