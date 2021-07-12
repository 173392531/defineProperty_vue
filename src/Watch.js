import Dep from './Dep.js'
var uid=0;
export default class Watcher{
    constructor(target,expression,callback){
        this.id = uid++;
        this.target = target;
        this.getter = parsePath(expression);
        this.callback = callback;
        this.value = this.get();
    }
}