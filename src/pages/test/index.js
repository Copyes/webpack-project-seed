import './index.less';
import Xtemplate from 'xtemplate/lib/runtime';
import Promise from 'bluebird';


new Promise((resolve, reject) => {
	resolve({
		a: 1,
		b: 2
	});
}).then((data) => {
	console.log(data);
});
//require('zepto');
console.log($('p'));

let a = 1, b = 2;
console.log(a + b);