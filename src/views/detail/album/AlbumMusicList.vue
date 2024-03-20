<script>
import MusicList from "@/components/list/MusicList.vue";
import {albumDetail} from "@/api/api_music";

export default {
  name: "AlbumMusicList",
  components:{
    MusicList,
  },
  data(){
    return {
      musicList:[],
      titles:[
        {val:'',width: '5%'},
        {val:'音乐标题',width:'45%'},
        {val:'歌手',width:'20%'},
        {val:'专辑',width:'20%'},
        {val:'时长',width:'10%'}
      ],
      albumId:'',
      isLoading: false
    }
  },
  created() {
    if(this.$route.query.id){
      this.albumId = this.$route.query.id
      this.getAlbumMusicList()
    }
  },
  methods:{
    async getAlbumMusicList(){
      this.isLoading = true
      const res = await albumDetail(this.albumId)
      if(res.code !== 200) return
      this.musicList = res.songs
      this.isLoading = false
    },
    playMusic(id){

    }
  }
}
</script>

<template>
  <div>
    <el-skeleton :rows="10" animated v-show="isLoading"></el-skeleton>
    <MusicList v-show="!isLoading" style="margin:0 30px" :titles="titles" :data-list="musicList" :dbClick="playMusic"></MusicList>
  </div>
</template>

<style scoped lang="less">

</style>