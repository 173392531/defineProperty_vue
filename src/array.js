import {def} from './utils.js'

const arrayPrototype=Array.prototype
export const arrayMethods=Object.create(arrayPrototype)

const methodsNeedChange=[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]
methodsNeedChange.forEach(methodName=>{
    // 备份原来的方法，因为push,pop等7个函数的功能不能被剥夺
    const original=arrayPrototype[methodName];
    // 把这个数组身上的__ob__取出来
    def(arrayMethods,methodName,function(){
        // 恢复原来的功能
        const result =original.apply(this,arguments)
        const args=[...arguments];
        const ob=this.__ob__;
        let inserted=[]

        switch (methodName) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                // splice格式是splice(下标, 数量, 插入的新项)
                inserted = args.slice(2);
                break;
        }
        if(inserted){
            ob.observeArray(inserted)
        }
        ob.dep.notify()
        return result
    },false)
})
