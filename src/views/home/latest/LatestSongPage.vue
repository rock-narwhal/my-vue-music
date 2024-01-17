<script>
import SelectorMenu from "@/components/menu/SelectorMenu.vue";
import {getLatestByType} from "@/api/api_toplist";
import {mapState} from "vuex";

export default {
  name: "LatestSongPage", // 新歌速递页
  components: {
    SelectorMenu,
  },
  data() {
    return {
      menus: [{name: '全部', type: 0, active: false}, {name: '华语', type: 7, active: false},
        {name: '欧美', type: 96, active: false}, {name: '日本', type: 8, active: false},
        {name: '韩国', type: 16, active: false}],
      songList: []
    }
  },
  created() {
    this.getLatestByType(0)
  },
  computed: {
    ...mapState(['playingInfo']),
    activeType() {
      return this.menus.find(item => item.active)
    }
  },
  methods: {
    async getLatestByType(type) {
      if (this.activeType === type && this.songList.length === 0) return
      this.menus.forEach(item => item.active = item.type === type)
      const res = await getLatestByType(type)
      if (res.code !== 200) return
      this.songList = res.data
    },
    playAll() {

    },
    // 收藏全部
    collectAll() {

    },
    timeConvert(milliscend) {
      let min = Math.floor(milliscend / 60000)
      let sec = Math.floor((milliscend / 1000) % 60)
      if (min < 10) {
        min = String(min).padStart(2, '0')
      }
      if (sec < 10) {
        sec = String(sec).padStart(2, '0')
      }
      return min + ':' + sec
    }
  }
}
</script>

<template>
  <div>
    <div class="menu-bar">
      <SelectorMenu :option="menus" @clickTab="getLatestByType">
        <template slot="rightBtn">
          <button @click="playAll" class="no-btn menu-btn play-btn">播放全部</button>
          <button @click="collectAll" class="no-btn menu-btn">收藏全部</button>
        </template>
      </SelectorMenu>
    </div>
    <ul>
      <li v-for="(item,index) in songList" :key="item.id">
        <div class="play-icon float-left">
          <span v-if="playingInfo.id !== item.id">{{ String(index + 1).padStart(2, '0') }}</span>
          <i v-else-if="playingInfo.pause" class="iconfont icon-shengyinguanbi"></i>
          <i v-else class="iconfont icon-shengyin"></i>
        </div>
        <div class="cover float-left">
          <img :src="item.album.picUrl + '?param=100y100'" alt="">
          <div class="play-btn pointer" @click.stop="clickPlay(item.id)">
            <i class="iconfont font-16 icon-bofang"></i>
          </div>
        </div>
        <div class="name float-left">
          <span>{{ item.name }}</span>
          <!--          <i class="iconfont icon-"></i>-->
        </div>
        <div class="artist float-left">{{ item.artists[0].name }}</div>
        <div class="album float-left">{{ item.album.name }}</div>
        <div class="time-minute float-left">{{ timeConvert(item.duration) }}</div>
      </li>
    </ul>
  </div>

</template>

<style scoped lang="less">
.menu-bar {
  margin-top: 40px;
  margin-bottom: 20px;

  .menu-btn {
    margin-left: 10px;
    height: 24px;
    width: 90px;
    line-height: 24px;
    border-radius: 12px;
    border: 1px solid #c2c2c2;
  }

  .play-btn {
    background-color: #ff3333;
    border: none;
    color: white;
  }
}

ul {
  width: 100%;

  li {
    height: 80px;
    line-height: 80px;
    vertical-align: center;
    width: 100%;
    padding: 0 40px;
    border-radius: 3px;

    &:nth-child(odd) {
      background-color: #f3f3f3;
    }

    .float-left {
      float: left;
      //border-left: 1px solid black;
    }

    .play-icon {
      width: 3%;
    }

    .cover {
      width: 7%;
      position: relative;
      height: 80px;
      display: flex;
      align-items: center;

      img {
        width: 60px;
        height: auto;
        border-radius: 5px;
      }

      .play-btn {
        width: 20px;
        height: 20px;
        background-color: white;
        color: #ec4141;
        font-size: 8px;
        border-radius: 50%;
        text-align: center;
        line-height: 20px;
        position: absolute;
        top: 30px;
        left: 20px;
      }
    }

    .name {
      width: 50%;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .artist {
      width: 16%;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .album {
      width: 20%;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .time-minute {
      width: 4%;
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>