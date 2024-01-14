<template>
  <div class="container">
    <!--    精品歌单banner-->
    <div class="banner" v-if="hasHighQuality">
      <img class="img-back" :src="highInfo.coverImgUrl">
      <img class="img-front img-80" :src="highInfo.coverImgUrl">
      <div class="info-wrap">
        <div>
          <button class="circle-btn">
            <i class="iconfont icon-huiyuanhuangguanguanjun-xianxing"></i>
            精品歌单
          </button>
        </div>
        <div class="banner-title">
          <div class="font-16">{{ highInfo.name }}</div>
          <div class="copy-writer font-12">{{ highInfo.copywriter }}</div>
        </div>
      </div>
    </div>
    <!--    歌单标签-->
    <div class="list-tag m-top10">
      <!--      弹出式卡片 所有标签-->
      <!--      <el-dropdown trigger="click">-->
      <!--        <button class="circle-btn" @click="openLayer">-->
      <!--          {{tagBtn}}-->
      <!--          <i class="el-icon-arrow-right"></i>-->
      <!--        </button>-->
      <!--        <el-dropdown-menu slot="dropdown">-->
      <!--          <el-dropdown-item>全部歌单</el-dropdown-item>-->
      <!--        </el-dropdown-menu>-->
      <!--      </el-dropdown>-->
      <el-popover
          placement="bottom-start"
          width="720"
          trigger="click"
          :visible-arrow="false"
          :append-to-body="false"
          @click="getAllCats">
        <CatList
          title="全部歌单"
          :catList="allCats"
          :active="tagBtn"
        ></CatList>
        <button slot="reference" class="circle-btn" @click="getAllCats">
          {{ tagBtn }}
          <i class="el-icon-arrow-right"></i>
        </button>
      </el-popover>

      <!--      热门标签-->
    </div>

    <!--    歌单列表-->
  </div>


</template>
<script>
import {getAllCat, getHighQuality, getHotCat, getPlayListByCat} from "@/api/api_playlist";
import CatList from "@/components/list/CatList.vue";

export default {
  // 首页/歌单
  name: "PlayList",
  components: {
    CatList,
  },
  data() {
    return {
      isLoading: false,
      hasHighQuality: false,
      highInfo: {},
      hotCats: [], //热门标签
      allCats: [], //所有标签
      playList: [], // 歌单列表
      queryInfo: {
        limit: 50,
        order: 'hot',
        cat: '摇滚',
        offset: 0
      },
      pageInfo: {
        total: 0,
        currentPage: 1,
      },
      tagBtn: '摇滚',//当前选中的标签
    }
  },
  created() {
    this.getHostCats()
    this.getPlayList()
  },
  methods: {
    // 热门分类
    async getHostCats() {
      const res = await getHotCat()
      if (res.code !== 200) return
      res.tags.forEach(item => {
        item.isActive = item.name === this.tagBtn
      })
      this.hotCats = res.tags
    },
    //所有分类
    async getAllCats() {
      console.log('PlayList: getAllCats',this.allCats)
      if(this.allCats.length > 0) return
      const res = await getAllCat()
      if (res.code !== 200) return
      res.sub.forEach(item => {
        item.isActive = item.name === this.tagBtn
      })
      for (let i = 0; i < 5; i++) {
        this.allCats.push(res.sub.filter(item => item.category === i))
      }
    },
    // 获取经典歌单 banner信息
    async getHighInfo(cat) {
      console.log('PlayList: getHighInfo', cat)
      const res = await getHighQuality(1, cat)
      if (res.code !== 200) return
      this.hasHighQuality = res.playlists.length > 0
      this.highInfo = res.playlists[0] || {}
    },
    // 获得歌单列表
    async getPlayList() {
      this.isLoading = true
      await this.getHighInfo(this.queryInfo.cat)
      const res = await getPlayListByCat(this.queryInfo)
      if (res.code !== 200) return
      this.playList = res.playlist
      this.pageInfo.total = res.total
      this.isLoading = false
    },

    openLayer() {

    }
  }
}
</script>
<style scoped lang="less">
.container {
  padding: 0 100px;

  .banner {
    background-color: rgba(0, 0, 0, 0);
    height: 200px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    border: 1px solid black;

    .img-back {
      position: absolute;
      top: -400px;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      width: 100%;
      filter: blur(45px);
    }

    .img-front {
      z-index: 2;
      margin: 0 20px;
      border-radius: 6px;
    }

    .info-wrap {
      z-index: 2;
      color: white;

      .banner-title {
        margin-top: 15px;

        .copy-writer {
          color: #c7c3c3;
          margin-top: 5px;
        }
      }
    }
  }
}
.el-popover .el-popper{
  padding: 0;
}
</style>