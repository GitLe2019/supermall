<template>
    <div class="goods-item">
    <a href="http://item.meilishuo.com/h5/detail/1m70y5k?acm=3.ms.0_4_1m70y5k.0.13384-69004.s026ur4QK5gf1.t_-sd_117-lc_16">
    <img :src="goodsItem.show.img" alt />
    </a>
    <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
    </div>
    </div>
</template>

<script>
export default {
    name: "GoodsListItem",
    props: {
        goodsItem: {
        type: Object,
        default() {
            return {};
        }
        }
    }
};
</script>

<style>
.goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
}

.goods-item img {
    width: 100%;
    border-radius: 5px;
    border: 3px solid var(--color-tint);
}

.goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
}

.goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
    }

    .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
}

.goods-info .collect {
    position: relative;
}

.goods-info .collect::before {
    content: "";
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
}
</style>