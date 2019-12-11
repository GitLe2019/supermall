<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
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

import {debounce} from "../../common/utils"

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
            isShowBackTop:false,
            tabOffsetTop:0,
            isTabFixed:false,
            //记录离开时的位置信息
            savey:0
        }
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    activated(){
        this.$refs.scroll.scrollTo(0,this.savey)
        this.$refs.scroll.refresh()
    },
    deactivated(){
        this.savey = this.$refs.scroll.getScrollY()
    },
    created(){
        this.getHomeMultidata()
        this.getHomegoods('pop')
        this.getHomegoods('new')
        this.getHomegoods('sell')
    },
    mounted(){
        //监听item中图片加载完成,解决滑动高度不对
        const refresh = debounce(this.$refs.scroll.refresh,200)
        this.$bus.$on('itemImageLoad',() => {
            // console.log('imageload')
            // this.$refs.scroll.refresh()
            refresh()
        })
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
            this.$refs.tabControl1.currentIndex = index
            this.$refs.tabControl2.currentIndex = index
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
            //判断backTop是否显示
            this.isShowBackTop = -position.y>1000
            //决定tabControl是否吸顶
            this.isTabFixed = -position.y>this.tabOffsetTop
        },
        loadMore(){
            // console.log("上拉加载更多")
            this.getHomegoods(this.currentType)
            this.$refs.scroll.finishPullUp()
            
        },
        //轮播图加载完成
        swiperImageLoad(){
            // console.log('~~~~~~~~~~')
            // console.log(this.$refs.tabControl.$el.offsetTop)
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
        /* 在使用浏览器原生滚动时防止导航栏滚动 */
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
    .tab-control{
        position: relative;
        z-index: 9;
    }
</style>