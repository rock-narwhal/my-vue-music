<script>
export default {
  name: "SearchListItem",
  props: {
    list: {
      require: true,
      type: Array
    },
    mode: {
      default: 'ar', // ar 歌手  al 专辑  pl 歌单   dj 播客   vo  声音
    },
    hasMore: {
      type: Boolean,
      default: false
    },
    infinite: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    coverWidth: {
      default: 50,// 左侧封面加名称
      type: Number
    }
  },
  computed: {
    //无限加载
    disabled() {
      return !this.infinite || !this.hasMore || this.isLoading
    }
  },
  methods: {
    load(){
      if(this.hasMore) this.$emit('loadMore', this.list.length)
    },
    clickItem(id) {
      this.$emit('clickItem', id)
    },
    getCoverImg(item) {
      let url = ''
      switch (this.mode) {
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
    },
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list"
        :key="item.id"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
        infinite-scroll-delay="300"
    >
      <div @click="clickItem(item.id)" class="clearfix container">
        <div class="img-wrap float-item" :style="{'width': `${coverWidth}%`}">
          <img v-lazy="getCoverImg(item)" alt="">
          {{ item.name }}
        </div>
        <div class="float-item clearfix" :style="{'width': `${100 - coverWidth}%`}">
          <slot v-bind:scope="item"></slot>
        </div>
      </div>
    </li>
  </ul>


</template>

<style scoped lang="less">
ul {
  li {
    padding: 0 30px;
    &:nth-child(odd) {
      background-color: #f3f3f3;
    }
  }
}

.container {
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;

  .img-wrap {
    height: 60px;
    line-height: 60px;

    img {
      height: 60px;
      margin-right: 10px;
      vertical-align: middle;
      border-radius: 5px;
    }
  }

  .float-item {
    float: left;
  }
}
</style>