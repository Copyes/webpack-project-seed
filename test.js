/ 改变上下文的操作....
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

// var d1 = new Date(1495803600 * 1000);
// var d2 = new Date();

// var s = d1.getTime() - d2.getTime();

// var leave1 = s % (24*3600*1000);    //计算天数后剩余的毫秒数
// var hours=Math.floor(leave1/(3600*1000))

// //计算相差分钟数
// var leave2 = leave1 % (3600*1000)        //计算小时数后剩余的毫秒数
// var minutes=Math.floor(leave2/(60*1000))

// console.log(hours,minutes);
// let arrayLike = {
//     '0': 'a',
//     '1': 'b',
//     '2': 'c',
//     length: 3
// };

// let arr = Array.from(arrayLike)
// console.log(arr);

// let obj = {

// 	a:1,

// 	b:2,

// 	c:3
// }

// function showArgs(a, b, c){
// 	console.log(a,b,c);
// }

// showArgs.call(this, 3,4,5);
// showArgs.apply(this, [5,6,7]);

// let arr1 = [12, 'foo', {name: 'fanchao'}, -1024];
// let arr2 = ['copyes', '22', 1024];

// Array.prototype.push.apply(arr1, arr2);
// console.log(arr1);
// 
// let numbers = [5,665,32,773,77,3,996];
// let maxNum = Math.max.apply(Math, numbers);
// let maxNum2 = Math.max.call(Math, 5,665,32,773,77,3,996);

// console.log(maxNum);
// console.log(maxNum2);

// function isArray(obj){
// 	return Object.prototype.toString.call(obj)  === '[object Array]';
// }

// console.log(isArray(1));
// console.log(isArray([1,2]));

// function log(){

// 	let args = Array.prototype.slice.call(arguments);

// 	args.unshift('(fanchao`s)');

// 	console.log.apply(console, args);
// }
// log(12);
// log(1,2)

// var func = function(){
// 	console.log(this.x);
// 	console.log(arguments);
// }


// func();  // undefined, {}
// var obj = {
// 	x: 2
// }
// var bar = func.bind(obj,1);

// bar(); // 2 , {'0':1}
// var bar = function() {
//     console.log(this.x);
// }
// var foo = {
//     x: 3
// }
// var sed = {
//     x: 4
// }
// var func = bar.bind(foo).bind(sed);
// func(); //3

// var fiv = {
//     x: 5
// }
// var func = bar.bind(foo).bind(sed).bind(fiv);
// func(); //3
// 
// 展开数据 [1,2,[2,3,[4,5]]]--->[1,2,2,3,4,5]
function flatArr(arr){
	function isArray(arr){
		return Object.prototype.toString.call(arr).slice(8, -1).toLowerCase() === 'array';
	}

	if(!isArray(arr) || !arr.length){
		return [];
	}else{
		return Array.prototype.concat.apply([], arr.map(function(val){
			return isArray(val) ? flatArr(val) : val;
		}));
	}
}




