<script>

export default {
  name: "ProgressSlider",
  props: {
    value: {
      type: Number,
      require: true
    },
    width: {
      type: Number,
      default: 360
    },
    vertical: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#ec4141'
    }
  },
  data() {
    return {
      isActive: false,
      originX: 0,
      originY: 0,
      initX: 0,
      initY: 0,
    }
  },
  computed: {
    sliderWidth() {
      return this.value + '%'
    },
    sliderPosition() {
      return (-1800 / this.width + this.value) + '%'
    }
  },
  methods: {
    mouseDown(event) {
      this.isActive = true
      this.originX = event.clientX
      this.originY = event.clientY
      this.initX = this.$refs.sliderBtn.offsetLeft
      this.initY = this.$refs.sliderBtn.offsetTop
    },
    mouseUp() {
      this.isActive = false
    },
    mouseMove(event) {
      if (this.isActive) {
        let deltaX = event.clientX - this.originX
        let left = this.initX + deltaX
        if (left < -18) left = -18
        if (left > this.width - 18) left = this.width - 18
        let p = (left + 18) * 100 / this.width
        this.onchangeValue(p)
      }
    },
    onchangeValue(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<template>
  <div class="slider-wrapper" :style="{width: width + 'px'}">
    <div class="slider-runaway">
      <div class="slider-bar" :style="{backgroundColor: color, width: sliderWidth}"></div>
      <div class="slider-btn-wrapper" ref="sliderBtn" :style="{left: sliderPosition}"
           @mousedown.stop="mouseDown"
           @mouseup.stop="mouseUp"
           @mousemove.stop="mouseMove"
           @mouseleave.stop="mouseUp">
        <div class="slider-button" :style="{backgroundColor: color}"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.slider-wrapper {
  margin-left: 30px;
  margin-top: 30px;
  height: 36px;
  position: relative;
}

.slider-runaway {
  width: 100%;
  height: 3px;
  background-color: #e0e0e0;
  position: absolute;
  top: 16px;

  .slider-bar {
    height: 100%;
    position: absolute;
  }

  .slider-btn-wrapper {
    height: 36px;
    width: 36px;
    background-color: transparent;
    position: absolute;
    top: -16px;
    left: -18px;
    display: flex;
    justify-content: center;
    align-items: center;

    .slider-button {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    &:hover .slider-button {
      width: 10px;
      height: 10px;
    }
  }
}
</style>