---
title: H5-indexedDB数据库的增删改查
description: 之前没有了解过前端存储，对关系型数据库的了解也只是皮毛中的毛皮，但工作中偶尔会有经理或后端同事问:web能保存数据么？之前都是狠狠的跟人家说：亲~不可哟。了解过indexedDB之后的回答是：亲~，不仅可以存，还能增删改查呦。
layout: post_last
category: tec
imgs: '../source/img/post/indexedDB.png'
---
demo先放着： <a href="/test/old_test/base/indexedDB.html" target="_blank">indexedDB增删改查</a>
## 一.与关系型数据库的对比
首先indexedDB是为了替代前端的关系型数据库--Web SQL Database而出现的。浅显的对比一下他们的区别，因为对关系型数据库了解的也不深。

1.indexedDB使用对象保存数据，而不是使用表保存数据。

2.锁表发生的场景不一样，关系型数据库发生在表，行读写的时候。indexedDB的锁表发生在数据库版本变更，事务或者存储对象"只读"，"读写"事务的时候。

3.大小不同，某些浏览器对indexDB有大小限制（不低于250MB）。谷歌对单条数据的大小限制在130MB以下 （备注：没有验证）。

## 二.打开数据库
```
//兼容处理
 var indexedDB =indexedDB = window.indexedDB || window.msIndexedDB ||      window.mozIndexedDB || window.webkitIndexedDB;
//打开方式
 var dbOpenRequest = indexedDB.open(dbName,version);
```
indexedDB.open接收两个参数，第一个参数dbName是数据库的名称，第二个参数是数据库的版本，如果第二个参数不填，默认打开当前数据库版本。


## 三.新建数据库
把新建写在打开后面就是因为新建数据库跟打开数据库用的方法一模一样。

```
 var indexedDB =indexedDB = window.indexedDB || window.msIndexedDB ||      window.mozIndexedDB || window.webkitIndexedDB;
 var dbOpenRequest = indexedDB.open(dbName,version);
```
当打开的数据库不存在或者版本不一样的时候就会新建数据库。跟打开的区别在于，创建会触发upgradeneeded事件。


## 四.upgradeneeded事件
数据库首次创建版本，或者indexedDB.open传递的新版本（版本数值要比现在的高）就会触发upgradeneeded事件。

触发upgradeneeded事件之后第一件事要新建对象仓库(也就是传统的新建表)
```
    dbOpenRequest.onupgradeneeded = function(event){
    	var db = event.target.result;
        var objectStore ;
        if(!db.objectStoreNames.contains(dbName)){  
                objectStore = db.createObjectStore(dbName,{
                keyPath : 'id',
                autoIncrement : true
            });
        }
    };
```
对象仓库建好之后（表建好），就应该定义存储数据了（索引）需要调用createIndex()方法。
```
   dbOpenRequest.onupgradeneeded = function(event){
    	var db = event.target.result;
        var objectStore ;
        if(!db.objectStoreNames.contains(dbName)){
                objectStore = db.createObjectStore(dbName,{
                keyPath : 'id',
                autoIncrement : true
            });
        }
    	//定义存储数据
    	objectStore.createIndex('id','id',{
    		unique : true
    	});
    	objectStore.createIndex('name','name');
    	objectStore.createIndex('publish_time','publish_time');
    	objectStore.createIndex('author','author');
    	objectStore.createIndex('introduction','introduction');
    };
```
## 五.新增、编辑、删除
这三个操作都是同一个模式，新建一个事务（transaction() →通过事务拿到存储对象→拿到存储对象后进行相应操作
```
//新建事务
var transaction = db.transaction([dbName],'readwrite'); 
//拿到存储对象
var objectStore = transaction.objectStore(dbName);

//新增add()
var objectStoreRequest = objectStore.add(newItem);
//编辑put()
var objectStoreRequest = objectStore.get(parseInt(id)); //编辑多一步查找，即要编辑的那个。
objectStoreRequest.onsuccess = function(event){
	//当前数据
	var myRecord = this.result;
	//遍历替换
	for(var key in data){
		if(typeof myRecord[key] != 'undefined'){
			myRecord[key] = data[key];
		}
	}
	objectStore.put(myRecord);
};
//删除delete()
var objectStoreRequest = objectStore.delete(id);
```
## 五.查看
查看分两种情况：

1.查询单个对象→get(键)。
```
var transaction = db.transaction([dbName],'readwrite'); 
var objectStore = transaction.objectStore(dbName);
var objectStoreRequest = objectStore.get(parseInt(id)); 
```
2.检索多个对象要使用创建游标的方式，也就是一个结果集的指针→openCursor()
```
var transaction = db.transaction([dbName],'readwrite'); 
var objectStore = transaction.objectStore(dbName);
objectStore.openCursor().onsuccess = function(event){
	var cursor = event.target.result;
	if(cursor){   一定要检查
		......
		cursor.continue();    //继续下一个游标项
		//遍历完毕
	}else{
		......
	}
};
```
openCursor()请求对象成功后，event.target.result会拿到存储空间的下一个对象，在结果集有下一项时，event.target.result中会保存一个IDBCursor的实例，cursor.continue()会执行继续遍历，在没有下一项时，这个结果会保存一个null，会进入else，相当于遍历结束。所以例子中的if(cursor){}条件一定要有。

## 六.总结
再遇到需要前端存储一些不敏感信息的需求，或者需要频繁请求接口获取数据的场景，可以获取一次，通过indexedDB存储到本地，减少对服务器的请求频率，对于优化性能，和提高体验方面还是挺有意义的。重要的时浏览器的支持也是非常不错。完事。





