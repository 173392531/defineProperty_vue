import observe from './observe.js'
import Watcher from './Watcher.js'
var obj = {
    a: {
        m: {
            n: 5
        }
    },
    b: 10,
    c: {
        d: {
            e: {
                f: 6666
            }
        }
    },
    g: [22, 33, 44, 55]
};
console.log(obj)
const btn=document.getElementById('btn')
btn.onclick=function () {
    // alert('shabi')
    obj.c.d.e.f=1111
    console.log(obj)
}