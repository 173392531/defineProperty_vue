export default def=function (obj,key,value,enumerable) {
    // 定义一个对象的某个属性的值
    Object.defineProperty(obj,key,{
        value,
        enumerable,
        writable:true,
        configurable:true
    })
}