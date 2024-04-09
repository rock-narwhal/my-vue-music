<script>

export default {
  name: "ProgressSlider",
  props: {
    value: { //进度条绑定进度值
      type: Number,
      require: true
    },
    size: { //进度条长度
      type: Number,
      default: 180
    },
    vertical: { //进度条水平/垂直，默认水平
      type: Boolean,
      default: false
    },
    color: { //进度条和滑块颜色
      type: String,
      default: '#ec4141'
    }
  },
  data() {
    return {
      isActive: false,
      progress: 0,
      sliderWrapperStyle: {},
      sliderRunawayStyle: {},
      sliderBarStyle: {backgroundColor: this.color},
      sliderBtnStyle: {},
    }
  },
  created() {
    if (this.vertical) {
      // 初始化样式 垂直进度条
      this.sliderWrapperStyle.height = this.size + 'px'
      this.sliderWrapperStyle.width = '36px'
      this.sliderWrapperStyle.justifyContent = 'center'

      this.sliderRunawayStyle.height = '100%'
      this.sliderRunawayStyle.width = '3px'

      this.sliderBarStyle.width = '100%'
      this.sliderBarStyle.height = this.sliderSize
      this.sliderBarStyle.position = 'absolute'
      this.sliderBarStyle.bottom = '0'

      this.sliderBtnStyle.bottom = this.sliderPosition
      this.sliderBtnStyle.left = '-17px'
    } else {
      //初始化样式，水平进度条

      this.sliderWrapperStyle.width = this.size + 'px'
      this.sliderWrapperStyle.height = '36px'
      this.sliderWrapperStyle.alignItems = 'center'

      this.sliderRunawayStyle.width = '100%'
      this.sliderRunawayStyle.height = '3px'

      this.sliderBarStyle.height = '100%'
      this.sliderBarStyle.width = this.sliderSize

      this.sliderBtnStyle.left = this.sliderPosition
      this.sliderBtnStyle.top = '-17px'
    }
  },
  watch: {
    value(val) {
      if (!this.isActive) {
        this.progress = val
      }
    },
    sliderSize(val) {
      if (this.vertical) {
        this.$refs.sliderBar.style.height = val
      } else {
        this.$refs.sliderBar.style.width = val
      }
    },
    sliderPosition(val) {
      if (this.vertical) {
        this.$refs.sliderBtn.style.bottom = val
      } else {
        this.$refs.sliderBtn.style.left = val
      }
    }
  },
  computed: {
    sliderSize() {
      return this.progress + '%'
    },
    sliderPosition() {
      return (-1800 / this.size + this.progress) + '%'
    }
  },
  methods: {
    mouseDown() {
      this.isActive = true
    },
    mouseUp() {
      this.afterChange()
      this.isActive = false
    },
    mouseMove(event) {
      this.doChangeProgress(event)
    },
    clickSlider(event) {
      this.isActive = true
      this.doChangeProgress(event)
      this.afterChange()
      this.isActive = false
    },
    doChangeProgress(event) {
      if (this.isActive) {
        let offset = 0
        if (this.vertical) {
          offset = this.size - (event.clientY - this.$refs.sliderRunaway.getBoundingClientRect().y)
        } else {
          offset = event.clientX - this.$refs.sliderRunaway.getBoundingClientRect().x
        }
        if (offset < 0) offset = 0
        if (offset > this.size) offset = this.size
        this.progress = (offset) * 100 / this.size
        this.onchangeValue(Math.ceil(this.progress))
      }
    },
    onchangeValue(val) {
      this.$emit('input', val)
    },
    // 进度条拖动/点击动作结束，通知外部改变进度
    afterChange() {
      if (this.isActive) {
        this.$emit('onChange', this.value)
      }
    }
  }
}
</script>

<template>
  <div class="slider-wrapper" ref="sliderWrapper" :style="sliderWrapperStyle">
    <div class="slider-runaway" @click="clickSlider" ref="sliderRunaway" :style="sliderRunawayStyle">
      <div class="slider-bar" ref="sliderBar" :style="sliderBarStyle"></div>
      <div class="slider-btn-wrapper" ref="sliderBtn" :style="sliderBtnStyle"
           @mousedown.stop="mouseDown"
           @mouseup.stop="mouseUp"
           @mousemove.stop="mouseMove"
           @mouseleave.stop="mouseUp"
           @click.stop="1">
        <div class="slider-button" :style="{backgroundColor: color}"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.slider-wrapper {
  position: relative;
  display: flex;
}

.slider-runaway {
  &:hover {
    height: 5px;
  }

  position: relative;
  background-color: #e0e0e0;

  .slider-bar {
  }

  .slider-btn-wrapper {
    height: 36px;
    width: 36px;
    background-color: transparent;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    .slider-button {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: none;
    }

    &:hover .slider-button {
      display: block;
    }
  }
}
</style>