<script>
import TabMenu from "@/components/menu/TabMenu.vue";

export default {
  name: "PlaylistDetail",
  components: {TabMenu},
  data(){
    return{
      routes:[
        {path: '/detail/playlist/songs', name: '歌曲列表'},
        {path: '/detail/playlist/comments', name: '评论'},
        {path: '/detail/playlist/collectors', name: '收藏者'}
      ],
    }
  }
}
</script>

<template>
<div>
  <div class="playlist-banner">
    歌单详情
  </div>
  <TabMenu style="margin: 0 30px" :menu-list="routes" mode="route" :query="$route.query"></TabMenu>
  <router-view></router-view>
</div>
</template>

<style scoped lang="less">

</style>