<script>
import TabMenu from "@/components/menu/TabMenu.vue";
import {albumDetail} from "@/api/api_music";
import {format} from "@/util/dateUtil";

export default {
  name: "AlbumDetail",
  components: {TabMenu},
  data(){
    return{
      menuList:[
        {path: '/detail/album/musicList', name: '歌曲列表'},
        {path: '/detail/album/comments', name: '评论'},
        {path: '/detail/album/info', name: '专辑详情'}
      ],
      album:{}
    }
  },
  created() {
    if(this.$route.query.id){
      this.album.id = this.$route.query.id
      this.getAlbumDetail()
    }
  },
  methods:{
    async getAlbumDetail(){
      const res = await albumDetail(this.album.id)
      if(res.code !== 200) return
      this.album = res.album
    }
  },
  computed:{
    pubTime(){
      return format(this.album.publishTime)
    }
  }
}
</script>

<template>
<div class="album-detail">
  <div class="album-banner">
    <img v-lazy="album.picUrl" v-show="album.picUrl" alt="">
    <div class="album-info">
      <div class="font-24" style="font-weight: bold">{{album.name}}</div>
      <div>
        <div v-if="album.artist">歌手:{{album.artist.name}}</div>
        <div>时间:{{pubTime}}</div>
      </div>
    </div>
  </div>
  <TabMenu style="margin: 0 30px" :menu-list="menuList" mode="route" :query="$route.query"></TabMenu>
  <router-view></router-view>
</div>
</template>

<style scoped lang="less">
.album-detail{
  margin-top: 30px;
  .album-banner{
    margin: 0 30px;
    display: flex;
    img{
      width: 180px;
      border: 1px solid #f2f2f2;
      border-radius: 5px;
    }
    .album-info{
      margin-left: 30px;
    }
  }
}
</style>