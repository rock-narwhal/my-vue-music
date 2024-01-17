<script>
import SelectorMenu from "@/components/menu/SelectorMenu.vue";

export default {
  name: "LatestAlbumPage", // 新碟上架页
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SelectorMenu,
  },
  data() {
    return {
      menus: [{name: '全部', type: 0, active: true}, {name: '华语', type: 7, active: false},
        {name: '欧美', type: 96, active: false}, {name: '日本', type: 8, active: false},
        {name: '韩国', type: 16, active: false}]
    }
  },
  methods:{
    switchList(){

    }
  }
}
</script>

<template>
  <div class="menu-bar">
    <SelectorMenu :option="menus">
      <template slot="rightBtn">
        <button @click="switchList" class="no-btn">推荐</button>
        <button @click="switchList" class="no-btn">全部</button>
      </template>
    </SelectorMenu>
  </div>
</template>

<style scoped lang="less">
.menu-bar{
  margin-top: 40px;
  margin-bottom: 20px;
}
</style>