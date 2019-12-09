<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" class="tab-control-item" :class="{active:index===currentIndex}" @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:"TabControl",
    props:{
        titles:{
            type:Array,
            default(){
                return[]
            }
        }
    },
    data(){
        return {
            currentIndex:0
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex=index
            this.$emit("tabClick",index)
        }
    }
}
</script>

<style>
    .tab-control{
        position: sticky;
        top: 44px;
        z-index: 9;
        display: flex;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        background-color: #fff;
    }
    .tab-control-item{
        flex: 1;
        
    }
    .active span{
        
        padding: 5px;
        color: red;
        border-bottom: 3px solid var(--color-tint);
    }
</style>