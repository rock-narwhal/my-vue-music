<script>
import TabMenu from "@/components/menu/TabMenu.vue";

export default {
  name: "SearchPage",
  components: {TabMenu},
  props:['keywords'],
  data(){
    return {
      menuList:[
        { path: '/search/songs', name: '单曲' },
        { path: '/search/albums', name: '专辑' },
        { path: '/search/artists', name: '歌手' },
        { path: '/search/playlists', name: '歌单' },
        { path: '/search/users', name: '用户' },
        { path: '/search/mvs', name: 'MV' },
      ]
    }
  },
  methods:{
    clickBtn(){
      console.log(this.$route.query)
    }
  }
}
</script>

<template>
<div>
  <TabMenu :menu-list="menuList" mode="route" :query="$route.query"></TabMenu>
  <button @click="clickBtn">点击展示</button>
  <transition name="el-fade-in">
    <router-view></router-view>
  </transition>
</div>
</template>

<style scoped lang="less">

</style>