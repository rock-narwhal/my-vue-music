<script>
export default {
  name: "LatestPage", // 首页/最新页
  data() {
    return {
      activePage: 0, // 0 新歌  1 新碟
    }
  },
  methods: {
    toSubPage(active) {
      this.activePage = active
      if (active === 0){
        this.$router.push('/homePage/latest/songs')
      }else{
        this.$router.push('/homePage/latest/albums')
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="top-btn-wrap">
      <div class="btn-outer">
        <button :class="{'active-btn': activePage === 0}" @click="toSubPage(0)">新歌速递</button>
        <button :class="{'active-btn': activePage === 1}" @click="toSubPage(1)">新碟上架</button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="less">

</style>