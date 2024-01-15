<template>
<!--  排行榜页面-->
  <div class="container">
    <div class="list-title">官方榜</div>
    <TopListBanner
        @viewMore="toListDetail"
        @clickPlay="clickPlay"
        :list="officialTopList"></TopListBanner>
    <div class="list-title">全球榜</div>
    <ImgList type="playlist"
             :list="globalTopList"
             @clickPlay="clickPlay"
             @clickImg="toListDetail"
    >
      <template v-slot="{item}">
        {{item.name}}
      </template>
    </ImgList>
  </div>

</template>
<script>
import {getTopList} from "@/api/api_toplist";
import TopListBanner from "@/components/header/TopListBanner.vue";
import ImgList from "@/components/list/ImgList.vue";
import playList from "@/views/home/PlayList.vue";

export default {
  name: "TopList",
  components:{
    TopListBanner,ImgList,
  },
  data(){
    return {
      topList:[]
    }
  },
  created(){
    console.log("TopList created")
    this.getTopList()
  },
  computed:{
    playList() {
      return playList
    },
    // 官方榜单
    officialTopList(){
      console.log('officialTopList')
      if (this.topList.length > 0) {
        return this.topList.slice(0, 4)
      } else {
        return this.topList
      }
    },
    globalTopList(){
      if(this.topList.length > 0){
        return this.topList.slice(4)
      }
      return this.topList
    }
  },
  methods:{
    // 获取排行榜
    async getTopList(){
      const res = await getTopList()
      if(res.code !== 200) return
      console.log("topList: ",res.list)
      this.topList = res.list
    },
    //播放歌单
    clickPlay(id){
      console.log('TopList: clickPlay',id)
    },
    //跳转到榜单详情
    toListDetail(id){
      console.log('TopList: toListDetail',id)
    }
  }
}
</script>
<style scoped lang="less">
.container{
  padding: 0 200px;
  .list-title{
    margin: 20px 0;
    font-size: 20px;
    font-weight: bolder;
  }
}
</style>