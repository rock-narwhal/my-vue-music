<script>
import {artistDetail} from "@/api/api_artist";
import TabMenu from "@/components/menu/TabMenu.vue";

export default {
  name: "ArtistDetail",
  components: {TabMenu},
  data(){
    return {
      routes:[
        {path: '/detail/artist/album', name: '专辑'},
        {path: '/detail/artist/mv', name: 'MV'},
        {path: '/detail/artist/info', name: '歌手详情'},
        {path: '/detail/artist/similar', name: '相似歌手'}
      ],
      artist:{

      }
    }
  },
  created() {
    console.log('歌手详情页',this.$route.query)
    this.artist.id = this.$route.query.id
    this.getArtistDetail()
  },
  methods:{
    async getArtistDetail(){
      const res = await artistDetail(this.artist.id)
      if(res.code !== 200) return
      console.log('查询歌手详情 ',res.data)
      this.artist = res.data.artist
    }
  }
}
</script>

<template>
<div class="artist-detail">
  <div class="banner">
    <img v-lazy="artist.avatar" v-show="artist.id" alt="">
    <div class="artist-info">
      <div class="font-24" style="font-weight: bold">{{artist.name}}</div>
      <div>{{artist.transNames && artist.transNames[0]}}</div>
      <div>
        <button><svg-icon icon-class="collection-records"></svg-icon>收藏</button>
        <button><svg-icon icon-class="user"></svg-icon>个人主页</button>
      </div>
      <div>
        <span>单曲数:{{artist.musicSize}}</span>
        <span>专辑数:{{artist.albumSize}}</span>
        <span>MV数:{{artist.mvSize}}</span>
      </div>
    </div>
  </div>
  <TabMenu style="margin: 0 30px" :menu-list="routes" mode="route"></TabMenu>
  <router-view></router-view>
</div>
</template>

<style scoped lang="less">
.artist-detail{
  margin-top: 30px;
  .banner{
    margin: 0 30px;
    display: flex;
    img{
      width: 180px;
      border: 1px solid #f2f2f2;
      border-radius: 5px;
    }
    .artist-info{
      margin-left: 30px;
    }
  }

}
</style>