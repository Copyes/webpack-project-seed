// 改变上下文的操作
// function Person(name){
// 	this.name = name;
// 	this.speak = function(){
// 		console.log(this.name);
// 	}
// }

// function Monkey(){
// 	//Person.call(this, name);
// 	this.name = 'monkey';
// }
// var person = new Person();
// var monkey = new Monkey();

// person.speak.call(monkey);

// 简单的实现继承
// function Person(name){
// 	this.name = name;
// 	this.speak = function(){
// 		console.log(this.name);
// 	}
// }
// function Monkey(name){
// 	Person.call(this, name);
// }
// var monkey = new Monkey('Mike');
// monkey.speak();
// // 简单的bind,用来改变当前作用于的上下文
// var foo = function(){
// 	console.log(this.x);
// }

// var bar = {
// 	x: 3
// }

// foo();

// foo.bind(bar)();

var d1 = new Date(1495803600 * 1000);
var d2 = new Date();

var s = d1.getTime() - d2.getTime();

var leave1 = s % (24*3600*1000);    //计算天数后剩余的毫秒数
var hours=Math.floor(leave1/(3600*1000))

//计算相差分钟数
var leave2 = leave1 % (3600*1000)        //计算小时数后剩余的毫秒数
var minutes=Math.floor(leave2/(60*1000))

console.log(hours,minutes);












