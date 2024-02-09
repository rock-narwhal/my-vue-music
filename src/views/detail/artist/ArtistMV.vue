<script>
import MVList from "@/components/list/MVList.vue";
import {artistMV} from "@/api/api_artist";

export default {
  name: "ArtistMV",
  components: {MVList},
  data() {
    return {
      queryInfo: {
        id: '',
        offset: 0,
        limit: 30,
      },
      hasMore: false,
      isLoading: false,
      mvList: []
    }
  },
  created() {
    this.queryInfo.id = this.$route.query.id || ''
    if (this.queryInfo.id) {
      this.mvList = []
      this.getMVList()
    }
  },
  methods: {
    async getMVList() {
      this.isLoading = true
      const res = await artistMV(this.queryInfo)
      if (res.code !== 200) {
        this.isLoading = false
        return
      }
      this.mvList.push(...res.mvs)
      this.hasMore = res.hasMore
      this.isLoading = false
    },
    loadMore() {
      if (!this.hasMore) return
      this.queryInfo.offset = this.mvList.length
      this.getMVList()
    }
  }
}
</script>

<template>
  <div class="mv-content">
    <MVList :list="mvList"
            :infinite="true"
            :has-more="hasMore"
            :is-loading="isLoading"
            @loadMore="loadMore"></MVList>
  </div>
</template>

<style scoped lang="less">
.mv-content {
  padding: 0 30px
}
</style>