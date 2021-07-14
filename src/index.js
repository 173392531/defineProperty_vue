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
observe(obj);
new Watcher(obj, 'a.m.n', (val) => {
    console.log('★我是watcher，我在监控a.m.n', val);
});
const btn=document.getElementById('btn')
btn.onclick=function () {
    obj.c.d.e.f=1111
    console.log(obj)
}