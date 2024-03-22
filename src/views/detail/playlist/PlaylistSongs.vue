<script>
import {playlistSongs} from "@/api/api_playlist";
import MusicList from "@/components/list/MusicList.vue";

export default {
  name: "PlaylistSongs",
  components: {MusicList},
  data(){
    return {
      songs:[],
      isLoading: false,
      playlistId:'',
      titles:[
        {val:'操作',width: '5%'},
        {val:'音乐标题',width:'45%'},
        {val:'歌手',width:'20%'},
        {val:'专辑',width:'20%'},
        {val:'时长',width:'10%'}
      ],
    }
  },
  created() {
    if(this.$route.query.id){
      this.playlistId = this.$route.query.id
      this.queryPlaylistSongs()
    }
  },
  methods:{
    async queryPlaylistSongs(){
      this.isLoading = true
      const res = await playlistSongs(this.playlistId)
      if(res.code !== 200) return
      this.songs = res.songs
      this.isLoading = false
    }
  }
}
</script>

<template>
<div class="playlist-wrapper">
  <el-skeleton :rows="10" animated v-show="isLoading"></el-skeleton>
  <MusicList v-show="!isLoading" :titles="titles" :data-list="songs"></MusicList>
</div>
</template>

<style scoped lang="less">
.playlist-wrapper{
  margin: 0 30px;
}
</style>