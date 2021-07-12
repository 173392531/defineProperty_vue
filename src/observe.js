import Observer from 'Observer.js'
export default function (value) {
    // 如果value不是对象，直接返回
    if(typeof value !='object')return;
    var ob;
    if(typeof value.__ob__!=='undefined'){
        ob=value.__ob__
    }else{
        ob=new Observer(value)
    }
    return ob
}