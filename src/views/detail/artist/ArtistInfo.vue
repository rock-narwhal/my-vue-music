<script>
import {artistInfo} from "@/api/api_artist";

export default {
  name: "ArtistInfo",
  data(){
    return{
      queryInfo:{
        id: '',
      },
      artistInfo:{
        briefDesc:'',
        introduction:[]
      }
    }
  },
  created() {
    this.queryInfo.id = this.$route.query.id || ''
    if(this.queryInfo.id){
      this.queryArtistInfo()
    }
  },
  methods:{
    async queryArtistInfo(){
      const res = await artistInfo(this.queryInfo.id)
      if(res.code !== 200) return
      this.artistInfo.briefDesc = res.briefDesc
      this.artistInfo.introduction = res.introduction
      this.artistInfo.introduction = this.artistInfo.introduction.map(item => {
        let text = item.txt
        let arr = text.split('\n').map(part => {
          return `<p class="content">${part}</p>`
        })
        return {ti: item.ti, txt: arr.join('')}
      })
    },
  },
  computed:{
    infoContent(){
      let text = ''
      text += '<p class="title">简介</p>'
      this.artistInfo.briefDesc.split('\n').forEach(part => {text += `<p class="content">${part}</p>`})
      this.artistInfo.introduction.forEach(intro => {
        text += `<p class="title">${intro.ti}</p>`
        intro.txt.split('\n').forEach(p =>{
          text += `<p class="content">${p}</p>`
        })
      })
      return text
    }
  }
}
</script>

<template>
<div class="info-wrap" v-html="infoContent">
<!--  <p class="title">简介</p>-->
<!--  <p class="content">{{artistInfo.briefDesc}}</p>-->
<!--  <div v-for="item in artistInfo.introduction">-->
<!--    <p class="title">{{item.ti}}</p>-->
<!--    <p v-html="item.txt"></p>-->
<!--  </div>-->
</div>
</template>

<style scoped lang="less">
.info-wrap{
  padding: 0 30px;
  /deep/ .title{
    margin-top: 30px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
  }
  /deep/ .content{
    text-indent: 2em;
    line-height: 200%;
    white-space: pre-wrap;
  }
}
</style>