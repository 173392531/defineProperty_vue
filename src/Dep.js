var uid=0;

// Dep是Observer与Watcher之间的纽带，也可以认为Dep是服务于Observer的订阅系统。Watcher订阅某个Observer的Dep，
// 当Observer观察的数据发生变化时，通过Dep通知各个已经订阅的Watcher。其构造函数和主要方法如下。
// 其中sub就是订阅者Watcher
export default class Dep{
    constructor(){
        this.id=uid++
        // 用数组存储自己的订阅者。subs是英语subscribes订阅者的意思。
        // 这个数组里面放的是Watcher的实例
        this.subs=[]
    }
    // 添加订阅,接收的参数为Watcher实例，并把Watcher实例存入记录依赖的数组中
    addSub(sub){
        this.subs.push(sub)
    }
    // 添加依赖,Dep.target上存放这当前需要操作的Watcher实例，调用depend会调用该Watcher实例的addSub
    depend(){
        // Dep.target就是一个我们自己指定的全局的位置，你用window.target也行，只要是全剧唯一，没有歧义就行
        if(Dep.target){
            this.addSub(Dep.target)
        }
    }
    // 通知依赖数组中所有的watcher进行更新操作
    notify(){
        const subs=this.subs.slice()
        for(let i=0;i<subs.length;i++){
            subs[i].update()
        }
    }
}