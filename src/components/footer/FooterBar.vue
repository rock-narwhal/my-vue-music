<template>
  <div class="player-bar">
    <!--    左侧区域-->
    <transition>
      <div class="left-area" :class="{'hide-cover': hiddenCover}">
        <!--      按钮区域-->
        <div class="left-btn">
          <button class="pointer font-18 no-btn down-btn"
                  @click="targetPlayPage(false)">
            <i class="el-icon-arrow-down"></i>
          </button>
          <button class="font-20 circle">
            <i class="iconfont icon-aixin"></i>
          </button>
          <button class="circle">
            <i class="el-icon-folder-add"></i>
          </button>
          <button class="circle">
            <i class="el-icon-download"></i>
          </button>
          <button class="circle">
            <i class="iconfont icon-fenxiang"></i>
          </button>
        </div>
        <!--      封面区域-->
        <div class="cover-area">
          <div class="cover">
            <img v-lazy="playingInfo.coverUrl" alt="">
            <button class="no-btn font-18" @click="targetPlayPage(true)">
              <i class="el-icon-arrow-up"></i>
            </button>
          </div>
          <div class="song-info">
            <div class="song-name font-18">
              {{ playingInfo.name }}
              <i class="iconfont icon-aixin"></i>
            </div>
            <div>
              {{ playingInfo.artists[0].name }}
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--    音乐控制条-->
    <div class="control-bar">

    </div>
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

export default {
  name: 'FooterBar',
  data() {
    return {
      hiddenCover: false, //封面和按钮切换
    }
  },
  computed: {
    ...mapState(['playingInfo'])
  },
  methods: {
    // 点击展开/关闭播放器界面
    targetPlayPage(val) {
      if(this.hiddenCover === val) return
      this.hiddenCover = val
    }
  }
}
</script>

<style scoped lang="less">
.player-bar {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 15px;
  overflow: hidden;
  transition: all 0.5s;

  .left-area {
    height: 160px;
    position: absolute;
    top: -80px;
    width: 280px;

    .left-btn {
      height: 50%;
      width: 100%;
      display: flex;
      align-items: center;

      button {
        width: 40px;
        height: 40px;
        background-color: white;

        &.down-btn {
          height: 50px;
          width: 50px;
          margin-right: 5px;
        }
      }

      .circle {
        border: 1px solid #cccccc;
        margin-left: 10px;
      }
    }

    .cover-area {
      height: 80px;
      width: 280px;
      display: flex;
      align-items: center;

      .cover {
        height: 50px;
        width: 50px;
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        margin-right: 15px;

        button {
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          color: white;
          background-color: black;
          opacity: 0.5;
          display: none;
        }

        &:hover button {
          display: block;
        }
      }
    }

    &.hide-cover {
      top: 0;
    }
  }
}
</style>