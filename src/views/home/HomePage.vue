<template>
  <div>
    <div class="router-list">
      <tab-menu :menuList="routeList" mode="route"></tab-menu>
    </div>
    <div>
      <transition name="el-fade-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import TabMenu from "@/components/menu/TabMenu";

export default {
  name: "HomePage",
  components: {TabMenu},
  comments:{
    TabMenu,
  },
  data(){
    return{
      routeList:[
        { path: '/personalrecom', name: '个性推荐' },
        { path: '/playlist', name: '歌单' },
        { path: '/toplist', name: '排行榜' },
        { path: '/artistlist', name: '歌手' },
        { path: '/zuixin', name: '最新音乐' }
      ]
    }
  }
}
</script>