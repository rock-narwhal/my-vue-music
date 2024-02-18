<script>
import TabMenu from "@/components/menu/TabMenu.vue";

export default {
  name: "AlbumDetail",
  components: {TabMenu},
  data(){
    return{
      menuList:[
        {path: '/detail/album/musicList', name: '歌曲列表'},
        {path: '/detail/album/comments', name: '评论'},
        {path: '/detail/album/info', name: '专辑详情'}
      ]
    }
  }
}
</script>

<template>
<div>
  <div class="album-banner">
    album-banner
  </div>
  <TabMenu :menu-list="menuList" mode="route" :query="$route.query"></TabMenu>
  <router-view></router-view>
</div>
</template>

<style scoped lang="less">

</style>