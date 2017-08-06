import './index.less'
import Xtemplate from 'xtemplate/lib/runtime'
import test from 'components/test-component/test.xtpl'
import 'components/test-component/test'
//import cube from '@libs/test';
import cube from 'libs/test'
import Promise from 'bluebird'


new Promise((resolve, reject) => {
	resolve({
		a: 1,
		b: 2
	})
}).then((data) => {
	console.log(data)
})
$('#a').html(new Xtemplate(test).render())

console.log($('p'))

let a = 1, b = 2;
console.log(a + b)