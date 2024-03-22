<script>
export default {
  name: "DetailBanner", //歌单，专辑，歌手等详情页面的banner
  props: {
    avatar: {
      require: true,
      type: String
    }
  }
}
</script>

<template>
  <div class="banner">
    <img v-lazy="avatar" alt="">
    <div class="banner-info">
      <!--        标题区域-->
      <slot name="title"></slot>
      <!--      按钮区域  -->
      <slot name="buttons"></slot>
      <!--        其他信息-->
      <slot name="others"></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.banner {
  margin: 0 30px;
  display: flex;

  img {
    width: 180px;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
  }

  .banner-info {
    margin-left: 30px;
  }
}
</style>