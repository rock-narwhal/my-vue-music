<template>
  <div>
    <div>
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
        { path: '/homePage/personalrecom', name: '个性推荐' },
        { path: '/homePage/playlist', name: '歌单' },
        { path: '/homePage/toplist', name: '排行榜' },
        { path: '/homePage/artistlist', name: '歌手' },
        { path: '/homePage/latest', name: '最新音乐' }
      ]
    }
  }
}
</script>