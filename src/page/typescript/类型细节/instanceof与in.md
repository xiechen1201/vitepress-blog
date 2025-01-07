## <font style="background-color:#74B602;"> </font> instanceof 实例判断
`typeof`只能够判断`"string"`/`"number"`/`"boolean"`/`"function"`/`"object"`等值，如果遇到了具体的对象类型判断就无能为力了，因此可以使用`instanceof`关键字，它可以来判断一个对象是否是某个构造函数的实例：

```typescript
class Animal {
    eat() {
        console.log("animal eat");
    }
}

class Dog extends Animal {
    eat() {
        console.log("dog eat");
    }
    bark() {
        console.log("dog bark");
    }
}

class Cat extends Animal {
    eat() {
        console.log("cat eat");
    }
    meow() {
        console.log("cat meow");
    }
}

function feedAnimal(animal: Animal) {
    // 使用 if + instanceof 来进行类型缩小
    if (animal instanceof Dog) {
        animal.bark(); // Dog
    } else if (animal instanceof Cat) {
        animal.meow(); // Cat
    } else {
        animal.eat(); // Animal
    }
}
```



## <font style="background-color:#74B602;"> </font> in 属性检查
在`JavaScript`中，`in`运算符用来确定对象是否包含某个属性：

```javascript
const obj = { a: 123 };

if ('a' in obj) {
  console.log('有a属性');
}
```



在 TypeScript 中，`in`检查对象是否具有特定的属性，并使用该属性区分不同的类型。它通常返回一个布尔属性，表示该属性是否存在于该对象中：

```typescript
type Circle = {
    kind: "circle";
    radius: number;
};

type Rectangle = {
    kind: "rectangle";
    width: number;
    height: number;
};

type Triangle = {
    kind: "triangle";
    base: number;
    height: number;
};

type Shape = Circle | Rectangle | Triangle;

function printArea(shape: Shape) {
    // 使用 if + in 来进行类型缩小
    if ("radius" in shape) 
        // 🤔 (parameter) shape: Circle
        console.log(Math.PI * shape.radius ** 2);
    } else if ("width" in shape) {
        // 🤔 (parameter) shape: Rectangle
        console.log(shape.width * shape.height);
    } else {
        // 🤔 (parameter) shape: Triangle
        console.log((shape.base * shape.height) / 2);
    }
}
```

