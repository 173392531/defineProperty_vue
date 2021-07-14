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
    update() {
        this.run();
    }
    // 将Dep.target设置为当前watcher实例，在内部调用this.getter，
    // 如果此时某个被Observer观察的数据对象被取值了，
    // 那么当前watcher实例将会自动订阅数据对象的Dep实例
    get() {
        // 进入依赖收集阶段。让全局的Dep.target设置为Watcher本身，那么就是进入依赖收集阶段
        Dep.target = this;
        console.log(Dep.target)
        const obj = this.target;
        var value;

        // 只要能找，就一直找
        try {
            value = this.getter(obj);
        } finally {
            Dep.target = null;
        }

        return value;
    }
    // 运行watcher，调用this.getAndInvoke()求值，然后触发回调
    run() {
        this.getAndInvoke(this.callback);
    }
    getAndInvoke(cb) {
        const value = this.get();
        if (value !== this.value || typeof value == 'object') {
            const oldValue = this.value;
            console.log('我要把老值替换为新值了！！！',oldValue,value)
            this.value = value;
            cb.call(this.target, value, oldValue);
        }
    }
}
function parsePath(str) {
    var segments = str.split('.');

    return (obj) => {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return;
            obj = obj[segments[i]]
        }
        return obj;
    };
}