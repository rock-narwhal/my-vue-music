<script>
import TabMenu from "@/components/menu/TabMenu.vue";
import {albumDetail, albumDetailDynamic} from "@/api/api_music";
import {format} from "@/util/dateUtil";
import DetailBanner from "@/components/commons/DetailBanner.vue";

export default {
  name: "AlbumDetail",
  components: {DetailBanner, TabMenu},
  data() {
    return {
      menuList: [
        {path: '/detail/album/musicList', name: '歌曲列表'},
        {path: '/detail/album/comments', name: '评论'},
        {path: '/detail/album/info', name: '专辑详情'}
      ],
      album: {},
      songs: [],
      albumInfo: {}
    }
  },
  created() {
    if (this.$route.query.id) {
      this.album.id = this.$route.query.id
      this.getAlbumDetail()
      this.getAlbumDynamic()
    }
  },
  methods: {
    //专辑详情
    async getAlbumDetail() {
      const res = await albumDetail(this.album.id)
      if (res.code !== 200) return
      this.album = res.album
      this.songs = res.songs
    },
    //专辑动态信息，收藏分享数等
    async getAlbumDynamic() {
      const res = await albumDetailDynamic(this.album.id)
      if (res.code !== 200) return
      this.albumInfo = res
    }
  },
  computed: {
    pubTime() {
      return format(this.album.publishTime)
    },
    // 判断歌曲中是否需要VIP
    checkVip() {
      return this.songs.filter(item => item.fee === 1).length > 0
    }
  }
}
</script>

<template>
  <div class="album-detail">
    <div class="album-banner">
      <detail-banner :avatar="album.picUrl">
        <template v-slot:title>
          <div class="font-24" style="font-weight: bold">{{ album.name }}</div>
        </template>
        <template v-slot:buttons>
          <div class="button-group">
            <!--          按钮-->
            <button class="cir-btn-red pointer font-14" v-show="checkVip"
                    style="background-color: #ec4141; color: white">
              <svg-icon icon-class="play-fill-white" class-name="font-20"></svg-icon>
              开通VIP畅听专辑
            </button>
            <button class="cir-btn-white pointer font-14" v-show="!albumInfo.isSub">
              <svg-icon icon-class="collection-records" class-name="font-18"></svg-icon>
              收藏({{ albumInfo.subCount }})
            </button>
            <button class="cir-btn-white pointer font-14">
              <svg-icon icon-class="download-one" class-name="font-18"></svg-icon>
              VIP下载
            </button>
            <button class="cir-btn-white pointer font-14" v-show="albumInfo">
              <svg-icon icon-class="share" class-name="font-18"></svg-icon>
              {{ albumInfo.shareCount }}
            </button>
          </div>
        </template>
        <template v-slot:others>
          <div v-if="album.artist">歌手:{{ album.artist.name }}</div>
          <div>时间:{{ pubTime }}</div>
        </template>
      </detail-banner>
    </div>
    <TabMenu style="margin: 0 30px" :menu-list="menuList" mode="route" :query="$route.query"></TabMenu>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="less">
.album-detail {
  margin-top: 30px;

  .album-banner {
    margin: 0 30px 20px;

    .button-group {
      margin: 10px 0;
      vertical-align: middle;

      button {
        margin-right: 10px;
      }
    }
  }
}
</style>