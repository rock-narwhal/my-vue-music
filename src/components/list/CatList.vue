<template>
  <div class="cat-container">
    <div class="header-title">{{title}}</div>
    <div class="cat-group" v-for="(catGroup,index) in catList" :key="index">
      <div class="group-title">
        <i class="iconfont" :class="configs[index].icon"></i>
        <span>{{configs[index].title}}</span>
      </div>
      <div class="cat-list">
        <div v-for="item in catGroup" :key="item.name">
          <div :class="{active : item.isActive}">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CatList",
  props:['title','catList','active'],
  data(){
    return {
      configs:[
        {
          title:'语种',
          icon: 'icon-diqiuquanqiu'
        },
        {
          title:'风格',
          icon: 'icon-fengge'
        },
        {
          title:'场景',
          icon: 'icon-xiazai47'
        },
        {
          title:'情感',
          icon: 'icon-smiling'
        },
        {
          title:'主题',
          icon: 'icon-zhuti'
        },
      ]
    }
  }
}
</script>

<style scoped lang="less">
.cat-container{
  width: 100%;
  height: 650px;
  .header-title{
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding-left: 10px;
    border-bottom: 1px solid black;
  }
  .cat-group{
    display: flex;
    flex-wrap: wrap;

    .cat-list{
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>