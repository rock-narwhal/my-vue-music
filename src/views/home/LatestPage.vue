<script>
export default {
  name: "LatestPage", // 首页/最新页
  data() {
    return {
      activePage: 0, // 0 新歌  1 新碟
      routes :['/homePage/latest/songs','/homePage/latest/albums']
    }
  },
  methods: {
    toSubPage(active) {
      this.activePage = active
        this.$router.push(this.routes[active])
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="top-btn-wrap">
      <div class="btn-outer">
        <button class="no-btn" :class="{'active-btn': activePage === 0}" @click="toSubPage(0)">新歌速递</button>
        <button class="no-btn" :class="{'active-btn': activePage === 1}" @click="toSubPage(1)">新碟上架</button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 0 15%;
  .top-btn-wrap {
    width: 100%;
    .btn-outer{
      height: 32px;
      width: 202px;
      margin: auto;
      border: 1px solid #d0d0d0;
      box-sizing: border-box;
      border-radius: 15px;
      button{
        height: 30px;
        width: 100px;
        border-radius: 15px;
        box-sizing: border-box;
        &:hover{
          background-color: #e7e7e7;
        }
      }
      button.active-btn{
        background-color: #d0d0d0;
        color: white;
      }
    }
  }
}
</style>