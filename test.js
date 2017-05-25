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
function Person(name){
	this.name = name;
	this.speak = function(){
		console.log(this.name);
	}
}
function Monkey(name){
	Person.call(this, name);
}
var monkey = new Monkey('Mike');
monkey.speak();
// 简单的bind,用来改变当前作用于的上下文
var foo = function(){
	console.log(this.x);
}

var bar = {
	x: 3
}

foo();

foo.bind(bar)();
