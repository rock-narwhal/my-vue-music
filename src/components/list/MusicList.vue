<script>
import {timeConvert} from "@/util/dateUtil";

export default {
  name: "MusicList",
  props: {
    titles: {
      type: Array,
      require: true
    },
    dataList: {
      type: Array,
      require: true
    }
  },
  methods: {
    convert(milli) {
      return timeConvert(milli / 1000)
    },
    dbClick(id) {
      this.$emit('dbClick', id)
    }
  }
}
</script>

<template>
  <div class="music-list-wrapper">
    <ul class="title-bar flex-box">
      <li v-for="item in titles" :key="item.val" :style="{width:item.width}">
        {{ item.val }}
      </li>
    </ul>
    <ul class="music-list flex-box" v-for="(item,index) in dataList" :key="item.id" @dblclick="dbClick(item.id)">
      <li :style="{width:titles[0].width}">
        <span>
          {{ index < 9 ? '0' + (index+1) : (index+1) }}
        </span>
        <button class="pointer"><svg-icon icon-class="like"></svg-icon></button>
        <button class="pointer"><svg-icon icon-class="download-one"></svg-icon></button>
      </li>
      <li :style="{width:titles[1].width}">{{ item.name }}</li>
      <li :style="{width:titles[2].width}">{{ item.ar[0].name }}</li>
      <li :style="{width:titles[3].width}">{{ item.al.name }}</li>
      <li :style="{width:titles[4].width}">{{ convert(item.dt) }}</li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.flex-box {
  display: flex;
}

ul {
  width: 100%;
  height: 36px;

  li {
    //vertical-align: middle;
    line-height: 36px;
    button{
      background-color: transparent;
      border: none;
      font-size: 16px;
    }
  }
}

.music-list:nth-child(even) {
  background: #eeeeee;
}
</style>