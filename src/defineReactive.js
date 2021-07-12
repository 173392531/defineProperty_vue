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
            childOb=observe(newValue);
            dep.notify()
        }
    })
}