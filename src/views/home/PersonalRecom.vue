<template>
<!--  个性推荐页面-->
  <div class="container">
    <div class="swiper-wrap">
      <el-carousel :interval="4000" type="card" :height="bannerHeight + 'px'">
        <el-carousel-item
            v-for="item in imgList"
            :key="item.imageUrl"
        >
          <img class="img img-h swiper-img"
               :src="item.imageUrl"
               @click="clickImage(item)"
          >
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="play-list">
      <h2 class="font-20 font-bold pointer" @click="toPlayList">
        热门推荐 <i class="iconfont icon-arrow-right"></i>
      </h2>
      <ImgList type="playlist"
               @clickPlay="playRecSong"
               @clickImg="toPlayListDetail"
               :list="recSongList">
        <template v-slot="{item}">
          <div class="text-hidden"></div>
          {{ item.name }}
        </template>
      </ImgList>
    </div>
    <div class="play-list">
      <h2 class="font-20 font-bold pointer" @click="toPlayList">
        推荐歌单 <i class="iconfont icon-arrow-right"></i>
      </h2>
      <ImgList type="playlist"
               @clickPlay="playRecommend"
               @clickImg="toPlayListDetail"
               :list="recommendList">
        <template v-slot="{item}">
          <div class="text-hidden"></div>
          {{ item.name }}
        </template>
      </ImgList>
    </div>
  </div>
</template>

<script>
import {getBanner} from "@/api/api_other";
import {mapState} from "vuex";
import ImgList from '@/components/list/ImgList'
import {getPersonalized, getRecommend} from "@/api/api_playlist";

export default {
  name: "PersonalRecom",
  components: {
    ImgList,
  },
  data() {
    return {
      imgList: [],
      recSongList: [],
      recommendList: [],
      bannerHeight: 200
    }
  },
  created() {
    this.getImgList()
    this.getRecSongList(10)
    this.getRecommendList()
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    async getRecommendList() {
      // if(!this.isLogin) return
      const res = await getRecommend()
      if (res.code !== 200) return
      this.recommendList.push(...res.recommend)
      // res.recommend.forEach(item => {
      //   this.recommendList.push(item)
      // })
    },
    async getRecSongList(limit) {
      // if(this.isLogin) return
      const res = await getPersonalized(limit)
      if (res.code !== 200) return
      this.recSongList = res.result
    },
    // 轮播图
    async getImgList() {
      const res = await getBanner()
      if (res.code !== 200) return
      this.imgList = Object.freeze(res.banners)
    },
    //点击轮播图
    clickImage(item) {
    },
    // 跳转到首页/歌单
    toPlayList() {
      // /homePage/playlist
      this.$router.push('/homePage/playlist')
    },
    //跳转到播放列表详情
    toPlayListDetail(id) {
      this.$router.push(`/detail/playlist?id=${id}`)
    },
    // 播放选中的专辑/歌单
    playRecommend(id) {
      // const list =
      const rec = this.recommendList.filter(item => item.id === id)
    },
    // 播放歌单中的歌曲
    playRecSong(id) {
      const rec = this.recSongList.filter(item => item.id === id)
    }
  }
}
</script>

<style scoped lang="less">
.container {
  .swiper-img {
    border-radius: 10px;
  }

  .play-list {
    h2 {
      margin-bottom: 10px;
    }
  }
}
</style>