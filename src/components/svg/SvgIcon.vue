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
      } else if(this.className.includes('font-18')){
        return '-0.2em'
      } else {
        return '-0.15em'
      }
    }
  }
}
</script>

<template>
  <svg :class="svgClass" :style="{'vertical-align': verticalAlign}" aria-hidden="true">
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