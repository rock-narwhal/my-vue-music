<script>
// import 'src/assets/icons'
export default {
  name: "SvgIcon",
  props:{
    iconClass:{
      type:String,
      require:false,
    },
    className:{
      type:String,
      default:'',
    },
    color:{
      type: String,
      default: 'currentColor'
    }
  },
  computed:{
    iconName(){
      return `#icon-${this.iconClass}`
    },
    svgClass(){
      if(this.className){
        return 'svg-icon ' + this.className
      }else{
        return 'svg-icon'
      }
    }
  }
}
</script>

<template>
  <svg :class="svgClass" :style="{fill: color}" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<style scoped lang="less">
.svg-icon{
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  //fill: currentColor;
  overflow: hidden;
}
</style>