<script>
import {cloudSearch} from "@/api/api_music";
import {timeConvert} from "@/util/dateUtil";

export default {
  name: "SearchSongs",
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
      songList: []
    }
  },
  created() {
    let keywords = this.$route.query.keywords
    keywords = decodeURI(keywords)
    this.queryInfo.keywords = keywords.replaceAll(/\s+/g, '+')
    this.doSearch()
  },
  methods: {
    async doSearch() {
      this.isLoading = true
      this.songList = this.songList.filter(() => false)
      const res = await cloudSearch(this.queryInfo)
      if (res.code !== 200) return
      console.log('SearchSongs doSearch', res.result)
      this.songList.push(...res.result.songs)
      this.pageInfo.total = res.result.songCount
      this.isLoading = false
    },
    convert(milli) {
      return timeConvert(milli / 1000)
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
    <el-table
        :data="songList"
        stripe
        style="width: 100%"
        v-show="!isLoading"
        @cell-click="playMusic">
      <el-table-column
          type="index"
          width="60">
      </el-table-column>
      <el-table-column
          label="音乐标题"
          width="480">
        <template v-slot="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="歌手"
          width="360">
        <template v-slot="scope">
          <span>{{ scope.row.ar[0].name }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="专辑"
          width="360">
        <template v-slot="scope">
          <span>{{ scope.row.al.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="时长"
          width="100">
        <template v-slot="scope">
          <span>{{ convert(scope.row.dt) }}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<style scoped lang="less">

</style>