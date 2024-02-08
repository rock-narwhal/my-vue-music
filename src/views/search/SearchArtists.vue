<script>
import SearchListItem from "@/components/search/SearchList.vue";
import {cloudSearch} from "@/api/api_music";

export default {
  name: "SearchArtists",
  components: {
    SearchListItem,
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
        type: 100,//歌手
        keywords: '',
      },
      list: [], //歌手列表
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
      this.list.push(...res.result.artists)
      this.pageInfo.total = res.result.artistCount
      this.isLoading = false
    },
    //跳转到歌手详情
    toArtistDetail(id){
      this.$router.push(`/detail/artist?id=${id}`)
    }
  }
}
</script>

<template>
  <div>
    <!--  搜索 单曲页面  {{$route.query}}-->
    <el-skeleton :rows="10" animated v-show="isLoading"></el-skeleton>
    <SearchListItem :list="list" mode="ar" @clickItem="toArtistDetail"></SearchListItem>
  </div>
</template>

<style scoped lang="less">

</style>