<template>
    <div class="cart">
        <nav-bar class="nav-var">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>
        <cart-list></cart-list>
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

//mapGetters是辅助函数，仅能使store里的getters映射到局部的计算属性
import {mapGetters} from 'vuex'

export default {
    name:"Cart",
    components:{
        NavBar,
        CartList,
        CartBottomBar
    },
    computed:{
        //两种语法
        // ...mapGetters(['cartLength'])
        ...mapGetters({
            length:'cartLength'
        })
        
    }
}
</script>

<style scoped>
    .nav-var{
        background-color: var(--color-tint);
        color: #fff;
        font-weight: 700;
    }
    .cart{
        height: 100vh;
    }
</style>