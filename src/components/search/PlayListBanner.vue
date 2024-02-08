<script>
import {toCNNum} from "@/util/formatUtil";

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
    },
    convert(num){
      return toCNNum(num)
    }
  }
}
</script>

<template>
<div @click="clickPlayList" class="pointer banner-content" v-if="playlist">
  <img v-lazy="playlist.coverImgUrl + '?param=100y100'" alt="">
  <div class="banner-info">
    <div style="text-overflow: ellipsis">歌单: {{playlist.name}}</div>
    <div>歌曲:{{playlist.trackCount}}，播放{{convert(playlist.playCount)}}</div>
  </div>
</div>
</template>

<style scoped lang="less">
.banner-content{
  width: 320px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  background-color: #f2f2f2;
  img{
    width: 50px;
    border-radius: 50%;
  }
  .banner-info{
    margin-left: 10px;
  }
}
</style>