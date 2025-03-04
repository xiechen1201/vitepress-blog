# 图解双端 Diff

## Diff 的概念

Diff 算法是用于比较两颗虚拟 DOM 树节点的算法，目的是为了找到两棵树的差异，并根据这些差异高效的去更新真实的 DOM，从而保证页面在数据变化的时候只进行「最小程度」的 DOM 操作。

:::info
思考一个问题，明明已经有了响应式数据了，为什么还需要 Diff 算法？

响应式数据和 Diff 算法从根本上就不是一个东西，响应式数据的目的是为了检测到数据的变化，但是只能定位到组件，无法精确到 DOM，也就是说数据变化的时候整个组件都要重新渲染。组件的重新渲染就是重新执行对应的渲染函数，此时就会生成新的虚拟 DOM 树。但是此时是无法知道新树和旧树具体哪一个节点有区别，所以就需要 Diff 算法去进行查找区别。
:::

![alt text](./imgs/2024-09-06-013054.png)

## Diff 算法的特点

1、分层对比：会逐层的对比每个节点和它的子节点，避免全树对比，从而提到效率。

2、相同层级的节点对比：在进行 Diff 对比的时候，Vue 会假设对比的节点是同层级的，也就是说不会做跨层的比较。

![alt text](./imgs/2024-09-06-013616.png)

## Diff 算法的详细流程

1、先从根节点开始对比，查看是否相同（所谓相同指的是两个虚拟节点的标签类型、Key 值均相同，但是 Input 元素还需要查看`type`属性）。

+ 相同

    - 说明元素能够进行复用，此时就会将旧虚拟 DOM 节点对应的真实 DOM 赋值给新 DOM 节点；

    - 对比新旧节点的属性，如果属性发生变化则更新到真实 DOM 上（这说明即使是对 DOM 的复用也不是完全不进行处理，还是会对属性的变化进行处理）；

    - 进入【对比子节点】；

+ 不相同

    - 如果不相同则继续往下操作也没有意义了，直接进行卸载；

        * 直接根据新虚拟 DOM 节点递归的创建真实的 DOM，同时挂载到新虚拟 DOM 节点；

        * 销毁旧虚拟 DOM 对应的真实 DOM；

2、对比子节点。

+ 仍然是同层进行对比；

+ 深度优先；

+ 同层对比的时候采用的是「双端对比」；

![alt text](./imgs/2024-09-06-021144.png)

## 双端对比

之所以被称为双端是因为真的有两个指针，一个指向列表头节点，另外一个指向列表尾节点，如下图：

![alt text](./imgs/2024-09-13-145148.png)

无论是旧的虚拟 DOM 列表还是新的虚拟 DOM 列表，都是一头一尾两个指针。

<br />

接下来就进入对比环节，整体流程如下：

1、步骤一：头头比较。

+ 相同

    - 复用 DOM 节点（紫色方块表示真实 DOM）；

    - ![alt text](./imgs/2024-09-14-021232.png)

    - 新旧头索引自增；

    - ![alt text](./imgs/2024-09-14-021401.png)

    - 重新开始步骤一；

+ 不相同

    - 进入步骤二；

<br />

2、步骤二：尾尾比较。

+ 相同
    - 复用 DOM 节点；

    - ![alt text](./imgs/2024-09-14-021542.png)

    - 新旧尾索引自减；

    - ![alt text](./imgs/2024-09-14-021629.png)

    - 重新开始步骤一；

+ 不相同
    - 进入步骤三

<br />

3、步骤三：头尾比较。

+ 相同
    - 进行复用，并且说明节点从头部移动到了尾部，涉及到移动操作，所以需要将旧头对应的 DOM 节点移动到旧尾对应的 DOM 节点之后；

    - ![alt text](./imgs/2024-09-14-021834.png)

    - 旧头索引自增，新尾索引自减；

    - ![alt text](./imgs/2024-09-14-021914.png)

    - 重新开始步骤一；

+ 不相同

    - 进入步骤四；

<br />

4、步骤四：尾头比较；

+ 相同

    - 进行复用，并且说明节点从尾部移动到了头部，说明也涉及到了移动的操作，需要将旧尾对应的 DOM 节点移动到旧头对应的 DOM 节点之前；

    - ![alt text](./imgs/2024-09-14-025559.png)

    - 旧尾索引自减，新头索引自增；

    - ![alt text](./imgs/2024-09-14-025649.png)

    - 重新开始步骤一；

+ 不相同

    - 进入步骤五；

<br />

5、步骤五：暴力比较；

如果以上四个步骤都没有想到相同的元素，则会进行暴力比较。在旧节点列表中寻找是否有新节点相同的节点；

+ 找到

    - 说明是一个需要移动的节点，将其对应的 DOM 节点移动到旧头对应的 DOM 节点之前；

    - ![alt text](./imgs/2024-09-14-030013.png)

    - 新头索引自增；

    - ![alt text](./imgs/2024-09-14-030048.png)

    - 重新执行步骤一；

+ 没找到

    - 说明这是一个新的节点，那么就创建一个 DOM 节点，插入到旧头对应的 DOM 节点之前；

    - ![alt text](./imgs/2024-09-14-030333.png)

    - 新头索引自增；

    - ![alt text](./imgs/2024-09-14-030401.png)

    - 重新执行步骤一；

<br />

如果新旧节点列表中任意一个遍历结束，也就是`oldStart > oldEnd`或者`newStrart > newEnd`的时候，Diff 比较也就结束了。这个时候又分两种情况：

+ 旧节点列表有剩余（`newStrart > newEnd`）：对应的旧 DOM 节点全部删除掉；

+ 新节点列表有剩余（`oldStart > oldEnd`）：将新节点列表中剩余的节点创建对应的 DOM，放置于新头节点对应的 DOM 节点后面；

### 综合示例

下面使用一个案例，将双端 Diff 的过程详细拆解，例如：

![alt text](./imgs/2024-09-14-031038.png)

1. 头头比较，能够复用，新旧头索引自增；

![alt text](./imgs/2024-09-14-031750.png)

2. 头头不同，尾尾相同，能够复用，尾尾索引自减；

![alt text](./imgs/2024-09-14-031936.png)

3. 头头不同，尾尾不同，头尾相同，能够复用，旧头对应的真实 DOM 移动到旧尾对应的真实 DOM 之后，旧头索引自增，新尾索引自减；

![alt text](./imgs/2024-09-14-032233.png)

4. 头头不同，尾尾不同，头尾不同，尾头相同，可以复用，旧尾对应的真实 DOM移动到旧头对应 DOM 之前，旧尾索引自减，新头索引自增；

![alt text](./imgs/2024-09-14-032710.png)

5. 头头不同，尾尾不同，头尾不同，尾头不同，进行暴力对比，找到对应的节点，将对应的真实 DOM 移动到旧头对应真实 DOM 之前，新头索引自增；

![alt text](./imgs/2024-09-14-033001.png)

6. 头头不同，尾尾不同，头尾不同，尾头相同，可以复用，将旧尾对应的真实 DOM 移动到旧头对应的真实 DOM 之前，旧尾索引自减，新头索引自增；

![alt text](./imgs/2024-09-14-033248.png)

7. 头头不同，尾尾不同，头尾不同，尾头不同，暴力对比也没有找到，说明是一个全新的节点，那么就会创建新的 DOM 节点，并插入到旧头对应的 DOM 之前，新头索引自增；

![alt text](./imgs/2024-09-14-033445.png)

8. `newEnd > newStart`，Diff 对比结束，旧节点列表还有剩余，那么就会直接进行删除；

![alt text](./imgs/2024-09-14-033722.png)

<br />

以上就是双端 Diff 的全过程。

