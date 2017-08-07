import './index.less'
import Xtemplate from 'xtemplate/lib/runtime'
import test from 'components/test-component/test.xtpl'
import 'components/test-component/test'
//import cube from '@libs/test';
import cube from 'libs/test'
import Promise from 'bluebird'

alert(cube)
let aa = 1
new Promise((resolve, reject) => {
    if(aa == 1){
        resolve({
            a: 1,
            b: 2
        })
    }else{
        reject()
    }
    
}).then((data) => {
    alert(data)
}).catch((err) => {
    alert(err)
})
$('#a').html(new Xtemplate(test).render())