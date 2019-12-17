<template>
    <div id="detail">
        <detail-nav-bar @titleClick="titleClick" class="detail-nav" ref="nav"></detail-nav-bar>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="Goods"></detail-base-info>
        <detail-shop-info :shop="Shop"></detail-shop-info>
        <detail-images-info :images-info="detailInfo" @imgLoad="imgLoad"></detail-images-info>
        <detail-param-info ref="params" :param-info="paramsInfo"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <goods-list :goods="recommend" ref="recommend"></goods-list>
        </scroll>
        <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
        <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    </div>
</template>

<script>

import DetailSwiper from "./childComps/DetailSwiper"
import DetailNavBar from "./childComps/DetailNavBar"


import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailImagesInfo from "./childComps/DetailImagesInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from "./childComps/DetailBottomBar"

import GoodsList from "components/content/goods/GoodsList"

import Scroll from "components/common/scroll/Scroll"
import Toast from "components/common/toast/Toast"

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"
import {imgListenerMixin,backTopMixin} from "../../common/mixin"

// import {BACK_POSITION} from "../../common/const"

import {debounce} from "../../common/utils"

import {mapActions} from 'vuex'

export default {
    name:"Detail",
    mixins:[imgListenerMixin,backTopMixin],
    data(){
        return{
            iid:null,
            topImages:[],
            Goods:{},
            Shop:{},
            detailInfo:{},
            paramsInfo:{},
            commentInfo:{},
            recommend:[],
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0,

        }       
    },
    components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailImagesInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar,
    },
    created(){
        this.iid = this.$route.params.id
        //根据iid请求详情页数据
        getDetail(this.iid).then((res) => {
            console.log(res)
            const data = res.result
            //获取轮播图信息
            this.topImages = data.itemInfo.topImages
            //获取商品信息
            this.Goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            this.Shop = new Shop(data.shopInfo)
            this.detailInfo = data.detailInfo
            //获取参数信息
            this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            //取出评论信息
            if (data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0]
            }
        })
        //请求推荐信息
        getRecommend().then((res) => {
            console.log(res.data.list)
            this.recommend = res.data.list
        })

        //给getthemeTopY赋值
        console.log(2222222222222)
        this.getThemeTopY = debounce(() => {
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)
            console.log(111111111111)
        },100)
    },
    destroyed(){
        
        this.$bus.$off('itemImageLoad')
    },
    methods:{
        //actions里的addCart方法映射到methods里
        ...mapActions(['addCart']),
        imgLoad(){
            // console.log(333333333)
            this.$refs.scroll.refresh()
            this.getThemeTopY()
        },
        titleClick(index){
            // console.log(-this.themeTopYs[index])
            console.log(index)
            
            // this.currentIndex = index
            this.$refs.nav.currentIndex = index
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
            
        },
        //监听滚动位置
        contentScroll(position){
        
            // console.log(position)
            const positionY = -position.y
            let length = this.themeTopYs.length
            for(let i = 0;i<length-1;i++){
                // console.log(456)
                if (this.currentIndex!==i && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1]){
                    this.currentIndex = i
                    this.$refs.nav.currentIndex = this.currentIndex
                    console.log(this.currentIndex)
                }
            }
            // if (positionY>=this.themeTopYs[1]){
            //     this.$refs.nav.currentIndex = 1
            // }
            // else if (positionY>=this.themeTopYs[2]){
            //     this.$refs.nav.currentIndex = 2
            // }
            // else if (positionY>=this.themeTopYs[3]){
            //     this.$refs.nav.currentIndex = 3
            // }
            //是否显示回到顶部
            // this.isShowBackTop = -position.y > BACK_POSITION
            this.listenShowBackTop(position)

            
        },
        addToCart(){
            // console.log(123)
            const product ={}
            product.Image = this.topImages[0]
            product.title = this.Goods.title
            product.desc = this.Goods.desc
            product.price = this.Goods.realPrice
            product.iid = this.iid

            //将商品添加到购物车
            // this.$store.cartList.push(product)
            // this.$store.commit('addCart',product) //执行mutations里的方法
            // this.$store.dispatch('addCart',product)  //执行actions的方法,会返回promise
            this.addCart(product).then(res => {
                this.$toast.show(res)
            })
        }
    }
}
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .content{
        height: calc(100% - 44px - 58px);
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
</style>