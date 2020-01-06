<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <tab-control class="Category" :titles="['综合', '新品', '销量']"
                       @tabClick="tabClick" v-show="isTabFixed"
                       
                       ref="Category1"
                       ></tab-control>
    <div class="content">
      
      <tab-menu :categories="categories"
                @selectItem="selectItem"></tab-menu>
                

      <scroll :probe-type="3" @scroll="contentScroll" id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category @CategoryImageLoad='CategoryImageLoad' :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"
                       @tabClick="tabClick" ref="Category2"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import TabMenu from './childComps/TabMenu'
  import TabControl from '../../components/content/tabControl/TabControl'
  import Scroll from 'components/common/scroll/Scroll'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import {POP, SELL, NEW} from "@/common/const";
  import {tabControlMixin} from "@/common/mixin";

  export default {
    name: "Category",
    mixins: [tabControlMixin],
    components: {
		  NavBar,
      TabMenu,
      TabControl,
      Scroll,
      TabContentCategory,
      TabContentDetail
    },
    
    data() {
		  return {
		    categories: [],
        categoryData: {
        },
        currentIndex: -1,
        isTabFixed:false,
        tabOffsetTop:0
      }
    },
    created() {
		  // 1.请求分类数据
      this._getCategory()
    },
    computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
		  _getCategory() {
		    getCategory().then(res => {
          // 1.获取分类数据
          console.log(res)
		      this.categories = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          console.log(this.categoryData)
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        this._getSubcategories(index)
      },
      //监听滚动
      contentScroll(position){
        // console.log(-position.y>this.tabOffsetTop)
        this.isTabFixed = -position.y>this.tabOffsetTop
      },
      CategoryImageLoad(){
        console.log(this.$refs.Category2.$el.offsetTop)
        this.tabOffsetTop = this.$refs.Category2.$el.offsetTop
      }
    }
	}
</script>

<style scoped>
  #category {
    z-index: 9;
    height: 100vh;
   
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
  .Category{
        position: relative;
        z-index: 19;
        flex: 1;
        width: 73%;
        float: right;
    }
</style>
