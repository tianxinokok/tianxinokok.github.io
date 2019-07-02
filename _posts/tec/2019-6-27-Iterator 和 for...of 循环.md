---
layout: post_tec
title: Iterator 和 for...of 循环
description: 要学习angular ，ES6先撸一撸。
category: tec
imgs: '../source/img/post/basic.jpg'

---

### 一、Iterator(遍历器)的概念
js原有的表示集合的数据结构，主要是数组(Array)和对象(Object)，ES6又添加了Map和Set。这样就有了四种数据集合，用户还可以组合使用他们，定义自己的数据结构，比如数组的成员是Map，Map的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。

遍历器（Iterator）就是这样一种机制。他是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator 接口，就可以完成遍历操作。

Iterator的作用有三个：

1.为各种数据结构，提供一个统一的、简便的访问接口。

2.使数据结构的成员能够按某种次序排列。

3.es6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费。

Iterator的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

（4）不断调用指针的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。value是当前成员的值，done是一个布尔值，表示遍历是否结束。

### 二、默认Iterator接口
Iterator接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环。当使用for...of循环遍历某种数据结构时，该循环会自动寻找Iterator接口。

一种数据解构只要部署了Iterator接口，就称这种数据结构是可遍历的。

es6规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是可遍历的。

Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。属性名Symbol.iterator是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为Symbol的特殊值，所以要放在方括号内。

ES6的有些数据结构原生具备Iterator接口（数组），即不用任何处理，就可以被for...of循环遍历。原因就是，这些数据解构原生部署了Symbol.iterator属性，另外一些数据结构没有（比如对象）。

原生具备Iterator接口的数据结构如下：

--Array

--Map

--Set

--String

--TypedArray

--函数的arguments对象

--NodeList对象

下面的例子是数组的Symbol.iterator属性。
```
let arr = ['a','b','c'];
let iter = arr[Symbol.iterator]();
iter.next() // { value: "a", done: false}
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```
上面代码中，变量arr是一个数组，原生就具有遍历器接口，部署在arr的Symbol.iterator属性上面。所以，调用这个属性，就可以得到遍历器对象。

其他数据结构（主要是对象）的iterator接口，都需要自己在Symbol.iterator属性上部署，这样才会被for...of循环遍历。

对象（Object）之所以没有部署Iterator接口，是因为对象属性的遍历顺序是不确定的，需要开发者手动指定，本质上，遍历器是一种线性处理，对于任何非线性的数据解构，部署遍历器接口，就等于部署一种线性转换。不过，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作Map结构使用。

一个对象如果要具备可被for...of循环调用的 Iterator 接口，就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。

### 三、调用Iterator接口的场合
有一些场合会默认调用Iterator接口，除了for...of循环，还有几个别的场合。

#### （1）解构赋值
对数组和Set结构进行解构赋值时，会默认调用Symbol.iterator方法。
```
let set = new Set().add('a').add('b').add('c');
let [x,y] = set;
console.log(x,y);   //"a","b"
let [first,...rest] = set;
console.log(first); //"a"
console.log(rest);  //["b", "c"]
```
#### （2）扩展运算符
扩展运算符(...)也会调用默认的Iterator接口。
```
let str = 'hello';
[...str];                   // ["h", "e", "l", "l", "o"]
let arr = ['a','b'];
console.log([...arr,'c']); //["a", "b", "c"]
```
上面代码的扩展运算符内部就调用了Iterator接口。

这提供了一种简便机制，可以将任何部署了Iterator接口的数据结构转为数组。也就是说，只要某个数据结构部署了Iterator接口，就可以对他使用扩展运算符，将其转为数组。
```
let arr = [...iterable];
```
#### （3）yield*
yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。【】yield*不懂

#### （4）其他场合
由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。如下面例子。

--for...of

--Array.from()

--Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）

--Promise.all()

### 四、字符串的Iterator接口
字符串是一个类似数组的对象，也原生具有Iterator接口。
```
let someString = 'hi';
typeof someString[Symbol.iterator];  //"function"

var iterator  = someString[Symbol.iterator]();
console.log(iterator.next()); //{value: "h", done: false}
console.log(iterator.next()); //{value: "i", done: false}
console.log(iterator.next()); //{value: undefined, done: true}
```
上面代码中，调用Symbol.iterator方法返回一个遍历器对象，在这个遍历器上可以调用next方法，实现对于字符串的遍历。

### 五、for...of循环
for...of作为遍历所有数据结构的统一方法。

一个数据结构只要部署了Symbol.Iterator属性，就被视为具有Iterator接口，就可以用for...of遍历他的成员。也就是说，for...of循环内部调用的是Symbol.iterator方法。

for...of循环可以使用的范围包括数组，Set和Map结构、某些类似数组的对象（比如arguments对象、DOM NodeList对象），后文的Generator 对象，还有字符串。

#### 数组
数组原生具备Iterator接口（即默认部署了Symbol.iterator属性），for...of循环本质上是调用这个接口产生的遍历器。可用下面代码证明。
```
let arr = ['a','b','c'];
for(let v of arr){
    console.log(v);  //a b c
}
let obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
for(let v of obj){
    console.log(v); //a b c
}
```
上面代码中，空对象obj部署了数组arr的Symbol.iterator属性，结果obj的for...of循环，产生了与arr完全一样的结果。

for...of循环可以代替数组实例的forEach方法。
```
let arr = ['a','b','c'];
arr.forEach(function(element,index){
    console.log(element);  //'a' 'b' 'c'
    console.log(index);    //0 1 2
})
```
js原有的for...in循环，只能获得对象的键名，不能直接获取键值。ES6提供for...of循环，允许遍历获得键值。
```
let arr = ['a','b','c'];

for(let v in arr){
    console.log(v);  //0 1 2 
}

for(let v of arr){
    console.log(v); //'a' 'b' 'c'
}

```
上面代码表明，for...in循环读取键名，for...of循环读取键值。如果要通过for...of获取数组的索引，可以借助数组的entries方法和keys方法。

for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟for...in循环也不一样。
```
let arr = [1,2,3];
arr.foo = 'abc';
console.log(arr);     //[1, 2, 3, foo: "abc"]
for(let i in arr){
    console.log(i);   //"0" "1" "2" "foo"
}

for(let i of arr){
    console.log(i);   //1 2 3
}
```
上面代码中，for...of循环没有循环数组arr的foo属性。

#### Set和Map结构
Set和Map结构也原生具有Iterator接口，可以直接使用for...of循环。
```
let set = new Set(['a','b','c']);
for(var v of set){
    console.log(v);     //"a","b","c"
}


var map = new Map();
map.set('name','tx');
map.set('age',24);

for(let [name,value] of map){
    console.log(name + ':' + value); // "name:tx" "age:24"
} 
```
上面代码有两个需要注意的地方，第一：遍历的顺序是按照各个成员被添加进数据结构的顺序。第二，遍历Set结构时，返回的是一个值，而遍历Map结构时，返回的是一个数组，该数组的两个成员分别为当前Map成员的键名和键值。
```
var map = new Map();
map.set('name','tx');
map.set('age',24);

for(let item of map){
    console.log(item);
}
//["name", "tx"]
//["age", 24]
for(let [name,value] of map){
    console.log(name + ':' + value); // "name:tx" "age:24"
}
//name:tx
//age:24
```
#### 计算生成的数据结构
有些数据结构是在现有数据结构的基础上，计算生成的。比如，es6的数组，Set、Map都部署了以下三个方法，调用后都返回遍历器对象。

-enrites()：返回一个遍历器对象，用来遍历["键名","键值"]组成的数组。对于数组，键名就是索引值；对于Set，键名与键值相同。Map结构的Iterator接口，默认就是调用entires()方法。

-keys()：返回一个遍历器对象，用来遍历所有的键名。

-values()：返回一个遍历器对象，用来遍历所有的键值。

这三个方法调用后生成的的遍历器对象，所遍历的都是计算生成的数据结构。
```
let arr = ['a','b','c'];
for(let item of arr.entries()){
    console.log(item);
}
//[0, "a"]
//[1, "b"]
//[2, "c"]
```
#### 类似数组的对象
类似数组的对象包括字符串、NodeList对象、arguments对象。
```
//字符串
let str = 'hello';
for(let v of str){
    console.log(v);
}
//"h" "e" "l" "l" "o"

//DOM NodeList对象
let sDiv = document.querySelectorAll('div');
for(let v of sDiv){
    console.log(v);
}
//<div></div>
//<div></div>


//arguments对象
function setName(){
    for(let v of arguments){
        console.log(v);
    }
}
setName('name','tx');
//"name"
//"tx"
```
并不是所有类似数组的对象都具有Iterator 接口，一个简单的解决办法，就是使用Array.from方法将其转为数组。
```
let obj = {
    length:2,
    name:'tx',
    age:24
};
for(let v of obj){
    console.log(v); //报错 obj is not iterable
}

//正确
for(let v of Array.from(obj)){
    console.log(v);
}
//"tx"
//24
```
#### 对象
对于普通的对象，for...of结构不能直接使用，会报错，必须部署了Iterator接口后才能使用。但是，这样情况下，for...in循环依然可以用来遍历键名。
```
let obj = {
    name:'tx',
    age:24
};
for(let v in obj){
    console.log(v);
}
//"name"
//"age"

for(let v of obj){  //报错 obj is not iterable
    
}
```
上面代码表示，对于普通的对象，for...in循环可以遍历键名,for...of循环会报错。

一种解决办法是，使用Object.keys()方法将对象的键名生成一个数组，然后遍历这个数组。
```
let obj = {
    name:'tx',
    age:24
};
for(let v of Object.keys(obj)){
    console.log(v);
    //"name"
    //"age"
    console.log(obj[v]);
    //"tx"
    //24
}
```
另一个方法是使用 Generator 函数将对象重新包装一下。

.......

#### 与其他遍历语法的比较
js提供了多种遍历数组的方法。最原始的写法就是for循环。
```
let arr  = ['a','b','c'];

for(let i  = 0 ; i < arr.length ; i++){
    console.log(arr[i]);
}
```
上面这种写法比较麻烦，因此数组提供内置的forEach方法。
```
let arr  = ['a','b','c'];

arr.forEach(function(value){
    console.log(value);
})
```
这种写法的问题是，无法中途跳出forEach循环，break命令或return命令都不能奏效。

for...in循环可以遍历数组的键名。
```
let arr  = ['a','b','c'];

for(let i in arr){
    console.log(arr[i]);
}
```
for...in循环有以下几个缺点。

--数组的键名是数字，但是for...in循环是以字符串作为键名"0","1","2"。

--for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。

--某些情况下，for...in循环会以任意顺序遍历键名。

总之，for...in循环主要是为遍历对象而设计的，不适用于遍历数组。

for...of循环有一些显著的优点。

--跟for...in一样的简单写法，但是没有for...in所具有的缺点。

--不同于forEach方法，他可以配合break、continue、return配合使用。

--提供了遍历所有数据结构的统一操作接口。

下面是一个使用break语句，跳出for...of循环的例子。
```
for(let i of arr){
    if(i > 100){
        break;
    }
}
```
如果当前项大于100，就会跳出循环。



 
 

