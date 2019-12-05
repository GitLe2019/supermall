<template>
<div class="tab-bar-item" @click="itemClick">
    <div v-if="!isactive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activestyle"><slot name="item-text"></slot></div>
</div>
</template>

<script>
export default {
    name:"TabBarItem",
    props:{
        path:String,
        activecolor:{
            type:String,
            defult:"red"
        }
    },
    data(){
        return{
            
            
        }
        
    },
    computed:{
            isactive(){
                return this.$route.path.indexOf(this.path)!==-1
            },
            activestyle(){
                return this.isactive ? {color:this.activecolor} : {}
            }
        },
    methods:{
        itemClick(){
            this.$router.replace(this.path)
            
        }
    }
};
</script>

<style>
.tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    /* line-height: 49px; */
    font-size: 14px;
    }
.tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
}
/* .active{
    color: red;
} */
</style>