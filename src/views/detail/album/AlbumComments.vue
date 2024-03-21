<script>
import {albumComment} from "@/api/api_other";
import UserComment from "@/components/commons/UserComment.vue";

export default {
  name: "AlbumComments",
  components: {UserComment},
  data(){
    return{
      hotComments:[],
      commentList:[],
      pageInfo:{
        current:1,
        hasMore: true,
        total: 0,
      },
      queryInfo:{
        offset: 0,
        limit: 20,
        id:'',
      },
      isLoading: false
    }
  },
  created() {
    if(this.$route.query.id){
      this.queryInfo.id = this.$route.query.id
      this.queryAlbumComment()
    }
  },
  methods:{
    async queryAlbumComment(){
      this.isLoading = true
      const res = await albumComment(this.queryInfo)
      if(res.code !== 200) return
      this.commentList = res.comments
      this.pageInfo.hasMore = res.more
      this.pageInfo.total = res.total
      if(res.hotComments) this.hotComments = res.hotComments
      this.isLoading = false
    }
  }
}
</script>

<template>
<div class="album-comment-wrapper">
  <div>输入框</div>
  <div>精彩评论</div>
  <ul>
    <li v-for="item in hotComments" :key="item.commentId">
      <user-comment :comment="item"></user-comment>
    </li>
  </ul>
  <div>最新评论({{pageInfo.total}})</div>
  <ul>
    <li v-for="item in commentList" :key="item.commentId">
      <user-comment :comment="item"></user-comment>
    </li>
  </ul>
</div>
</template>

<style scoped lang="less">
.album-comment-wrapper{
  padding: 0 30px;
}
</style>