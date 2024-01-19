<template>
  <div>
<!--    左侧区域-->
    <div class="left-area">
      <transition>
        <!--      按钮区域-->
        <div class="left-btn">
          <button class="no-btn pointer">
            <i class="el-icon-arrow-down"></i>
          </button>
          <button>
            <i class="iconfont icon-xunhuan"></i>
          </button>
          <button>
            <i class="iconfont icon-shoucang"></i>
          </button>
          <button>
            <i class="iconfont icon-xiazai47"></i>
          </button>
          <button>
            <i class="iconfont icon-fenxiang"></i>
          </button>
        </div>
        <!--      封面区域-->
        <div class="cover-area">
          <div class="cover">
            <img src="" alt="">
            <button class="el-icon-arrow-up"></button>
          </div>
          <div class="song-info">
            <div class="song-name">
              {{playingInfo.name}}
            </div>
          </div>
        </div>
      </transition>
    </div>
<!--    音乐控制条-->
    <div class="control-bar"></div>
<!--    右侧栏-->
    <div class="right-area"></div>
<!--    -->
    <audio ref="audioRef">
      <source :src="playingInfo.src">
    </audio>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default{
  name:'FooterBar',
  computed:{
    ...mapState(['playingInfo'])
  }
}
</script>

<style scoped lang="less">
</style>