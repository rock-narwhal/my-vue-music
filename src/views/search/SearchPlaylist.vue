<script>
import ImgWidthList from "@/components/list/ImgWidthList.vue";
import {cloudSearch} from "@/api/api_music";
import {toCNNum} from "@/util/formatUtil";

export default {
  name: "SearchPlaylist",
  components: {
    ImgWidthList,
  },
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
        type: 1000,//专辑
        keywords: '',
      },
      list: []
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
      this.list = this.list.filter(() => false)
      const res = await cloudSearch(this.queryInfo)
      if (res.code !== 200) return
      console.log('SearchAlbum doSearch', res.result)
      this.list.push(...res.result.playlists)
      this.pageInfo.total = res.result.playlistCount
      this.isLoading = false
    },
    numConvert(num){
      return toCNNum(num)
    }
  }
}
</script>

<template>
  <div class="">
    <el-skeleton :rows="10" animated v-show="isLoading"></el-skeleton>
    <ImgWidthList :list="list" mode="pl">
      <template v-slot="{scope}">
        <div class="float-item track-count">{{ scope.trackCount }} 首</div>
        <div class="float-item ar-name">by {{ scope.creator.nickname }}</div>
        <div class="float-item play-count"><i class="iconfont icon-bofang"></i> {{ numConvert(scope.playCount) }}</div>
      </template>
    </ImgWidthList>
  </div>

</template>

<style scoped lang="less">
.float-item{
  float: left;
  line-height: 100%;
}
.track-count{
  width: 20%;
}
.ar-name{
  width: 60%;
}
.play-count{
  width: 20%;
  i{
    border: 1px solid black;
    border-radius: 50%;
  }
}
</style>