---
layout: post_tec
title: Promise对象
description: Promise对象
category: tec

---
### 一、Promise含义
Promise是异步编程的一种解决方案，比传统的解决方案(回调函数和事件)，更合理和更强大。

Promise是一个容器，里面保存这未来才会结束的事件（通常是一个异步操作）的结果。从语法上来说，Promise是一个对象，从他可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。

Promise对象有以下两个特点：

1.对象的状态不受外界影响。一个Promise代表一个异步操作，其中有三种状态：pending（进行中），fulfilled（已成功），rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都不能影响整个状态。

2.状态一旦改变，就不会再变。Promise状态的改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种状态发生，状态就凝固了，不会再变了，这时就成为resolved（已定型）。如果改变已经发生了，再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）不同，事件的特点是：如果错过了，再去监听，是得不到结果的。

Promise对象还有一些特性：
1.无法取消Promise，一旦新建就会立即执行，无法中途取消。


2.如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。

3.当处于pending状态时，无法得知目前进行到哪一个阶段。

### 二、基本用法

Promise对象是一个构造函数，用来生成Promise实例。
```
const promise = new Promise(function(resolve,reject){
    if(/*异步操作成功*/){
        resolve(value);
    }else{
        reject(error);
    }
});
```
Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。他们是两个函数，由JavaScript引擎提供，不用自己部署。

resolve函数的作用是，将Promise对象的状态从"未完成"变为"成功"（pending变为resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从"未完成"变为"失败"（pending变为rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
```
promise.then(function(value){

},function(error){

})
```
then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接收Promise对象传出的值作为参数。

下面是一个简单的Promise例子。
```
function timeout(ms){
    return new Promise((resolve,reject) => {
        setTimeout(resolve,ms,"完成");
    });
}
timeout(100).then((value) => {
    console.log(value);  //"完成"
})
```
上面代码中，timeout方法返回一个Promise实例，表示一段时间以后才会发生的结果。过了指定的时间（ms参数）以后，Promise实例的状态变为resolved后，就会触发then方法绑定的回调函数。

Promise新建后会立即执行。
```
const promise = new Promise((resolve,reject) =>{
    console.log('Promise内部');
    resolve()
})
promise.then(() =>{
    console.log('resolved');
})
console.log('123');

//Promise内部
//123
//resolved
```
上面代码中，Promise新建后立即执行，首先输出"Promise内部"。then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以"resolved"最后输出。


