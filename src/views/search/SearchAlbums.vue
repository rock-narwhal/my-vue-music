<script>
import ImgWidthList from "@/components/list/ImgWidthList.vue";
import {cloudSearch} from "@/api/api_music";

export default {
  name: "SearchAlbums",
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
        type: 10,//专辑
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
      this.list.push(...res.result.albums)
      this.pageInfo.total = res.result.albumCount
      this.isLoading = false
    },
    toAlbumDetail(id) {
      this.$router.push('/detail/album?id=' + id)
    }
  }
}
</script>

<template>
  <div class="album-wrap">
    <!--  搜索 单曲页面  {{$route.query}}-->
    <el-skeleton :rows="10" animated v-show="isLoading"></el-skeleton>
    <ImgWidthList :list="list" mode="al" @clickItem="toAlbumDetail">
      <template v-slot="{scope}">
        {{ scope.artist.name }} <span v-if="scope.artist.trans">({{ scope.artist.trans }})</span>
      </template>
    </ImgWidthList>
  </div>
</template>

<style scoped lang="less">
.album-wrap {
  ul {
    li {
      &:nth-child(odd) {
        background-color: #f3f3f3;
      }
    }
  }
}
</style>