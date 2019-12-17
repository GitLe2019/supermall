<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button @click.native="checkClick" :is-checked="isSelectAll" class="check-button"></check-button>
            <span>全选</span>
        </div>
        <div class="price">
            合计:{{totalPrice}}
        </div>
        <div class="calculate">
            去结算({{checkLength}})
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import {mapGetters} from 'vuex'

export default {
    name:"CartBottomBar",
    components:{
        CheckButton
    },
    computed:{
        ...mapGetters(['cartList']),
        totalPrice(){
            return '￥' + this.cartList.filter(item => {
                return item.checked
            }).reduce((prevalue,item) => {
                return prevalue + item.price * item.count
            },0).toFixed(2)
        },
        checkLength(){
            return this.cartList.filter(item => item.checked).length
        },
        isSelectAll(){
            if (this.cartList.length === 0){
                return false
            } 
            // return !this.cartList.filter(item => !item.checked).length
            return !this.cartList.find(item => !item.checked)
        }
    },
    methods:{
        checkClick(){
            if (this.isSelectAll){
                this.cartList.forEach(item => item.checked = false)
            }else{
                this.cartList.forEach(item => item.checked = true)
            }

        },
        calcClick(){
            if (!this.isSelectAll){
                this.$toast.show('请选择商品',1000)
            }
        }
    }
}
</script>

<style scoped>
.bottom-bar{
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    display: flex;
    font-size: 14px;
    
}
.check-button{
    width: 20px;
    height: 20px;
    line-height: 20px
    
}
.check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 5px;
    width: 60px;
    
}
.price{
    margin-left: 50px;
    flex: 1;
}
.calculate{
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
}
</style>