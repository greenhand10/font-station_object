<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParam.categoryName">{{searchParam.categoryName}}<i @click="removeCategory">×</i></li>
            <li class="with-x" v-if="searchParam.keyword">{{searchParam.keyword}}<i @click="removeKeyword">×</i></li>
            <!-- 这里用了split其中split是不能用在undefined上的，但是这里使用了v-if因此在undefined的时候就已经不渲染了不会执行split -->
            <li class="with-x" v-if="searchParam.trademark">{{searchParam.trademark.split(":")[1]}}<i @click="removeTrademark">×</i></li>
            <!-- 展示属性，因为这里是数组所以无法使用v-if -->
            <li class="with-x" v-for="(attrValue,index) in searchParam.props" :key="index">{{attrValue.split(":")[1]}}<i @click="removeProps(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isA}" @click="changeOrder('1')">
                  <a>综合<span v-show="isA" class="iconfont" :class="{'icon-xiangshang':searchParam.order.indexOf('asc')!=-1,'icon-paixu':searchParam.order.indexOf('desc')!=-1}"></span></a>
                </li>
                <li :class="{active:!isA}" @click="changeOrder('2')">
                  <a>价格<span v-show="!isA" class="iconfont" :class="{'icon-xiangshang':searchParam.order.indexOf('asc')!=-1,'icon-paixu':searchParam.order.indexOf('desc')!=-1}"></span></a>
                </li>

              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 此处点击路由跳转传递params参数 -->
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>           
        </div>
        <Pagenation :pageNo="searchParam.pageNo" :pageSize="searchParam.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
      </div>
    </div>
   
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapGetters} from 'vuex' 
  import {mapState} from 'vuex'
  export default {
    name: 'Search',
    data(){
      return {
        //带个服务器的参数
        searchParam:{
          //一级分类ID
          category1Id:'',
          // 二级分类ID
          category2Id:'',
          // 三级分类ID
          category3Id:'',
          // 分类名称
          categoryName:'',
          // 搜索关键字
          keyword:'',
          // 商品属性的数组
          props:[],
          // 品牌
          trademark:'',
          // 排序方式
          order:'1:desc',
          // 页码
          pageNo:1,
          // 每页数量
          pageSize:10

        }
      }
    },
    components: {
      SearchSelector
    },
    beforeMount(){
      // Object.assign ES6新增的语法 合并对象
      Object.assign(this.searchParam,this.$route.query,this.$route.params)
    },
    mounted(){
      this.getData()
    },
    computed:{
      // getters是不分模块的直接取即可
      ...mapGetters(['goodList']),
      isA(){
        return this.searchParam.order.indexOf('1')!=-1
      },
      ...mapState({
        total:state=>state.search.searchlist.total
      })
    },
    methods:{
      getData(){
        this.$store.dispatch('SearchList',this.searchParam)
      },
      removeCategory(){
        // 这里可以传同数组也可以传undefined，但是如果穿的是空数组，系统还是会分析处理，如果传undefined系统可以直接忽略
        this.searchParam.categoryName = undefined
        // this.searchParam.category1Id = undefined
        // this.searchParam.category2Id = undefined
        // this.searchParam.category3Id = undefined
        // this.getData()
        if(this.$route.params){
          this.$router.push({name:"search",params:this.$route.params})
        }else{
          this.$router.push({name:"search"})
        }
      },
      removeKeyword(){
         this.searchParam.keyword = undefined
        // 这里需要把header的数据删掉，因此需要考虑使用全局事件总线
        this.$bus.$emit('clear')
         if(this.$route.query){
          this.$router.push({name:"search",query:this.$route.query})
        }else{
          this.$router.push({name:"search"})
        }
      },
      trademarkInfo(item){
      this.searchParam.trademark = `${item.tmId}:${item.tmName}`
      this.getData()
      },
      removeTrademark(){
        this.searchParam.trademark = undefined
        this.getData()
      },
      // 收集平台属性的回调
      attrInfo(attr,attrValue){
        let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
        // 这里要防止重复push
        if(this.searchParam.props.indexOf(props) == -1){
        this.searchParam.props.push(props)
        // 再次发送请求
        this.getData()
        }
      },
      // 删除标签面包屑执行的函数
      removeProps(index){
        this.searchParam.props.splice(index,1)
        // 再发请求
        this.getData()
      },
      //排序的操作
      changeOrder(flag){
        //flag形参，它是一个标记，代表用户点击的是综合(1)价格(2)[用户点击的时候传递进来的]
        // let originOrder = this.searchParam.order
        //这里获取到的是最开始的状态
        let originFlag = this.searchParam.order.split(':')[0]
        let originSort = this.searchParam.order.split(':')[1]
        //准备一个新的order属性值
        let newOrder = ""
        //点击的是综合
        if(flag == originFlag){
          newOrder = `${originFlag}:${originSort == "desc"?"asc":"desc"}`
        }else{
          newOrder = `${flag}:${"desc"}`
        }
        // 将新的order赋予searchParam
        this.searchParam.order = newOrder
        this.getData()
      },
      // 自定义事件通过子组件传过来的数据进行发送
      getPageNo(pageNo){
        this.searchParam.pageNo = pageNo
        // 再次发请求
        this.getData()
      }
    },
    watch:{
      $route(){
        this.searchParam.category1Id = undefined
        this.searchParam.category2Id = undefined
        this.searchParam.category3Id = undefined
        Object.assign(this.searchParam,this.$route.query,this.$route.params)
        this.getData()
      }
    },
  }
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>