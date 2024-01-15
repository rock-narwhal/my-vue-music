<template>
<!--  排行榜页面-->
  <div class="container">
    <TopListBanner :list="officialTopList"></TopListBanner>
  </div>

</template>
<script>
import {getTopList} from "@/api/api_toplist";
import TopListBanner from "@/components/header/TopListBanner.vue";

export default {
  name: "TopList",
  components:{
    TopListBanner,
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
    // 官方榜单
    officialTopList(){
      if (this.topList.length > 0) {
        return this.topList.splice(0, 4)
      } else {
        return this.topList
      }
    },
    globalTopList(){
      if(this.topList.length > 0){
        return this.topList.splice(4)
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
    }
  }
}
</script>
<style scoped lang="less">

</style>