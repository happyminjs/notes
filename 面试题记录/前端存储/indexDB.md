### index db
客户端浏览器的存储。
##### 概述
* 键值对储存： 所有类型的数据都可以直接存入，包括 JavaScript 对象。每一个数据记录都有对应的主键，主键不能有重复，否则会抛出一个错误。
* 异步操作： 
* 支持事务: 意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。
* **同源限制**
* 储存空间大, 一般来说不少于 250MB
* 支持二进制储存
##### 基本概念
* 数据库：IDBDatabase 对象
* 对象仓库：IDBObjectStore 对象： 类似与sql中的表
* 索引： IDBIndex 对象
* 事务： IDBTransaction 对象
```
数据记录的读写和删改，都要通过事务完成。
事务对象提供error、abort和complete三个事件，用来监听操作结果
```
* 操作请求：IDBRequest 对象
* 指针： IDBCursor 对象
* 主键集合：IDBKeyRange 对象
##### 打开数据库
```js
var request = window.indexedDB.open(databaseName, version);
```
* databaseName： 字符串，表示数据库的名字，如果不存在，则新建一个
* version： 数据库的版本， 默认当前版本；新建时默认是1
* return： IDBRequest 对象，可以通过三种事件error、success、upgradeneeded，处理打开数据库的操作结果
```js
// error
request.onerror = function (event) {
  console.log('数据库打开报错');
};
// success
var db;
request.onsuccess = function (event) {
  db = request.result;
  console.log('数据库打开成功');
};
// 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded
// 通常也是新建数据库时的触发事件
var db;
request.onupgradeneeded = function (event) {
  db = event.target.result;
}
```
##### 表操作
```js
// 新建表，一般是在新建数据库的触发事件里新建
request.onupgradeneeded = function(event) {
  db = event.target.result;
  var objectStore;
  // 最好先判断一下，这张表格是否存在，如果不存在再新建
  if (!db.objectStoreNames.contains('person')) {
    // 新增一张叫做person的表格，主键是id
    objectStore = db.createObjectStore('person', { keyPath: 'id' });
  }
}
```
##### 新建索引
```js
var db;
request.onupgradeneeded = function(event) {
  db = event.target.result;
  var objectStore;
  if (!db.objectStoreNames.contains('person')) {
    objectStore = db.createObjectStore('person', { keyPath: 'id' });
  }
  objectStore.createIndex('name', 'name', { unique: false });
  objectStore.createIndex('email', 'email', { unique: true });
  // 参数： 索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）
}
```
##### 新增数据
新增数据指的是向对象仓库写入数据记录。这需要通过事务完成。
```js
function add() {
  var request = db.transaction(['person'], 'readwrite');
  // objectStore 拿到 IDBObjectStore 对象
  var presonStore = request.objectStore('person')
  // 表格对象的add()方法，向表格写入一条记录
  var insert = presonStore.add({ id: 1, name: '张三', age: 24, email: 'zhs@example.com' });
  insert.onsuccess = function (event) {
    console.log('数据写入成功');
  };
  insert.onerror = function (event) {
    console.log('数据写入失败');
  }
}
add()
```
db.transaction([tablename1, tablename2], model)
* tablename: 要打开的表的名字，数组，可一次多个表中取数据
* model：表格读取模式
  * readwrite: 可以进行读写操作
  * read：不能修改数据库数据，可以并发执行
  * verionchange： 版本变更
##### 读取数据
```js
function read() {
   var transaction = db.transaction(['person']);
   var objectStore = transaction.objectStore('person');
  //  objectStore.get 读取数据，参数是主键的值
   var request = objectStore.get(1);
   request.onerror = function(event) {
     console.log('事务失败');
   };
   request.onsuccess = function( event) {
      if (request.result) {
        console.log('Name: ' + request.result.name);
      } else {
        console.log('未获得数据记录');
      }
   };
}
read();
```
##### 遍历数据
遍历数据表格的所有记录，要使用指针对象 IDBCursor。
新建指针对象的 openCursor() 方法是一个异步操作，所以要监听success事件
```js
function readAll() {
  var objectStore = db.transaction('person').objectStore('person');
   objectStore.openCursor().onsuccess = function (event) {
     var cursor = event.target.result;
     if (cursor) {
       console.log('Id: ' + cursor.key);
       console.log('Name: ' + cursor.value.name);
       cursor.continue();
    } else {
      console.log('没有更多数据了！');
    }
  };
}
readAll();
```
##### 更新数据
使用 IDBObject.put() 方法
```js
function update() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    // put()方法自动更新了主键为1的记录
    .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });
  request.onsuccess = function (event) {
    console.log('数据更新成功');
  };
  request.onerror = function (event) {
    console.log('数据更新失败');
  }
}
update();
```
##### 删除数据
IDBObjectStore.delete()方法用于删除记录
```js
function remove() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .delete(1);
  request.onsuccess = function (event) {
    console.log('数据删除成功');
  };
}
remove();
```
##### 使用索引
如果不建立索引，默认只能搜索主键（即从主键取值）。
```js
// 在上边的新建表格的时候，需要同时新建索引 ，以name为例
objectStore.createIndex('name', 'name', { unique: false });

// 有了name索引，就可以根据name搜索了
var transaction = db.transaction(['person'], 'readonly');
var store = transaction.objectStore('person');
var index = store.index('name');
var request = index.get('李四');

request.onsuccess = function (e) {
  var result = e.target.result;
  if (result) {
    // ...
  } else {
    // ...
  }
}
```
