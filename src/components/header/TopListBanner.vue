<template>
  <div class="top-banner">
    <div class="banner-item" v-for="(topItem,index) in list" :key="topItem.id">
      <div class="cover pointer">
        <img :src="topItem.coverImgUrl + '?param=300y300'">
        <div class="play-btn pointer" @click.stop="clickPlay(topItem.id)">
          <i class="iconfont font-16 icon-bofang"></i>
        </div>
      </div>
      <ul class="right-list">
        <li v-for="(subItem,subIndex) in detailList[index]" :key="subItem.id">
          <span>{{ subIndex + 1 }}</span>
          <span>{{ subItem.name }}</span>
          <span>{{ subItem.ar[0].name }}</span>
        </li>
        <button class="no-btn">
          查看全部 <i class="el-icon-arrow-right"></i>
        </button>
      </ul>
    </div>
  </div>
</template>
<script>
import {getPlayListDetail} from "@/api/api_playlist";

export default {
  name: "TopListBanner",
  props: {
    list: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      detailList: []
    }
  },
  methods: {
    clickPlay(id) {
      console.log('TopListBanner :clickPlay', id)
    },
    async getDetailList(id) {
      console.log('TopListBanner: loadDetailList',id)
      const res = await getPlayListDetail(id)
      if (res.code !== 200) return []
      this.detailList.push(res.playlist.tracks.splice(0, 5))
    }
  },
  watch:{
    list(){
      console.log("watch list",this.list)
      this.detailList = []
      this.list.forEach((item) =>{
        this.getDetailList(item.id)
      })
    }
  },
  mounted() {
    //子组件mounted比父组件早，
  }
}
</script>
<style scoped lang="less">
.top-banner{
  width: 100%;
  padding: 0 200px;
  .banner-item{
    display: flex;
    .cover{
      width: 15%;
      position: relative;
    }
  }
}
</style>