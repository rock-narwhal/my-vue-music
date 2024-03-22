<template>
  <!--  歌单页面-->
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
    <div class="list-tag mtop-10 clearfix">
      <div class="tag-list-left">
        <button class="circle-btn pointer" @click="triggerCatList" @blur="showAllCats=false">
          {{ tagBtn }}
          <i class="el-icon-arrow-right"></i>
          <CatList class="tag-pop-list"
                   title="全部歌单"
                   :catList="allCats"
                   v-show="showAllCats"
                   :clickTitle="closeCatList"
                   :clickTag="changeCat"></CatList>
        </button>
      </div>

      <!--      热门标签-->
      <div class="tag-list-right">
        <button v-for="(item,index) in hotCats" :key="index" class="no-btn pointer" @click="changeCat(item.name)">
          {{ item.name }}
        </button>
      </div>
    </div>

    <!--    歌单列表-->
    <ImgList type="playlist"
             :list="playList"
             class="mtop-10"
             @clickImg="toPlaylistDetail">
      <template v-slot="{item}">
        <div class="text-hidden"></div>
        {{ item.name }}
      </template>
    </ImgList>
    <!--    分页-->
    <div class="pagination">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="pageInfo.total"
          @current-change="onPageChange"
          @prev-click="onPageChange(pageInfo.currentPage -1)"
          @next-click="onPageChange(pageInfo.currentPage -1)">
      </el-pagination>
    </div>
  </div>


</template>
<script>
import {getAllCat, getHighQuality, getHotCat, getPlayListByCat} from "@/api/api_playlist";
import CatList from "@/components/list/CatList.vue";
import ImgList from "@/components/list/ImgList.vue";

export default {
  // 首页/歌单
  name: "PlayList",
  components: {
    CatList, ImgList,
  },
  data() {
    return {
      showAllCats: false,
      isLoading: false,
      hasHighQuality: false,
      highInfo: {},
      hotCats: [], //热门标签
      allCats: [], //所有标签
      playList: [], // 歌单列表
      queryInfo: {
        limit: 50,
        order: 'hot',
        cat: '华语',
        offset: 0
      },
      pageInfo: {
        total: 0,
        currentPage: 1,
      },
      tagBtn: '华语',//当前选中的标签
    }
  },
  created() {
    this.getHostCats()
    this.getPlayList()
    this.getAllCats()
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
      console.log('PlayList: getAllCats', this.allCats)
      if (this.allCats.length > 0) return
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
      this.playList = res.playlists
      this.pageInfo.total = res.total
      this.isLoading = false
    },
    changeCat(name) {
      console.log('PlayList: changeCat', name)
      this.tagBtn = name
      this.queryInfo.cat = name
      this.closeCatList()
      this.getPlayList()
    },
    triggerCatList() {
      this.showAllCats = !this.showAllCats
    },
    closeCatList() {
      console.log('closeCatList')
      this.showAllCats = false
    },
    onPageChange(page) {
      console.log('onPageChange: ', page)
      if (page < 1 || page > this.pageInfo.total || page === this.pageInfo.currentPage) return
      this.pageInfo.currentPage = page
      this.queryInfo.offset = (page - 1) * this.queryInfo.limit
      this.getPlayList()
      //滚到到顶部
      this.$bus.$emit('scrollTop')
    },
    toPlaylistDetail(id) {
      this.$router.push('/detail/playlist?id='+id)
    }
  }
}
</script>
<style scoped lang="less">
.container {
  .banner {
    background-color: rgba(0, 0, 0, 0);
    height: 200px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;

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

  .list-tag {
    width: 100%;

    .tag-list-left {
      float: left;
      position: relative;

      .circle-btn {
        color: black;
        border: 1px solid #cbcbcb;

        &:hover {
          background-color: #f2f2f2;
        }
      }

      .tag-pop-list {
        position: absolute;
        top: 40px;
        left: -1px;
        z-index: 10;
      }
    }

    .tag-list-right {
      float: right;
    }
  }

  .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
  }
}

.el-popover .el-popper {
  padding: 0;
}
</style>