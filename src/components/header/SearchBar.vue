<template>
  <div class="search-bar">
    <div class="search-input">
      <el-input style="width: 200px"
                placeholder="搜索"
                v-model="keywords"
                ref="searchInput"
                prefix-icon="el-icon-search"
                @input="handleInput"
                clearable
                @focus="getHotSearch"
                @blur="showInfoTip=false"
                @keyup.enter.native="toSearch">
      </el-input>
    </div>

    <transition name="el-fade-in">
      <!--          搜索栏下的弹窗-->
      <div class="search-info-tip" v-show="showInfoTip">
        <div v-show="keywords === ''">
          <!--              搜索历史-->
          <div class="search-his" v-show="searchHis.length > 0">
            <span>搜索历史</span>
            <button class="clear-btn" @click="clearHis">
              <i class="el-icon-delete"></i>
            </button>
            <div class="his-wrap">
              <button class="btn btn-wihte his-item font-12" v-for="val in searchHis" :key="val" @click="clickHot(val)">
                {{ val }}
              </button>
            </div>
          </div>
          <!--              热搜榜-->
          <div class="search-hot">
            <div class="hot-title font-12">热搜榜</div>
            <div class="hot-item pointer"
                 :class="{'top-item':(index < 3)}"
                 v-for="(item,index) in hotList"
                 :key="item.searchWord"
                 @click="clickHot(item.searchWord)"
            >
              <div class="item-index">{{ index }}</div>
              <div class="item-info">
                <div class="key-word">
                  <span>{{ item.searchWord }}</span>
                  <span>{{ item.score }}</span>
                </div>
                <div>
                  <span style="color: #999999" class="font-12">{{ item.content }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="keywords !== ''">
          <div class="search-suggest">
            <div class="search-suggest-wrap">
              <button class="no-btn">
                搜"{{ keywords }}"相关的内容
                <i class="el-icon-arrow-right"></i>
              </button>
            </div>
            <!--            单曲建议-->
            <suggest-list v-if="showMusic">
              <template #title>
                <i class="iconfont icon-yinle font-16"></i>
                <span class="mleft-10">单曲</span>
              </template>
              <template #item>
                <div v-for="song in suggestInfo.songs"
                     :key="song.id"
                     class="item pointer text-hidden"
                     @click="playMusic(song.id)">
                  {{ song.name }} - {{ song.artists[0].name }}
                </div>
              </template>
            </suggest-list>
            <!--            专辑建议-->
            <suggest-list v-if="showAlbum">
              <template #title>
                <i class="iconfont icon-zhuanji font-16"></i>
                <span class="mleft-10">专辑</span>
              </template>
              <template #item>
                <div v-for="al in suggestInfo.albums"
                     :key="al.id"
                     class="item pointer text-hidden"
                     @click="toAlbumDetail(al.id)">
                  {{ al.name }} - {{ al.artist.name }}
                </div>
              </template>
            </suggest-list>
            <suggest-list v-if="showArtist">
              <template #title>
                <i class="el-icon-user font-16">
                  <span class="mleft-10">歌手</span>
                </i>
              </template>
              <template #item>
                <div v-for="ar in suggestInfo.artists"
                     :key="ar.id"
                     class="item pointer text-hidden"
                     @click="toArtistDetail(ar.id)">
                  {{ ar.name }}
                </div>
              </template>
            </suggest-list>
            <suggest-list v-if="showPlayList">
              <template #title>
                <i class="iconfont icon-gedan font-16"></i>
                <span class="mleft-10">歌单</span>
              </template>
              <template #item>
                <div v-for="pl in suggestInfo.playlists"
                     :key="pl.id"
                     class="item pointer text-hidden"
                     @click="toPlayListDetail(pl.id)">
                  {{ pl.name }}
                </div>
              </template>
            </suggest-list>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import SuggestList from "@/components/header/SuggestList"
import {getHotSearch, getSuggest} from "@/api/api_other";

export default {
  name: 'SearchBar',
  components: {SuggestList},
  comments: {
    SuggestList
  },
  data() {
    return {
      keywords: '',
      // 搜索建议框显示隐藏空控制
      showInfoTip: false,
      searchHis: [
      ],
      hotList: [
      ],
      suggestInfo: {
      }
    }
  },
  created() {
    this.getSearchHistory()
  },
  methods: {
    inputBlur(){
      console.log("触发blur")
      this.showInfoTip = false
    },
    // 跳转到搜索页面
    toSearch() {
      console.log('to search')
      if (!this.keywords) return
      this.$refs.searchInput.blur()
      if (this.$route.path !== `/search?keywords=${this.keywords}`) {
        console.log('跳转搜索页面')
        this.$router.push(`/search?keywords=${encodeURIComponent(encodeURIComponent(this.keywords))}`)
      }
      this.setHistory(this.keywords)
    },
    // 更新搜索历史
    setHistory(keywords) {
      if (keywords) {
        if (this.searchHis.find(item => item === keywords)) {
          return
        }
        this.searchHis.unshift(keywords)
        this.searchHis = this.searchHis.slice(0, 5)
        window.localStorage.setItem('search', JSON.stringify(this.searchHis))
      }
    },
    // 搜索栏输入，获取搜索建议
    handleInput(val){
      if(this.timer){
        window.clearTimeout(this.timer)
      }
      this.timer = window.setTimeout(()=>{
        this.getSuggest(val)
      }, 500)
    },
    async getSuggest(val){
      if(!val) return
      const res = await getSuggest({keywords:val})
      if(res.code !== 200) return
      console.log('getSuggest ',res)
      this.suggestInfo = res.result
    },
    getSearchHistory() {
      let history = window.localStorage.getItem('search');
      if (!history) return
      let hisArr = JSON.parse(history)
      this.searchHis = hisArr || []
    },
    //  清除历史记录
    clearHis() {
      this.$confirm('确认清除搜索历史吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('search')
        this.searchHis.clear()
      })
    },
    async getHotSearch(){
      console.log("触发 getHotSearch")
      this.showInfoTip = true
      if(this.keywords){
        await this.getSuggest(this.keywords)
      }
      if(this.hotList.length > 0) return
      const res = await getHotSearch()
      console.log('getHotSearch res',res)
      if(res.code !== 200) return
      this.hotList = res.data
    },
    // 点击历史项或者搜索项
    clickHot(keyword) {
      console.log(keyword)
      if(keyword){
        this.keywords = keyword
        this.toSearch()
      }
    },
    //播放音乐
    playMusic(id) {

    },
    //跳转到专辑详情
    toAlbumDetail(id) {

    },
    //跳转到歌手详情
    toArtistDetail(id) {

    },
    //跳转到歌单
    toPlayListDetail(id) {

    }
  },
  computed: {
    //展示搜索建议 - 音乐
    showMusic() {
      return true
    },
    //展示搜索建议 - 专辑
    showAlbum() {
      return true
    },
    //展示搜索建议 - 歌手
    showArtist() {
      return true
    },
    //展示搜索建议 - 歌单
    showPlayList() {
      return true
    }
  }
}
</script>

<style scoped lang="less">
.search-bar {
  width: 100%;
  height: 100%;
  //border: 1px solid black;
  //position: relative;
  //display: flex;
  position: relative;

  .search-input {
    //border: 1px solid black;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-input {
    width: 100%;
    //height: 100%;
    height: 36px;
    margin: auto;
    line-height: 36px;
  }

  .search-info-tip {
    position: absolute;
    top: 80px;
    left: -70px;
    border-radius: 10px;
    border: 1px solid black;
    width: 350px;
    height: 500px;
    color: black;

    .search-his {
      margin: 10px;
      width: 100%;

      .his-wrap {
        display: flex;
        // 一行放不下则自动换行
        flex-wrap: wrap;

        button {
          float: left;
          background-color: #ffffff;
          border: 1px solid gray;
          margin-right: 10px;
        }
      }

      .clear-btn {
        border: none;
        background-color: #ffffff;
      }
    }
  }
}
</style>