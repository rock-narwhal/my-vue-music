<script>
export default {
  //搜索也顶部推荐歌单组件
  name: "AlbumBanner",
  props:{
    playlist:{
      type: Object,
      require: true
    }
  },
  methods:{
    clickPlayList(){
      // 跳转到歌单详情
    }
  }
}
</script>

<template>
<div @click="clickPlayList" class="pointer" v-if="playlist">
  <img v-lazy="playlist.coverImgUrl + '?param=100y100'" alt="">
  <div>
    <div>歌单: {{playlist.name}}</div>
    <div>歌曲:{{playlist.trackCount}}，播放{{playlist.playCount}}</div>
  </div>
</div>
</template>

<style scoped lang="less">

</style>