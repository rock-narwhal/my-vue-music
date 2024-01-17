<template>
  <div class="menu-wrap">
    <div v-for="(item, index) in menuList"
         :key="index"
         @click="toSub(index)"
         class="pointer menu-item"
         :class="{active: $route.path.startsWith(item.path)}"
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
  methods: {
    //跳转
    toSub(index) {
      if(this.$route.path !== this.menuList[index].path){ // 避免路由原地tp的报错
        this.$router.push(this.menuList[index].path)
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