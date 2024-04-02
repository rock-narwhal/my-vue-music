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
    }
  },
  mounted() {
    if (this.vertical) {
      // 初始化样式 垂直进度条
      this.$refs.sliderWrapper.style.height = this.size + 'px'
      this.$refs.sliderWrapper.style.width = '36px'
      this.$refs.sliderWrapper.style.justifyContent = 'center'

      this.$refs.sliderRunaway.style.height = '100%'
      this.$refs.sliderRunaway.style.width = '3px'
      this.$refs.sliderBar.style.width = '100%'
      this.$refs.sliderBar.style.height = this.sliderSize
      this.$refs.sliderBar.style.position = 'absolute'
      this.$refs.sliderBar.style.bottom = '0'
      this.$refs.sliderBtn.style.bottom = this.sliderPosition
      this.$refs.sliderBtn.style.left = '-17px'

    } else {
      //初始化样式，水平进度条
      this.$refs.sliderWrapper.style.width = this.size + 'px'
      this.$refs.sliderWrapper.style.height = '36px'
      this.$refs.sliderWrapper.style.alignItems = 'center'

      this.$refs.sliderRunaway.style.width = '100%'
      this.$refs.sliderRunaway.style.height = '3px'
      this.$refs.sliderBar.style.height = '100%'
      this.$refs.sliderBar.style.width = this.sliderSize
      this.$refs.sliderBtn.style.left = this.sliderPosition
      this.$refs.sliderBtn.style.top = '-17px'
    }
  },
  watch: {
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
      return this.value + '%'
    },
    sliderPosition() {
      return (-1800 / this.size + this.value) + '%'
    }
  },
  methods: {
    mouseDown() {
      this.isActive = true
    },
    mouseUp() {
      this.isActive = false
      this.afterChange()
    },
    mouseMove(event) {
      this.doChangeProgress(event)
    },
    clickSlider(event) {
      this.isActive = true
      this.doChangeProgress(event)
      this.isActive = false
      this.afterChange()
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
        let p = (offset) * 100 / this.size
        this.onchangeValue(p)
      }
    },
    onchangeValue(val) {
      this.$emit('input', val)
    },
    // 进度条拖动/点击动作结束，通知外部改变进度
    afterChange() {
      this.$emit('onChange', this.value)
    }
  }
}
</script>

<template>
  <div class="slider-wrapper" ref="sliderWrapper">
    <div class="slider-runaway" @click="clickSlider" ref="sliderRunaway">
      <div class="slider-bar" ref="sliderBar" :style="{backgroundColor: color}"></div>
      <div class="slider-btn-wrapper" ref="sliderBtn"
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