<script>
import {artistAlbum} from "@/api/api_artist";
import ImgWidthList from "@/components/list/ImgWidthList.vue"
import {format} from "@/util/dateUtil";

export default {
  name: "AritstAlbum",
  components: {
    ImgWidthList,
  },
  data() {
    return {
      albums: [],
      queryInfo: {
        id: '',
        offset: 0,
        limit: 30
      },
      pageInfo: {
        hasMore: false,
        isLoading: false
      }
    }
  },
  created() {
    this.queryInfo.id = this.$route.query.id || ''
    if (this.queryInfo.id) {
      this.albums = []
      this.getArtistAlbum()
    }
  },
  methods: {
    async getArtistAlbum() {
      this.pageInfo.isLoading = true
      const res = await artistAlbum(this.queryInfo)
      if (res.code !== 200) return
      this.albums.push(...res.hotAlbums)
      this.pageInfo.hasMore = res.more
      this.pageInfo.isLoading = false
    },
    loadMore() {
      if (!this.pageInfo.hasMore) return
      this.queryInfo.offset = this.albums.length
      this.getArtistAlbum()
    },
    dateFormat(timestamp){
      return format(timestamp)
    }
  }
}
</script>

<template>
  <ImgWidthList :list="albums"
                mode="al"
                :has-more="pageInfo.hasMore"
                :infinite="true"
                :is-loading="pageInfo.isLoading"
                @loadMore="loadMore">
    <template v-slot="{scope}">
      <div class="song-count">{{scope.size}}首</div>
      <div class="publish-date">发行时间: {{dateFormat(scope.publishTime)}}</div>
    </template>
  </ImgWidthList>
</template>

<style scoped lang="less">
.song-count{
  float: left;
  width: 60%;
}
.publish-date{
  float: left;
}
</style>