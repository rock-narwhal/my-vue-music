<template>
  <div class="layout">
    <!-- 头部区域 -->
    <div class="header">
      <HeaderBar></HeaderBar>
    </div>
    <!-- 中间区域 -->
    <div class="main">
      <!-- 左侧菜单区 -->
      <div class="aside">
        <LeftAside></LeftAside>
      </div>
      <!-- 内容区 -->
      <div class="content" ref="scrollWrapRef">
        <transition el-fade-in>
          <router-view/>
        </transition>
      </div>
      <!-- 右侧隐藏抽屉栏 播放列表 -->
      <div class="drawer">
        <DrawerList></DrawerList>
      </div>
    </div>
    <!-- 底部音乐进度条 -->
    <div class="footer">
      <FooterBar></FooterBar>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/HeaderBar.vue'
import LeftAside from '@/components/aside/LeftAside.vue'
import DrawerList from '@/components/drawer/DrawerList.vue'
import FooterBar from '@/components/footer/FooterBar.vue'

export default {
  name: 'Layout',
  components: {
    HeaderBar, LeftAside, DrawerList, FooterBar
  },
  data() {
    return {
      msg: 'Layout'
    }
  },
  methods:{
    scrollTop(){
      this.$refs.scrollWrapRef.scrollTop = 0
    }
  },
  mounted() {

  },
  created() {
    console.log('layout组件被创建')
    this.$bus.$on('scrollTop',this.scrollTop)
  },
  watch: {
    '$route.path'(val) {
      this.scrollTop()
      // 通知LeftAside
      this.$bus.$emit('activeMenuChange', val)
    }
  }
}
</script>

<style scoped lang="less">
.main {
  position: absolute;
  top: 60px;
  bottom: 80px;
  width: 100%;
  height: auto;
  display: flex;

  .aside {
    width: 235px;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    border-right: 1px solid #d7d0d0;
  }

  .content {
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    height: auto;
  }
}

.footer {
  position: absolute;
  height: 80px;
  bottom: 0px;
  width: 100%;
  border-top: 1px solid #d7d0d0;
}
</style>