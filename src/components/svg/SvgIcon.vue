<script>
// import 'src/assets/icons'
export default {
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      require: false,
    },
    className: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#333'
    },
    fillColor: {
      type: String,
      default: 'none'
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    verticalAlign() {
      if (this.className.includes('font-20')) {
        return '-0.25em'
      } else {
        return '-0.15em'
      }
    }
  }
}
</script>

<template>
  <svg :class="svgClass" :style="{fill: fillColor,stroke: color, 'vertical-align': verticalAlign}" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<style scoped lang="less">
.svg-icon {
  width: 1em;
  height: 1em;
  //vertical-align: -0.25em;
  line-height: 30px;
  //fill: currentColor;
  overflow: hidden;
}
</style>