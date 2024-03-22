<script>
import TabMenu from "@/components/menu/TabMenu.vue";
import DetailBanner from "@/components/commons/DetailBanner.vue";
import {getPlayListDetail} from "@/api/api_playlist";
import {format} from "@/util/dateUtil";
import {toCNNum} from "@/util/formatUtil";

export default {
  name: "PlaylistDetail",
  components: {DetailBanner, TabMenu},
  data() {
    return {
      routes: [
        {path: '/detail/playlist/songs', name: '歌曲列表'},
        {path: '/detail/playlist/comments', name: '评论'},
        {path: '/detail/playlist/collectors', name: '收藏者'}
      ],
      playlistInfo: {},
      creator: {}
    }
  },
  created() {
    if (this.$route.query.id) {
      this.playlistInfo.id = this.$route.query.id
      this.queryPlaylistInfo()
    }
  },
  methods: {
    async queryPlaylistInfo() {
      const res = await getPlayListDetail(this.playlistInfo.id)
      if (res.code !== 200) return
      this.playlistInfo = res.playlist
      this.creator = res.playlist.creator
    },
    dateFormat(timestamp) {
      return format(timestamp)
    },
    numFormat(num) {
      return toCNNum(num)
    }
  }
}
</script>

<template>
  <div class="playlist-detail-wrapper">
    <div class="playlist-banner">
      <detail-banner :avatar="playlistInfo.coverImgUrl">
        <template v-slot:title>
          <div class="playlist-title">{{ playlistInfo.name }}</div>
          <div class="creator-info">
            <img v-lazy="creator.avatarUrl" class="pointer">
            <span class="pointer" style="color: #0077aa; margin: 0 5px">{{ creator.nickname }}</span>
            <span style="color: #c2c2c2">{{ dateFormat(playlistInfo.createTime) + '创建' }}</span>
          </div>
        </template>
        <template v-slot:buttons>
          <div class="button-group">
            <button class="cir-btn-red pointer font-14">
              <svg-icon icon-class="play-fill-white" class-name="font-20"></svg-icon>
              播放全部
            </button>
            <button class="cir-btn-white pointer font-14">
              <svg-icon icon-class="collection-records" class-name="font-20"></svg-icon>
              收藏
            </button>
            <button class="cir-btn-white pointer font-14">
              <svg-icon icon-class="share" class-name="font-18"></svg-icon>
              分享
            </button>
            <button class="cir-btn-white pointer font-14">
              <svg-icon icon-class="download-one" class-name="font-20"></svg-icon>
              下载全部
            </button>
          </div>
        </template>
        <template v-slot:others>
          <div class="playlist-other">
            <div style="margin-bottom: 5px">标签 : <span v-if="playlistInfo.tags">{{ playlistInfo.tags[0] }}</span></div>
            <div style="margin-bottom: 5px">歌曲 : {{ playlistInfo.trackCount }} 播放 : {{ numFormat(playlistInfo.playCount) }}</div>
            <div>简介 :</div>
          </div>
        </template>
      </detail-banner>
    </div>
    <TabMenu style="margin: 0 30px" :menu-list="routes" mode="route" :query="$route.query"></TabMenu>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="less">
.playlist-detail-wrapper {
  margin-top: 30px;

  .playlist-banner {
    margin: 0 30px;
    margin-bottom: 20px;

    img {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      vertical-align: middle;
    }

    .creator-info {
      line-height: 30px;
    }

    .playlist-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .button-group {
      margin: 10px 0;
      vertical-align: middle;
      button{
        margin-right: 10px;
      }
    }
  }
}
</style>