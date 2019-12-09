<template>
    <div class="recommends">
        <div class="recommends-item" v-for="item in recommends">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name:"RecommendView",
    props:{
        recommends:{
            type:Array,
            defult(){
                return[]
            }
    }
}
}
</script>

<style>
    .recommends{
        display: flex;
        width: 100%;
        text-align: center;
        font-size: 12px;
        padding: 15px 0 30px;
        border-bottom: 3px solid #eeeeee;
    }
    .recommends-item{
        flex: 1;
}
.recommends-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
}
</style>