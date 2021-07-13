import observe from './observe.js'
import Dep from './Dep.js'

export default function defineReactive(data,key,val){
    const dep=new Dep()
    if(arguments.length==2){
        val=data[key]
    }
    // 形成observe => Observer => defineReactive的循环调用，知道子类不为对象时终止
    let childOb=observe(val)

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