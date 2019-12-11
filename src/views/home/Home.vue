<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
            <home-swiper :banners="banners"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>


import NavBar from "components/common/navbar/NavBar"
import Scroll from "components/common/scroll/Scroll"

import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import BackTop from "components/content/backtop/BackTop"


import HomeSwiper from "views/home/childComps/HomeSwiper"
import RecommendView from "views/home/childComps/RecommendView"
import FeatureView from "views/home/childComps/FeatureView"

import {getHomeMultidata} from "network/home"
import {getHomegoods} from "network/home"

export default {
    name:"Home",
    components:{
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    
    data(){
        return {
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentType:"pop",
            isShowBackTop:false
        }
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    created(){
        this.getHomeMultidata()
        this.getHomegoods('pop')
        this.getHomegoods('new')
        this.getHomegoods('sell')
        
    },
    methods:{
        // 网络请求方法
        getHomeMultidata(){
            getHomeMultidata().then((res) => {
            console.log(res)
            // this.result=res
            this.banners=res.data.banner.list;
            this.recommends=res.data.recommend.list
        })
        },
        getHomegoods(type){
            const page = this.goods[type].page+1
            getHomegoods(type,page).then(res => {
            console.log(res)
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page+=1
            
        })
        },
        tabClick(index){
            // console.log(index)
            switch (index){
                case 0:
                    this.currentType='pop'
                    break
                case 1:
                    this.currentType='new'
                    break
                case 2:
                    this.currentType='sell'
                    break
            }
        },
        //回到顶部
        backClick(){
            console.log(123)
            this.$refs.scroll.scrollTo(0,0)
        },
        //监听滚动位置
        contentScroll(position){
            // console.log(position)
            // if (-position.y>1000){
            //     this.isShowBackTop=true
            // }
            // else{
            //     this.isShowBackTop=false
            // }
            this.isShowBackTop=-position.y>1000
        },
        loadMore(){
            // console.log("上拉加载更多")
            this.getHomegoods(this.currentType)
            this.$refs.scroll.finishPullUp()
            
        }
    }
}
</script>

<style scoped>
    #home{
        padding-top: 44px;
        height: 100vh;
        position: relative;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: #ffffff;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }
    /* .tab-control{
        position: sticky;
        top: 44px;
        z-index: 9;
    } */
    /* .content{
        height: calc(100% - 93px);
        height: 300px;
        overflow: hidden;
        margin-top: 44px;
    } */
    .content{
        position: absolute;
        overflow: hidden;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
    
</style>