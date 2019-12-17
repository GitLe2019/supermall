import {ADD_COUNTER,ADD_TO_CART} from './mutations-types'
export default {
    addCart(context,payload){
        return new Promise((resolve,reject) => {
            let oldproduct =context.state.cartList.find(item => item.iid === payload.iid)
            if(oldproduct){
                // oldproduct.count+=1
                console.log(7777777777777777)
                context.commit(ADD_COUNTER,oldproduct)
                resolve('当前商品数量+1')
            }
            else{
                payload.count = 1
                console.log(888888888888888)
                // state.cartList.push(payload)
                context.commit(ADD_TO_CART,payload)
                resolve('添加新商品到购物车')
            }
        })
    }
}