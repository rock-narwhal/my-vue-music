<script>
import {artistDetail} from "@/api/api_artist";
import TabMenu from "@/components/menu/TabMenu.vue";
import DetailBanner from "@/components/commons/DetailBanner.vue";

export default {
  name: "ArtistDetail",
  components: {DetailBanner, TabMenu},
  data() {
    return {
      routes: [
        {path: '/detail/artist/album', name: '专辑'},
        {path: '/detail/artist/mv', name: 'MV'},
        {path: '/detail/artist/info', name: '歌手详情'},
        {path: '/detail/artist/similar', name: '相似歌手'}
      ],
      artist: {}
    }
  },
  created() {
    this.artist.id = this.$route.query.id
    this.getArtistDetail()
  },
  methods: {
    async getArtistDetail() {
      const res = await artistDetail(this.artist.id)
      if (res.code !== 200) return
      this.artist = res.data.artist
    }
  }
}
</script>

<template>
  <div class="artist-detail">
    <div class="artist-banner">
      <detail-banner :avatar="artist.avatar">
        <template v-slot:title>
          <div class="font-24" style="font-weight: bold">{{ artist.name }}</div>
          <div style="margin-top: 5px">{{ artist.transNames && artist.transNames[0] }}</div>
        </template>
        <template v-slot:buttons>
          <div class="button-group">
            <button class="cir-btn-white pointer font-14">
              <svg-icon icon-class="collection-records" class-name="font-18"></svg-icon>
              收藏
            </button>
            <button class="cir-btn-white pointer font-14">
              <svg-icon icon-class="user" class-name="font-18"></svg-icon>
              个人主页
            </button>
          </div>
        </template>
        <template v-slot:others>
          <div class="artist-other-info">
            <span>单曲数:{{ artist.musicSize }}</span>
            <span>专辑数:{{ artist.albumSize }}</span>
            <span>MV数:{{ artist.mvSize }}</span>
          </div>
        </template>
      </detail-banner>
    </div>
    <TabMenu style="margin: 0 30px" :menu-list="routes" mode="route" :query="$route.query"></TabMenu>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="less">
.artist-detail {
  margin-top: 30px;

  .artist-banner {
    margin: 0 30px 20px;

    .button-group {
      margin: 10px 0;
      vertical-align: middle;

      button {
        margin-right: 10px;
      }
    }
    .artist-other-info{
      margin-top: 15px;
      span{
        margin-right: 20px;
      }
    }
  }

}
</style>