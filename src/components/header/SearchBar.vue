<template>
  <div class="search-bar">
    <div class="search-input">
      <el-input style="width: 200px" placeholder="搜索" v-model="keywords" ref="searchInput"
                prefix-icon="el-icon-search">
      </el-input>
    </div>

    <transition name="el-fade-in" v-show="true">
      <!--          搜索栏下的弹窗-->
      <div class="search-info-tip">
        <div v-show="false">
          <!--              搜索历史-->
          <div class="search-his">
            <span>搜索历史</span>
            <button class="clear-btn" @click="clearHis">
              <i class="el-icon-delete"></i>
            </button>
            <div class="his-wrap">
              <button class="btn btn-wihte his-item font-12" v-for="val in searchHis" :key="val" @click="clickHis(val)">
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
        <div v-show="true">
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
                  {{ song.name }} - {{ song.artist[0].name }}
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

export default {
  name: 'SearchBar',
  components: {SuggestList},
  comments: {
    SuggestList
  },
  data() {
    return {
      keywords: '',
      searchHis: [
        'in the end',
        'outside',
        'i just want run',
        'go back',
        'hello'
      ],
      hotList: [
        {
          alg: "alg_search_rec_hotquery_base_hotquery",
          content: "",
          iconType: 4,
          iconUrl: "https://p1.music.126.net/IBKnY_RCYTUAALcqWhAT6g==/109951163967994693.png",
          score: 75536,
          searchWord: "安和桥",
          source: 0,
          url: "",
        },
      ],
      suggestInfo: {
        songs: [{
          id: 'fu4hq23rftgqer',
          name: 'song',
          artist: [
            {
              name: "tom"
            }
          ]
        }],
        albums: [
          {
            id: 'fafa',
            name: 'album',
            artist: {
              name: 'tom'
            }
          }
        ],
        artists: [
          {
            id: 'xxx',
            name: 'tom'
          }
        ],
        playlists: [
          {
            id: '123',
            name: 'name'
          }
        ]
      }
    }
  },
  methods: {
    //  清楚历史记录
    clearHis() {
      this.searchHis = this.searchHis.slice(0, this.searchHis.length)
    },

    //点击搜索历史项
    clickHis() {

    },
    clickHot(keyword) {
      console.log(keyword)
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
    toPlayListDetail(id){

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