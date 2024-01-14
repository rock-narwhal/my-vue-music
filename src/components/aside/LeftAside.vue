<template>
  <div class="menu-container">
    <el-menu router :default-active="activeMenu" @select="handleSelect">
      <el-menu-item
          v-for="item in commonList"
          :index="item.path"
          :key="item.path"
          :disabled="item.login && !isLogin"
      >
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
      <el-menu-item-group>
        <template v-slot:title>我的音乐</template>
        <el-menu-item
            v-for="item in myList"
            :index="item.path"
            :key="item.path"
            :disabled="item.login && !isLogin">
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group v-if="isLogin">
        <template v-slot:title>创建的歌单</template>
        <el-menu-item
            v-for="(item,index) in createPlayList"
            :index="subPath(item.id)"
            :key="item.id">
          <div slot="title" class="text-hidden">
            <i v-if="index === 0" class="iconfont icon-aixin"></i>
            <i v-else class="iconfont icon-gedan"></i>
            {{item.name}}
          </div>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group v-if="isLogin">
        <template v-slot:title>收藏的歌单</template>
        <el-menu-item
        v-for="item in subscribePlaylist"
        :index="subPath(item.id)"
        :key="item.id"
        >
          <div slot="title" class="text=hidden">
            <i class="iconfont icon-gedan"></i>
            {{item.name}}
          </div>
        </el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  name: 'LeftAside',
  data() {
    return {
      activeMenu: '/personalrecom',
      menuList: [
        // login 是否要求登录  type: 1 myList  0 公共菜单
        {path: '/homePage/personalrecom', title: '发现音乐', login: false, type: 0},
        {path: '/homePage/recomsongs', title: '每日推荐', login: true, type: 1},
        {path: '/homePage/video', title: '视频', login: true, type: 0},
        {path: '/homePage/personalfm', title: '私人FM', login: true, type: 0},
        {path: '/homePage/historyplay', title: '最近播放', login: false, type: 1},
        {path: '/homePage/subscribe', title: '我的收藏', login: true, type: 1}
      ]
    }
  },
  computed: {
    ...mapState(['isLogin']),
    ...mapGetters(['createPlaylist','subscribePlaylist']),
    commonList() {
      return this.menuList.filter(item => item.type === 0)
    },
    myList() {
      return this.menuList.filter(item => item.type === 1)
    }
  },
  methods: {
    handleSelect(index, indexPath) {
      console.log('handleSelect', index, indexPath)
    },
    subPath(id) {
      if (typeof id === 'number') return `/playlistdetail/${id}`
      else return '/404'
    },
    activeMenuChange(val){
      this.activeMenu = val
    }
  },
  mounted() {
    this.$bus.$on('activeMenuChange',this.activeMenuChange)
  }
}
</script>

<style scoped lang="less">
.el-menu{
  width: 100%;
  border-right: none;
}
</style>