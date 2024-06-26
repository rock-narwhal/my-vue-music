<template>
  <div class="player-bar">
    <!--    左侧区域-->
    <div class="left-area">
        <div class="cover-wrap" :class="{'hide-cover': hiddenCover}">
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
    </div>

    <!--    音乐控制条-->
    <div class="control-bar">
      <div class="ctl-btn">
        <button class="no-btn pointer">
          <i class="iconfont" :class="playModeIcon"></i>
        </button>
        <button class="no-btn pointer">
          <i class="iconfont icon-shangyishou"></i>
        </button>
        <button class="pause-btn" @click="playOrPause">
          <i class="iconfont icon-bofang" v-if="playingInfo.pause"></i>
          <i class="iconfont icon-zanting" v-else></i>
        </button>
        <button class="no-btn pointer">
          <i class="iconfont icon-xiayishou"></i>
        </button>
        <button class="no-btn pointer">词</button>
      </div>
      <div class="progress-bar">
        <span class="font-12">{{ timeConvert(playingInfo.current) }}</span>
        <ProgressSlider :size="360" v-model="progress" class="time-slider" @onChange="changeProgress"></ProgressSlider>
        <span class="font-12">{{ timeConvert(playingInfo.duration / 1000) }}</span>
      </div>
    </div>
    <!--    右侧栏-->
    <div class="right-area"></div>
    <!--    -->
    <audio :src="playingInfo.src" ref="audioRef" autoplay @ended="playFinish" @timeupdate="updateCurrent">
    </audio>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {timeConvert} from "@/util/dateUtil";
import {getMusicUrl} from "@/api/api_music";
import ProgressSlider from "@/components/commons/ProgressSlider.vue";

export default {
  name: 'FooterBar',
  components: {ProgressSlider},
  data() {
    return {
      hiddenCover: false, //封面和按钮切换
      // 播放模式  0循环播放，1单曲循环，2随机播放，3列表循环
      playMode: 0, //播放模式
      playModeIcons: ['icon-xunhuanbofang', 'icon-danquxunhuan1', 'icon-suijibofang1', 'icon-liebiaoshunxu'],
      progress: 0, // 播放进度  0 - 100
      
    }
  },
  computed: {
    ...mapState(['playingInfo']),
    playModeIcon() {
      return this.playModeIcons[this.playingInfo.mode]
    },
  },
  watch: {
    'playingInfo.songId'() {
      this.getMusicUrl()
      this.progress = 0
    },
    // 监听 播放暂停属性，触发播放器播放或暂停
    'playingInfo.pause'() {
      if(!this.playingInfo.src) return
      let audio = this.$refs.audioRef
      if (!audio) return
      this.$nextTick(() => {
        if (this.playingInfo.pause) {
          audio.pause()
        } else {
          audio.play().catch(e =>{
            console.log(e)
          })
        }
      })

    }
  },
  methods: {
    // 获得音乐
    async getMusicUrl() {
      if (!this.playingInfo.songId) return
      const res = await getMusicUrl(this.playingInfo.songId)
      if (res.code !== 200) return this.$message.error('播放失败')
      if (!res.data[0].url) {
        const h = this.$createElement
        this.$notify({
          title: '当前歌曲暂无音源',
          message: h(
              'i',
              {style: 'color: teal'},
              '因版权方要求，该资源暂时无法播放，我们正在争取歌曲回归'
          )
        })
        this.$store.commit('setPauseState', true)
        return
      }
      this.$store.commit('setPlayingSrc', res.data[0].url)
    },
    // 点击展开/关闭播放器界面
    targetPlayPage(val) {
      if (this.hiddenCover === val) return
      this.hiddenCover = val
    },
    timeConvert(milli) {
      return timeConvert(milli)
    },
    // 拖动进度条
    changeProgress(val) {
      let audio = this.$refs.audioRef
      if (!audio) return
      if (!this.playingInfo.songId) return
      let current = Math.floor(this.playingInfo.duration * val / 100000)
      if (this.playingInfo.current === current) return
      audio.currentTime = current
      this.$store.commit('updateCurrent', current)
    },
    // 播放器播放进度改变回调
    updateCurrent() {
      let audio = this.$refs.audioRef
      if (!audio) return
      let second = Math.floor(audio.currentTime)
      if (this.playingInfo.current === second) return
      this.$store.commit('updateCurrent', second)
      this.progress = Math.floor(second * 100000 / this.playingInfo.duration)
    },
    playFinish() {
      this.$store.commit('setPauseState', true)
    },
    // 播放、暂停切换
    playOrPause() {
      if (!this.playingInfo.songId) return
      this.playingInfo.pause = !this.playingInfo.pause
    },
  }
}
</script>

<style scoped lang="less">
.player-bar {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  //position: relative;
  padding: 0 15px;
  transition: all 0.5s;
  //overflow: hidden;

  .left-area {
    overflow: hidden;
    position: relative;
    height: 80px;
    width: 280px;
  }

  .cover-wrap {

    height: 160px;
    position: absolute;
    top: -80px;
    width: 100%;
    transition: 0.5s;

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

  .control-bar {
    width: 440px;

    .ctl-btn {
      width: 250px;
      margin: 10px auto 0;

      button {
        margin: 0 10px;

        &.pause-btn {
          height: 34px;
          width: 36px;
          border-radius: 50%;
          border: none;
        }
      }
    }

    .progress-bar {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 36px;

      span {
        line-height: 36px;
        color: #999999;
      }
    }
  }

  .right-area {
    width: 280px;
    height: 80px;
  }
}
</style>