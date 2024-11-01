# 生命周期

Vue 官方的生命周期图：

![](../assets/imgs/2024-04-12-031421.png)

## 完整的生命周期
完整的生命周期可以分为以下几个阶段：

1、初始化选项式 API

2、模版编译

3、初始化渲染

4、更新组件

5、销毁组件

<br />

以下是具体的执行阶段过程：

一、初始化选项式 API

当「渲染器」遇到一个组件的时候，<u>首先是初始化选项式 API</u>这里在内部<u>还会涉及到组件实例对象的创建。</u>

当组件实例创建的前后，就对应着一组生命周期钩子函数：

+ 组件实例创建前：`setup()`、`beforeCreate()`

+ 组件实例创建后：`create()`

<br />

二、 模版编译

接下来就进入了模版编译的阶段，当模版编译工作结束后，就会执行`beforeMount()`钩子函数。

<br />

三、初始化渲染

到了这个阶段，就意味着已经生成了真实的 DOM，完成初始化渲染后还会执行`mounted()`钩子函数。

<br />

四、更新组件

更新组件也对应着一组生命周期钩子方法：

+ 更新前：`beforeUpdate`
+ 更新后：`updated`

<br />

五、销毁组件

销毁组件时也对应一组生命周期钩子方法：

+ 销毁前：`beforeUnmount`
+ 销毁后：`unmounted`

一般情况下在销毁组件的时候我们会做一些清理的工作，例如清除定时器等操作。

<br />

另外需要注意在 Vue3 中的生命周期钩子函数的名字和上面介绍的生命周期稍微有一些区别：

| 生命周期名称 | Vue2 | Vue3 |
| --- | --- | --- |
| beforeCreate 阶段 | beforeCreate | setup |
| created 阶段 | created | setup |
| beforeMount 阶段 | beforeMount | onBeforeMount |
| mounted 阶段 | mounted | onMounted |
| beforeUpdate 阶段 | beforeUpdate | onBeforeUpdate |
| updated 阶段 | updated | onUpdated |
| beforeUnmount 阶段 | beforeDestroy | onBeforeUnmount |
| unmounted 阶段 | destoryed | onUnmounted |

:::info
Vue2 和 Vue3 的生命周期钩子方法是可以共存的，这意味着你在一个组件中可以写`mounted()`和`onMounted()`，Vue3 的生命周期钩子函数的执行时机会比 Vue2 对应的生命周期钩子函数要早一些，不过一般没人会这么写。
:::

## 生命周期的本质
:::info
所谓生命周期函数，就是在合适的时机调用用户所设置的回调函数！

:::

首先需要了解组件实例和组件挂载，例如有以下这么一个组件：

```javascript
export default {
  name: 'UserCard',
  props: {
    name: String,
    email: String,
    avatarUrl: String
  },
  data(){
    return {
      foo: 1
    }
  },
  mounted() {
    // ...
  },
  render() {
    return h('div', { class: styles.userCard }, [
      h('img', {
        class: styles.avatar,
        src: this.avatarUrl,
        alt: 'User avatar'
      }),
      h('div', { class: styles.userInfo }, [h('h2', this.name), h('p', this.email)])
    ])
  }
}

```

这些内容实际上就是一个选项对象，回头在渲染这个组件的时候，某些信息是会被挂载到组件实例上面的。

<u>组件实例本质上就是一个对象，该对象维护着组件运行过程中的所有信息。</u> 例如：

+ 注册到组件的生命周期钩子函数；

+ 组件渲染的子树；

+ 组件是否已经被挂载；

+ 组件自身的状态；

```javascript{11-18}
function mountComponent(vnode, container, anchor) {
  // 获取选项对象
  const componentOptions = vnode.type;
  // 从选项对象上面提取出 render 以及 data
  const { render, data } = componentOptions;

  // 创建响应式数据
  const state = reactive(data());

  // 定义组件实例，一个组件实例本质上就是一个对象，它包含与组件有关的状态信息
  const instance = {
    // 组件自身的状态数据，即 data
    state,
    // 一个布尔值，用来表示组件是否已经被挂载，初始值为 false
    isMounted: false,
    // 组件所渲染的内容，即子树（subTree）
    subTree: null,
  };

  // 将组件实例设置到 vnode 上，用于后续更新
  vnode.component = instance;

  // 后面逻辑略...
}
```

下面是组件挂载：

```javascript{12,15,20}
function mountComponent(vnode, container, anchor) {
  // 前面逻辑略...
  
  effect(
    () => {
      // 调用组件的渲染函数，获得子树
      const subTree = render.call(state, state);
      
      // 检查组件是否已经被挂载
      if (!instance.isMounted) {
        // 初次挂载，调用 patch 函数第一个参数传递 null
        patch(null, subTree, container, anchor);
        // 重点：将组件实例的 isMounted 设置为 true，这样当更新发生时就不会再次进行挂载操作，
        // 而是会执行更新
        instance.isMounted = true;
      } else {
        // 当 isMounted 为 true 时，说明组件已经被挂载，只需要完成自更新即可，
        // 所以在调用 patch 函数时，第一个参数为组件上一次渲染的子树，
        // 意思是，使用新的子树与上一次渲染的子树进行打补丁操作
        patch(instance.subTree, subTree, container, anchor);
      }
      // 更新组件实例的子树
      instance.subTree = subTree;
    },
    { scheduler: queueJob }
  );
}

```

以上代码片段的核心就是根据组件实例的`isMounted`属性来判断组件是否是初次挂载：

+ 初次挂载：`patch()`函数的第一个参数为`null`，然后会设置组件的`isMounted`属性为`true`；

+ 非初次挂载：主要是更新组件的逻辑，`patch()`的第一个参数是组件上一次渲染的子树，从而和新的子树进行 diff 计算；

<br />

所谓生命周期，就是在合适的时机执行用户传入的回调函数。

```javascript{5-14,19,32,39,43,46,49}
function mountComponent(vnode, container, anchor) {
  const componentOptions = vnode.type;
  
  // 从组件选项对象中取得组件的生命周期函数
  const {
    render,
    data,
    beforeCreate,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
  } = componentOptions;
  
  // 拿到生命周期钩子函数之后，就会在下面的流程中对应的位置调用这些钩子函数

  // 在这里调用 beforeCreate 钩子
  beforeCreate && beforeCreate();

  const state = reactive(data());

  const instance = {
    state,
    isMounted: false,
    subTree: null,
  };
  vnode.component = instance;

  // 组件实例已经创建
  // 此时在这里调用 created 钩子
  created && created.call(state);

  effect(
    () => {
      const subTree = render.call(state, state);
      if (!instance.isMounted) {
        // 在这里调用 beforeMount 钩子
        beforeMount && beforeMount.call(state);
        patch(null, subTree, container, anchor);
        instance.isMounted = true;
        // 在这里调用 mounted 钩子
        mounted && mounted.call(state);
      } else {
        // 在这里调用 beforeUpdate 钩子
        beforeUpdate && beforeUpdate.call(state);
        patch(instance.subTree, subTree, container, anchor);
        // 在这里调用 updated 钩子
        updated && updated.call(state);
      }
      instance.subTree = subTree;
    },
    { scheduler: queueJob }
  );
}

```

从上面的代码片段可以看出，首先从组件的选项对象中获取到注册到组件上面的生命周期函数，然后内部会在合适的时机调用它们。

## 嵌套结构下的生命周期
组件之间是可以进行嵌套的，从而形成一个组件树的结构。那么当遇到很多组件嵌套的时候，各个组件的生命周期是如何运行的呢？

实际上就是一个递归的过程，加入 A 组件嵌套了 B 组件，B 组件嵌套了 C 组件：

+ 组件 A：`onBeforeMount()`

    - 组件 B：`onBeforeMount()`

        * 组件 C：`onBeforeMount()`
        
        * 组件 C：`mounted()`

    - 组件 B：`mounted()`

+ 组件 A：`mounted()`

<br />

如何涉及到组件的销毁，也同样是递归的逻辑：

+ 组件 A：`onBeforeUnmount()`

    - 组件 B：`onBeforeUnmount()`

        * 组件 C：`onBeforeUnmount()`

        * 组件 C：`onUnmounted()`

    - 组件 B：`onUnmounted()`

+ 组件 A：`onUnmounted()`

