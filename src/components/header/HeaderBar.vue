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
  </div>
</template>

<script>
import SearchBar from '@/components/header/SearchBar'
export default {
  name: 'HeaderBar',
  components: {
    SearchBar,
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="less">
@import '@/assets/less/lessConfig.less';

.header-bar{
    display: flex;
    align-items: center;
    color: #ffffff;
    position: absolute;
    background-color: @headRed;
    height: 60px;
    width: 100%;
    top: 0;
}

.icon-logView{
    font-size: 48px;
}

.history-btn{
    margin-left: 100px;
    display: flex;
    // border: 1px solid black;

    .btn-circle{
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

.search-input{
    margin-left: 10px;
    width: 220px;
    height: 100%;
    //border: 1px solid black;
}


</style>