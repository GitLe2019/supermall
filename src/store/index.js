import vue from 'vue'
import vuex from 'vuex'
import actions from "./actions"
import mutations from "./mutations"
import getters from './getters'

//安装插件
vue.use(vuex)

//创建store对象
const state = {
    cartList:[]
}

const store = new vuex.Store({
    state
    ,
    mutations
        //mutations唯一目的就是修改state中的状态
        //mutations中的每个方法尽可能完成的事件比较单一一点
    
    ,
    actions,
    getters

    
})

//挂载Vue实例上
export default store