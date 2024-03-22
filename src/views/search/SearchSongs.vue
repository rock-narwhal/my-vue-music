<script>
import {cloudSearch} from "@/api/api_music";
import {timeConvert} from "@/util/dateUtil";
import MusicList from "@/components/list/MusicList.vue";

export default {
  name: "SearchSongs",
  components: {MusicList},
  data() {
    return {
      isLoading: true,
      pageInfo: {
        current: 1,
        total: 0,
      },
      queryInfo: {
        offset: 0,
        limit: 50,
        type: 1,//单曲
        keywords: '',
      },
      titles:[
        {val:'',width: '5%'},
        {val:'音乐标题',width:'45%'},
        {val:'歌手',width:'20%'},
        {val:'专辑',width:'20%'},
        {val:'时长',width:'10%'}
      ],
      songList: []
    }
  },
  created() {
    let keywords = decodeURI(this.$route.query.keywords)
    this.queryInfo.keywords = keywords.replaceAll(/\s+/g, '+')
    this.doSearch()
  },
  watch: {
    '$route.query'(val) {
      let keywords = decodeURI(val.keywords)
      this.queryInfo.keywords = keywords.replaceAll(/\s+/g, '+')
      this.doSearch()
    }
  },
  methods: {
    async doSearch() {
      this.isLoading = true
      this.songList = this.songList.filter(() => false)
      const res = await cloudSearch(this.queryInfo)
      if (res.code !== 200) return
      this.songList.push(...res.result.songs)
      this.pageInfo.total = res.result.songCount
      this.isLoading = false
    },
    playMusic(song){

    }
  }
}
</script>

<template>
  <div>
    <!--  搜索 单曲页面  {{$route.query}}-->
    <el-skeleton :rows="10" animated v-show="isLoading"></el-skeleton>
    <MusicList v-show="!isLoading" style="margin:0 30px" :titles="titles" :data-list="songList" :dbClick="playMusic"></MusicList>
  </div>
</template>

<style scoped lang="less">

</style>