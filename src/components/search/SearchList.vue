<script>
export default {
  name: "SearchListItem",
  props:{
    list:{
      require: true,
      type: Object
    },
    mode:{
      default: 'ar', // ar 歌手  al 专辑  pl 歌单   dj 播客   vo  声音
    },
    coverWidth:{
      default: 50,// 左侧封面加名称
      type: Number
    }
  },
  computed:{
  },
  methods:{
    clickItem(){
      this.$emit('clickItem',this.dataItem.id)
    },
    getCoverImg(item){
      let url = ''
      switch (this.mode){
        case 'ar':
          url = item.picUrl
          break
        case 'al':
          url = item.picUrl
          break
        case 'pl':
          url = item.coverImgUrl
          break
      }
      return url + '?param=100y100'
    }
  }
}
</script>

<template>
  <ul v-show="!isLoading">
  <li v-for="item in list" :key="item.id">
    <div @click="clickItem" class="clearfix container">
      <div class="img-wrap float-item" :style="{'width': `${coverWidth}%`}">
        <img v-lazy="getCoverImg(item)" alt="">
        {{item.name}}
      </div>
      <div class="float-item clearfix" :style="{'width': `${100 - coverWidth}%`}">
        <slot v-bind:scope="item"></slot>
      </div>
    </div>
  </li>
</ul>


</template>

<style scoped lang="less">
ul{
  li{
    &:nth-child(odd){
      background-color: #f3f3f3;
    }
  }
}
.container{
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  .img-wrap{
    height: 60px;
    line-height: 60px;
    img{
      height: 60px;
      margin-right: 10px;
      vertical-align: middle;
      border-radius: 5px;
    }
  }
  .float-item{
    float: left;
  }
}
</style>