<script>
import TabMenu from "@/components/menu/TabMenu.vue";
import {cloudSearch} from "@/api/api_music";
import PlayListBanner from "@/components/search/PlayListBanner.vue";

export default {
  name: "SearchPage",
  components: {TabMenu, PlayListBanner},
  data() {
    return {
      menuList: [
        {path: '/search/songs', name: '单曲'},
        {path: '/search/albums', name: '专辑'},
        {path: '/search/artists', name: '歌手'},
        {path: '/search/playlist', name: '歌单'},
        {path: '/search/users', name: '用户'},
        {path: '/search/mvs', name: 'MV'},
      ],
      queryInfo: {
        limit: 1,
        offset: 0,
        type: 1000, //歌单
        keywords: ''
      },
      //顶部推荐歌单
      suggest: {}
    }
  },
  created() {
    this.queryInfo.keywords = this.$route.query.keywords || ''
    this.searchAlbum()
  },
  watch: {
    '$route.query'(val) {
      console.log('SearchPage 监听路由参数变化 ', val)
      this.queryInfo.keywords = val.keywords
      this.searchAlbum()
    }
  },
  methods: {
    // 搜索歌单
    async searchAlbum() {
      if (this.queryInfo.keywords) {
        const res = await cloudSearch(this.queryInfo)
        if (res.code !== 200) return
        console.log('SearchPage 搜索歌单结果 : ', res.result)
        if (res.result.playlists.length > 0) {
          this.suggest = res.result.playlists[0]
        }
      }
    }
  }
}
</script>

<template>
    <div class="container">
      <div class="font-20 margin-30" style="font-weight: bold">搜索 {{ $route.query.keywords }}</div>
      <!--  你可能感兴趣-->
<!--      <svg-icon class="font-18" icon-class="music"></svg-icon>-->
      <div class="margin-30">你可能感兴趣</div>
      <PlayListBanner class="margin-30" :playlist="suggest" v-show="suggest.id"></PlayListBanner>
      <TabMenu :menu-list="menuList" mode="route" :query="$route.query"></TabMenu>
      <transition name="el-fade-in">
        <router-view></router-view>
      </transition>
    </div>
</template>

<style scoped lang="less">
.margin-30{
  margin: 0 30px;
}
</style>