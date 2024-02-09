<template>
  <div>
    <div>
      <tab-menu :menuList="routeList" mode="route" style="margin: 0 30px"></tab-menu>
    </div>
    <div class="content-wrap">
      <div class="space-wrap"></div>
      <div class="content-area">
        <transition name="el-fade-in">
          <router-view></router-view>
        </transition>
      </div>
      <div class="space-wrap"></div>
    </div>

  </div>
</template>

<script>
import TabMenu from "@/components/menu/TabMenu";

export default {
  name: "HomePage",
  components: {TabMenu},
  comments: {
    TabMenu,
  },
  data() {
    return {
      routeList: [
        {path: '/homePage/personalrecom', name: '个性推荐'},
        {path: '/homePage/playlist', name: '歌单'},
        {path: '/homePage/toplist', name: '排行榜'},
        {path: '/homePage/artistlist', name: '歌手'},
        {path: '/homePage/latest', name: '最新音乐'}
      ]
    }
  }
}
</script>

<style scoped lang="less">
.content-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  flex-wrap: nowrap;
}

.content-area {
  width: 1100px;
  box-sizing: border-box;
}

.space-wrap {
  flex-shrink: 1;
  min-width: 30px;
}
</style>