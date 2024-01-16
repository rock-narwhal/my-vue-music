<template>
  <div class="menu-wrap">
    <div v-for="(item, index) in menuList"
         :key="index"
         @click="toSub(index)"
         class="pointer menu-item"
         :class="{active: activeIndex === index}"
    >
      <div v-if="mode === 'route'">{{ item.name }}</div>
      <div v-else >{{ item }}</div>
      <div class="bot-bar"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabMenu",
  // props: ['menuList', 'mode'],
  props:{
    menuList:{
      require: true,
      type: Array
    },
    mode:{
      type: String,
      default: 'menu'
    }
  },
  data() {
    return {
      activeIndex: 0,
    }
  },
  methods: {
    //跳转
    toSub(index) {
      this.activeIndex = index
      if(this.$route.path !== this.menuList[index].path){ // 避免路由原地tp的报错
        this.$router.push(this.menuList[index].path)
      }
    }
  },
  watch: {
    '$route.path':{
      immediate: true,
      handler(val){
        if(this.mode === 'route'){
          this.activeIndex = this.menuList.findIndex(item => item.path === val)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "@/assets/less/lessConfig.less";
.menu-wrap{
  width: 100%;
  height: 60px;
  //background-color: #999999;
  padding: 0 30px;
  display: flex;
  align-items: center;
  .menu-item{
    margin-right: 20px;
    font-size: 16px;
    .bot-bar{
      width: 100%;
      height: 4px;
      background-color: @headRed;
      border-radius: 2px;
      display: none;
    }
  }
  .active{
    font-size: 20px;
    font-weight: bold;
    .bot-bar{
      display: block;
    }
  }
}
</style>