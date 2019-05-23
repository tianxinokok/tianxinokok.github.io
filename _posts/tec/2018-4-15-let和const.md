---
layout: post_tec
title: ES6基础-let和const
description: 要学习angular ，先把阮一峰大叔的es6过一遍。
category: tec
imgs: '../source/img/post/basic.jpg'

---
### 一、let命令基本用法

let用来声明变量，跟var的区别是let只在所在的内码块内有效
```
{
  var a = 10;
  let b = 10;
}
console.log(a) // 10
console.log(b) // b is not defined
```
把let用在for循环中很合适
```
for(var i = 0 ;i<5;i++){

}
console.log(i); //5
for(let j = 0 ;j<5;j++){
	
}
console.log(j); //j is not defined
```
这样会打印什么 ?
```
for(var  i = 0;i< 10 ;i++){
	console.log(i);  //0-9
    a[i] = function(){
    	console.log(i);
    };
}
a[6](); //10
```
用var声明i，全局只有一个i，所以for循环父级作用域和子作用域共用的都是一个i，所以最后会打印10。

如果用let声明会打印什么？
```
var b = [];
for(let i = 0;i<10;i++){
	console.log(i); //0-9
	b[i] = function(){
		console.log(i);
	};
}
b[6](); //6
```
如果改用let声明i后，将只在声明的所在行内有效，也就是只在for循环的父级作用有效，和子作用域公用的不是同一个i，所以最后会输出6。
### 二、不存在变量提升
用var声明的变量会存在变量提升，只不过值是undifined，let把这种语法进行了修改，如果在变量声明之前使用变量，将会报错。
```
console.log(a) //undifined
var a = 1;

console.log(a) //a is not defined
let a = 1;
```
### 三、暂时性死区
只要块级作用域内存在let或const命令，他所声明的变量就绑定这个区域，不再受外部的影响。
```
var a  =  1;
if(true){
 a = 2; //a is not defined
 let a = 'abc';
}
```
上面代码 a=2那行会报错，原因是在块级作用域if中，用let声明了a，因此会绑定这个作用域，即使外部声明了全局变量a，在块级作用域let之前使用也还是会报错。

暂时性死区也意味着typeof不再是一个百分之百安全的操作。
```
console.log(typeof a); //a is not defined
let a = 1;
```
typeof a 用在了let声明之前，那时还是a的死区，所以会报错。

如果不用let声明变量，typeof反而不会报错
```
console.log(typeof b);//undefined
```
在没有let之前，typeof是完全安全的，let出现之后，这一结论不成立了。
### 四、不允许重复声明
let不允许在同一个作用域内，重复声明相同的变量。
```
function func(){
	let a = 10; 
	var a = 1 ;
}
func(); //Identifier 'a' has already been declared
```
```
function func(){
	let a = 10; 
	let a = 1 ;
}
func(); //Identifier 'a' has already been declared
```
在函数参数和函数体内，有一条需要硬记的点
```
function func(arg=1){
	let  arg = 2;
}
func(); //Identifier 'arg' has already been declared
```
按理说，函数的参数带有默认值的时候，会形成函数参数的独立作用域，这样的话跟函数体内的作用域就不是一个作用域了，不同作用域let应该也就不冲突了，但是这里还是会报错。
```
function func(arg = 1){
	if(true){
		let arg = 2;
	}
}
func(); //不报错
```
### 五、ES5的作用域
ES5只有全局作用域和函数作用域，这样导致很多不合理的地方。

第一种情况：
```
var d = 1;
function func(){
	console.log(d); //undefined
	if(true){
		var d = 2;
	}
}
func();
```
我们想要的结果是if外的函数作用域使用全局变量d，if之内的使用新声明的，但是现在if外的打印结果是undefined，原因就是用var声明变量会存在变量提升，导致if内层的覆盖了外层的。

第二种情况：
```
for(var i =0;i<5;i++){
}
console.log(i);//5
```
for循环内使用的变量i，结束后暴露在全局中。
### 六、ES6的块级作用域
let实际上为js增加了块级作用域
```
function func(){
	let a = 1;
	if(true){
		let a = 2;
	}
	console.log(a); //1
}
func();
```
使用let之后，不同代码块之间的变量声明不再相互影响。

外层作用域无法访问内层作用域的变量
```
{
 {let a =1}
 console.log(a); //a is not defined
}
```
内层作用域可以重新声明外层作用域的同名变量
```
{
 let a = 1;
 {let a = 2;}
}
```
ES6块级作用域的出现，实际上使得被广泛应用的立即执行函数表达式不再必要了
```
//ES5写法
(function(){
 var a = 1;
})();
//ES6块级作用域写法
{
 let a = 1 ;
}
```
### 七、块级作用域与函数声明
ES5规定，函数只能在顶层作用域或者函数作用域中声明，在块级作用域中不能声明
但是浏览器没有遵守这个规定，为了兼容就代码，还是可以在块级作用域中声明函数
```
if(true){
 function func(){} //不报错
}
```
ES6中引入了块级作用域，明确规定允许在块级作用域中声明函数，声明函数的语句类似let，在块级作用域之外不可引用。
```
function func() { console.log('我是外面声明的函数'); }
(function () {
  if (false) {
    // 重复声明一次函数func
    function func() { console.log('我是里面声明的函数'); }
  }
  func();
})();
```
上面的代码在ES5环境中运行会打印"我是里面声明的函数",因为在if中声明的函数会被提升到代码块的头部，如下：
```
function func() { console.log('我是外面声明的函数'); }
(function () {
function func() { console.log('我是里面声明的函数'); }
  if (false) {
  }
  func();
})();
```
ES6因为有了块级作用域，在块级作用域内部生命的函数对外部没有影响，所以正常应该打印"我是外面声明的函数",但是实际运行后，会报错，原因就是这个语法如果完全遵守ES6的新语法，会对老代码的更改比较大，所以也是为了兼容老代码，ES6规定浏览器可以有自己的实现方式。

1.允许在块级作用域内声明函数。

2.函数声明类似于var，即会提升到全局作用域或函数作用域的头部。

3.函数声明会提升到所在的代码块的头部。

注意：上面的三条规则只对ES6的浏览器有效，其他环境的不用遵守，还是将块级作用域中的函数声明当作let处理。

根据上面三条规则，在浏览器的ES6环境中，块级作用域中声明的函数，类似于用var声明的变量。
```
function func() { console.log('我是外面的函数'); }

(function () {
  if (false) {
    function func() { console.log('我是里面你的函数'); }
  }

  func(); //func is not a function
})();
```
上面代码在符合ES6的浏览器中，都会报错，因为实际运行的是下面的代码
```
function func() { console.log('我是外面的函数'); }

(function () {
 var func = undifined;
  if (false) {
    function func() { console.log('我是里面你的函数'); }
  }

  func(); //func is not a function
})();
```
考虑到环境导致的差异太大，应该避免在块级作用域中声明函数，如果确实需要，可以写成函数表达式。
```
//函数声明
{
 let a = 1;
 function func(){
  return a ;
 }
}
//函数表达式
{
 let a =1;
 let func = function(){
  return a ;
 };
}
```
还有一个需要注意的点：ES6的块级作用域允许函数声明的规则，只在使用大括号的情况下成立，如果没有大括号(是不是可以理解为没有大括号就不是一个作用域块？)，就会报错。
```
// 不报错
'use strict';
if (true) {
  function func() {}
}

// 报错
'use strict';
if (true) function func() {}
```
### 八、const命令
const声明一个只读的常量，一旦被声明，常量的值就不能被改变。
```
const a = 1;
a=2; //报错 Assignment to constant variable.
```
const声明的值不能后续改变值，也就意味着初始化的时候必须赋值，不能等到后面赋值
```
const f1 ; //报错 Missing initializer in const declaration
```
const的作用域与let相同：只在声明所在的块级作用域内有效。
```
if(true){
	const  a = 1; 
}
console.log(a); //a is not defined
```
const声明的变量跟let一样不存在变量提升，存在暂时性死区，只能在声明的位置后面使用。
```
if(true){
	console.log(a);//a is not defined
	const  a = 1; 
}
```
const声明的变量跟let一样不可以重复声明。
```
var a = 1;
let b = 'abc';
//下面两行都报错
const  a = 2;
const  b = 'bcd';
```
#### 本质
const声明的变量本质上不可改变的是：变量指向的内存地址所保存的数据。
基本数据类型(数值，字符串，布尔值)和引用数据类型(对象，数组)指向的内存地址有明显的差别。

1.基本数据类型的变量→变量指向的内存地址就保存着变量的值。

2.引用型数据类型的变量→变量指向的内存地址保存着指向实际对象的指针。

因此，上面的例子里面用const声明的基本类型的变量，恰好就是不能改变自身的值。
但是对于引用数据类型的变量，只能保证变量指向的指针不发生改变，至于指针指向的实际数据的值，是可以改变的。
```
const obj = {};
obj.name = 'tianxin'; //这里是可以改变的。
console.log(obj.name); //tianxin

obj = {}; //报错 Assignment to constant variable.
```
上面的代码中,变量obj存储的是一个地址（指针），这个地址指向一个对象，不可改变的只是这个地址（指针）,即不能把foo指向另一个地址，但是对象本身是可以改变的，所以可以为对象添加属性。

上面是对象，数组也是同理
```
const arr = [];
arr[0] = 'tianxin';
console.log(arr[0]); //tianxin
arr = [];//报错
```
【】软大叔这里彻底冻结对象的函数看不懂

#### ES6声明变量的六种方法
var function(es5仅有)

let,const,import,class(es6)

### 九、顶层对象的属性
顶层对象在浏览器环境指的是window对象，在Node指的是global对象，ES5中全局变量和顶层对象的属性是等价的。
```
window.a = 1;
console.log(a);//1

var b = 2;
console.log(window.b);//2
```
ES6改变了这一点，为了保持兼容，var命令和function命令声明的群居变量，依旧是window对象的属性，let，const，声明的全局变量不数据window的属性。
```
let  a = 1;
console.log(window.a); //undefined
const b = 1;
console.log(window.b); //undefined
```
### 十、global对象 不懂

这里的笔记先结束



