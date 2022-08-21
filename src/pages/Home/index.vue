<template>
  <div>
    <!-- 三级联动的全局组件 三级联动已经注册为全局组件，因此不需要再引入 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="item1 in FloorList" :key="item1.id" :list="item1"/>
    <Brand/>
  </div>
</template>

<script>
// 引入其他组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'
export default {
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    this.$store.dispatch('getFloorList')
    //获取用户信息在首页展示
    this.$store.dispatch('getUserInfo')
  },
  computed:{
    ...mapState({
      FloorList:state=>state.home.floorList
    })
  }
}
</script>

<style>

</style>