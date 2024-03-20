<script>
import TabMenu from "@/components/menu/TabMenu.vue";
import {albumDetail, albumDetailDynamic} from "@/api/api_music";
import {format} from "@/util/dateUtil";

export default {
  name: "AlbumDetail",
  components: {TabMenu},
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
      <img v-lazy="album.picUrl" v-show="album.picUrl" alt="">
      <div class="album-info">
        <div class="font-24" style="font-weight: bold">{{ album.name }}</div>
        <div class="button-group">
          <!--          按钮-->
          <button v-show="checkVip" style="background-color: #ec4141; color: white">
            <svg-icon color="#fff" fillColor="#fff" icon-class="play-fill"></svg-icon>
            开通VIP畅听专辑
          </button>
          <button v-show="!this.albumInfo.isSub">
            <svg-icon icon-class="collection-records"></svg-icon>
            收藏({{ this.albumInfo.subCount }})
          </button>
          <button>
            <svg-icon icon-class="download-one"></svg-icon>
            VIP下载
          </button>
          <button v-show="this.albumInfo">
            <svg-icon icon-class="share"></svg-icon>
            {{ this.albumInfo.shareCount }}
          </button>
        </div>
        <div v-if="album.artist">歌手:{{ album.artist.name }}</div>
        <div>时间:{{ pubTime }}</div>
      </div>
    </div>
    <TabMenu style="margin: 0 30px" :menu-list="menuList" mode="route" :query="$route.query"></TabMenu>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="less">
.album-detail {
  margin-top: 30px;

  .album-banner {
    margin: 0 30px;
    display: flex;

    img {
      width: 180px;
      border: 1px solid #f2f2f2;
      border-radius: 5px;
    }

    .album-info {
      margin-left: 30px;

      .button-group {
        margin: 20px 0;

        button {
          height: 30px;
          border-radius: 15px;
          border: 1px solid #dadada;
          background: white;
          margin-right: 10px;
          text-align: center;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>