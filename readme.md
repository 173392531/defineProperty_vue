
1.vue的数据改变是非侵入式的，即不需要调用api来改变数据
2.由于defineProperty内部的值在set后再次调用时，仍会固执地返回get里返回的值，所以需要一个变量来周转，defineReactive应运而生
3.