<template>
  <div class="header-bar">
    <!-- logo区 -->
    <div class="logo-wrap pointer">
      <i class="iconfont icon-logView"></i>
    </div>
    <!-- 历史按钮 -->
    <div class="history-btn">
      <button @click="goTo(-1)" class="btn-circle">
        <i class="iconfont icon-arrow-left-bold"></i>
      </button>
      <button @click="goTo(1)" class="btn-circle">
        <i class="iconfont icon-arrow-right"></i>
      </button>
    </div>
    <div class="search-input">
      <SearchBar/>
    </div>
    <div class="login-info font-12">{{ nickName }}</div>
    <div class="avatar-wrap pointer">
      <el-avatar :size="30" icon="el-icon-user-solid" :src="avatarUrl"></el-avatar>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/header/SearchBar'
import {mapState} from "vuex";

export default {
  name: 'HeaderBar',
  components: {
    SearchBar,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['isLogin', 'account', 'profile']),

    avatarUrl() {
      return this.isLogin ? this.profile.avatarUrl : ''
    },
    nickName() {
      return this.isLogin ? this.profile.nickName : '未登录'
    }
  },
  methods:{
    goTo(step){
      this.$router.go(step)
    }
  }
}
</script>

<style scoped lang="less">
@import '@/assets/less/lessConfig.less';

.header-bar {
  //display: flex;
  align-items: center;
  color: #ffffff;
  //position: absolute;
  background-color: @headRed;
  height: 60px;
  line-height: 60px;
  width: 100%;
  top: 0;
  //border: 1px solid black;
  padding-right: 20px;
}

.icon-logView {
  font-size: 48px;
  float: left;
}

.history-btn {
  margin-left: 55px;
  display: flex;
  float: left;
  height: 100%;
  justify-content: center;
  align-items: center;
  //width: 100%;
  // border: 1px solid black;

  .btn-circle {
    display: flex;
    height: 26px;
    width: 26px;
    outline: 0;
    border: 0;
    background-color: #e13e3e;
    color: #ffffff;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
  }
}

.search-input {
  margin-left: 10px;
  width: 220px;
  height: 100%;
  float: left;
  //border: 1px solid black;
}

.avatar-wrap {
  float: right;
  height: 100%;
  display: flex;
  align-items: center;

}

.login-info {
  float: right;
  margin-left: 10px;
}
</style>