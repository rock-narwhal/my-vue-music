<script>
import MusicList from "@/components/list/MusicList.vue";

export default {
  name: "AlbumMusicList",
  components:{
    MusicList,
  },
  data(){
    return {
      musicList:[
          {id:'234239',name:'in the end',ar:[{name:'linkPark'}],al:{name:'In The End'},dt:100000}
      ],
      titles:[
        {val:'',width: '10%'},
        {val:'音乐标题',width:'40%'},
        {val:'歌手',width:'20%'},
        {val:'专辑',width:'20%'},
        {val:'时长',width:'10%'}
      ]
    }
  },
  created() {

  }
}
</script>

<template>
<MusicList :titles="titles" :data-list="musicList"></MusicList>
</template>

<style scoped lang="less">

</style>