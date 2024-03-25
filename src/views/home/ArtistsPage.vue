<template>
  <div class="container">
    <SelectBanner @clickOption="queryArtists"></SelectBanner>

    <ImgList type="artist"
             :list="artistList"
             :infinite="true"
             :has-more="hasMore"
             :is-loading="isLoading"
             @loadMore="loadArtist"
             @clickImg="toArtistDetail">
      <template v-slot="{item}">
        {{ item.name }}
      </template>
    </ImgList>
  </div>
</template>

<script>
// 首页歌手页面
import SelectBanner from "@/components/header/SelectBanner.vue";
import {queryArtist} from "@/api/api_artist";
import ImgList from "@/components/list/ImgList.vue";

export default {
  name: "ArtistsPage",
  components: {
    SelectBanner, ImgList
  },
  data() {
    return {
      artistList: [],
      queryParam: {
        limit: 50,
        offset: 0,
        type: -1,
        area: -1,
        initial: -1
      },
      hasMore: false,
      isLoading: false,
    }
  },
  created() {
    this.queryArtists(this.queryParam)
  },
  methods: {
    toArtistDetail(id) {
      this.$router.push(`/detail/artist?id=${id}`)
    },
    // 更改查询条件 查询歌手
    async queryArtists(option) {
      this.isLoading = true
      this.$bus.$emit('scrollTop') //更改查询条件应先滚动到顶部
      this.queryParam = {...this.queryParam, ...option}
      const res = await queryArtist(this.queryParam)
      if (res.code !== 200) return
      this.artistList = res.artists
      this.hasMore = res.more
      this.isLoading = false
    },
    // 向下滚动加载
    async loadArtist() {
      if (!this.hasMore) return
      this.isLoading = true
      this.queryParam.offset += this.artistList.length
      const res = await queryArtist(this.queryParam)
      if (res.code !== 200) return
      this.artistList.push(...res.artists)
      this.hasMore = res.more
      this.isLoading = false
    }
  }
}
</script>
<style scoped lang="less">
//.container {
//  padding: 0 10%;
//}
</style>