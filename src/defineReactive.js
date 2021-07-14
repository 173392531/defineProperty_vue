import observe from './observe.js'
import Dep from './Dep.js'

/*
通过Object.defineProperty设置对象的key属性，
使得能够捕获到该属性值的set/get动作。一般是由Watcher的实例对象进行get操作，
此时Watcher的实例对象将被自动添加到Dep实例的依赖数组中，
在外部操作触发了set时，将通过Dep实例的notify来通知所有依赖的watcher进行更新。
*/

export default function defineReactive(data,key,val){
    const dep=new Dep()
    if(arguments.length==2){
        val=data[key]
    }
    // 形成observe => Observer => defineReactive的循环调用，知道子类不为对象时终止
    let childOb=observe(val)

    console.log('defineReactive中的key',key)
    Object.defineProperty(data,key,{
        // 可枚举
        enumerable:true,
        // 可被配置
        configurable:true,
        get(){
            // 如果现在处于依赖收集阶段
            if(Dep.target){
                dep.depend()
                if(childOb){
                    childOb.dep.depend()
                }
            }
            return val
        },
        set(newValue){
            if(val===newValue){
                return 
            }
            val=newValue;
            // 当设置了新值，这个新值也要被observe
            childOb=observe(newValue);
            // 发布订阅模式，通知dep
            dep.notify()
        }
    })
}