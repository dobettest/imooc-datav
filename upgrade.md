* 1、mixin导入的时候使用会报警告,直接导入即可
* 2、注意slotted中样式问题
* 3、setup如果是异步的需要放在suspence
* 4、echarts的实例使用shallowRef创建，否则会报一个type undefined错误
* 5、grid-template-columns:1fr 1fr和grid-template-columns:50% 1fr不一样