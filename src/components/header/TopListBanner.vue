<template>
  <div class="top-banner">
    <div class="banner-item" v-for="(topItem,index) in list" :key="topItem.id">
      <div class="cover pointer">
        <img :src="topItem.coverImgUrl + '?param=300y300'">
        <div class="play-btn pointer" @click.stop="clickPlay(topItem.id)">
          <i class="iconfont font-18 icon-bofang"></i>
        </div>
      </div>
      <ul class="right-list">
        <li v-for="(subItem,subIndex) in detailList[index]" :key="subItem.id">
          <div :class="{hot : subIndex < 3}">{{ subIndex + 1 }}</div>
          <div>{{ subItem.name }}</div>
          <div class="sub-right">{{ subItem.ar[0].name }}</div>
        </li>
        <li class="no-btn" @click="viewMore(topItem.id)">
          查看全部 <i class="el-icon-arrow-right"></i>
        </li>
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
      this.$emit('clickPlay',id)
    },
    viewMore(id){
      this.$emit('viewMore',id)
    },
    async getDetailList(id) {
      const res = await getPlayListDetail(id)
      if (res.code !== 200) return []
      this.detailList.push(res.playlist.tracks.splice(0, 5))
    }
  },
  watch:{
    list(){ //等this.list的数据刷新后再获取detailList的数据
      this.detailList = []
      this.list.forEach((item) =>{
        this.getDetailList(item.id)
      })
    }
  },
  created() {
    this.list.forEach((item) => {
      this.getDetailList(item.id)
    })
  },
  mounted() {
    //子组件mounted比父组件早，
  }
}
</script>
<style scoped lang="less">
.top-banner {
  width: 100%;

  .banner-item {
    display: flex;
    margin-bottom: 30px;
    .cover {
      width: 190px;
      height: 190px;
      position: relative;

      img{
        width: 100%;
        height: auto;
        border-radius: 8px;
      }

      .play-btn {
        position: absolute;
        height: 40px;
        width: 40px;
        text-align: center;
        line-height: 40px;
        top: 60px;
        left: 60px;
        background-color: white;
        border-radius: 50%;
        color: #ec4141;
        display: none;
      }

      &:hover .play-btn {
        display: block;
      }
    }
    .right-list{
      width: 100%;
      margin-left: 30px;
      display: flex;
      flex-direction: column;
      li{
        height: 32px;
        width: 100%;
        line-height: 32px;
        border-radius: 3px;
        .hot{
          color: #ec4141;
        }
        &:nth-child(odd){
          background-color: #eeeeee;
        }
        &:hover{
          background-color: #dadada;
        }
        div{
          margin-left: 10px;
          float: left;
        }
        div.sub-right{
          float: right;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>