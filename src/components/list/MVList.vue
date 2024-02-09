<script>
import {toCNNum} from "@/util/formatUtil";
import {timeConvert} from "@/util/dateUtil";

export default {
  name: "MVList",
  props: {
    list: {
      type: Array,
      required: true
    },
    infinite: {
      type: Boolean,
      default: false,
    },
    hasMore: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    disabled() {
      return !this.infinite || !this.hasMore || this.isLoading
    },
  },
  methods: {
    load() {
      if (this.hasMore) this.$emit('loadMore', this.list.length)
    },
    convert(count) {
      return toCNNum(count)
    },
    format(duration) {
      return timeConvert(duration / 1000)
    }
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list"
        :key="item.id"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
        infinite-scroll-delay="300"
        class="pointer">
      <img v-lazy="item.imgurl16v9" alt="">
      <button class="play-count">
        <svg-icon icon-class="play-one" color="white"></svg-icon>
        {{ convert(item.playCount) }}
      </button>
      <button class="duration">{{ format(item.duration) }}</button>
      <div class="album-name">{{ item.name }}</div>
    </li>
  </ul>
</template>

<style scoped lang="less">
ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  li {
    width: 19%;
    position: relative;
    margin-bottom: 30px;

    img {
      border-radius: 5px;
    }

    button {
      border: none;
      background: transparent;
      color: white;
    }

    .play-count {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .duration {
      position: absolute;
      bottom: 35px;
      right: 10px;
    }

    .album-name {
      height: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>