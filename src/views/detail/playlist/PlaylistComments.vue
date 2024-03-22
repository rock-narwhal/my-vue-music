<script>
import {playlistComments} from "@/api/api_playlist";
import UserComment from "@/components/commons/UserComment.vue";

export default {
  name: "PlaylistComments",
  components: {UserComment},
  data() {
    return {
      hotComments: [],
      comments: [],
      pageInfo: {
        current: 1,
        total: 0,
        hasMore: false
      },
      queryInfo: {
        offset: 0,
        limit: 20,
        id: ''
      },
      isLoading: false
    }
  },
  created() {
    if (this.$route.query.id) {
      this.queryInfo.id = this.$route.query.id
      this.queryPlaylistComments()
    }
  },
  methods: {
    async queryPlaylistComments() {
      this.isLoading = true
      const res = await playlistComments(this.queryInfo)
      if (res.code !== 200) return
      this.hotComments = res.hotComments
      this.comments = res.comments
      this.pageInfo.total = res.total
      this.pageInfo.hasMore = res.hasMore
      this.isLoading = false
    }
  }
}
</script>

<template>
  <div class="playlist-comments-wrapper">
    <div>假装是一个输入框</div>
    <div style="margin-top: 10px; margin-bottom: 50px" v-show="hotComments.length > 0">
      <span class="title">精彩评论</span>
      <ul>
        <li v-for="item in hotComments" :key="item.commentId">
          <user-comment :comment="item"></user-comment>
        </li>
      </ul>
    </div>
    <div>
      <span class="title">最新评论({{ this.pageInfo.total }})</span>
      <ul>
        <li v-for="item in comments" :key="item.commentId">
          <user-comment :comment="item"></user-comment>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
.playlist-comments-wrapper {
  margin: 0 30px;
}
.title{
  font-size: 14px;
  font-weight: bold;
}
</style>