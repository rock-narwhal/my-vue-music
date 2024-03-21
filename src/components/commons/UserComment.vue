<script>
import {dateTimeFormat} from "@/util/dateUtil";

export default {
  name: "UserComment",
  props:{
    comment:{
      require: true,
      type: Object
    }
  },
  computed:{
    pubDateTime(){
      return dateTimeFormat(this.comment.time)
    }
  }
}
</script>

<template>
<div class="comment-wrapper clearfix">
  <img v-lazy="comment.user.avatarUrl">
  <div class="comment-content">
    <div class="content-block"><span style="color: #0077aa">{{comment.user.nickname}} : </span>{{comment.content}}</div>
    <div v-if="comment.beReplied && comment.beReplied.length" class="replied-content content-block"><span style="color: #0077aa">@{{comment.beReplied[0].user.nickname}} : </span>{{comment.beReplied[0].content}}</div>
    <div class="content-block">
      <span>{{pubDateTime}}</span>
      <div class="button-wrapper">
        <button>举报</button>
        <button><svg-icon icon-class="thumbs-up"></svg-icon>{{comment.likedCount}}</button>
        <button><svg-icon icon-class="share"></svg-icon></button>
        <button><svg-icon icon-class="comment"></svg-icon></button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="less">
.comment-wrapper{
  padding: 15px 0;
  display: flex;
  border-bottom: 1px solid #eee;
  img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    //float: left;
  }
  .comment-content{
    width: 100%;
    margin-left: 10px;
    //float: left;
    .replied-content{
      background-color: #eeeeee;
      border-radius: 3px;
    }
    .button-wrapper{
      margin-right: 5px;
      float: right;

      button{
        background-color: white;
        border: none;
        border-right: 1px solid #eee;
      }
    }
  }
  .content-block{
    height: 20px;
    line-height: 20px;
  }
}
</style>