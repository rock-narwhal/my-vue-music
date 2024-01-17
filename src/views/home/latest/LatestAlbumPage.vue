<script>
import SelectorMenu from "@/components/menu/SelectorMenu.vue";
import {getLatestAlbum} from "@/api/api_toplist";
import ImgList from "@/components/list/ImgList.vue";

export default {
  name: "LatestAlbumPage", // 新碟上架页
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SelectorMenu, ImgList,
  },
  data() {
    return {
      menus: [{name: '全部', type: 'ALL', active: true}, {name: '华语', type: 'ZH', active: false},
        {name: '欧美', type: 'EA', active: false}, {name: '日本', type: 'JP', active: false},
        {name: '韩国', type: 'KR', active: false}],
      albumList: [],
      queryParam: {
        area: 'ALL',
        type: 'hot', // new:全部 hot:热门
      }
    }
  },
  created() {
    this.getAlbum()
  },
  methods: {
    getAlbumByType(type) {
      if (this.queryParam.type === type) return
      this.queryParam.type = type
      this.getAlbum()
    },
    getAlbumByArea(area) {
      if (this.queryParam.area === area) return
      this.queryParam.area = area
      this.getAlbum()
    },
    async getAlbum() {
      const res = await getLatestAlbum(this.queryParam)
      if (res.code !== 200) return
      this.albumList = res.monthData
    }
  }
}
</script>

<template>
  <div>
    <div class="menu-bar">
      <SelectorMenu :option="menus" @clickTab="getAlbumByArea">
        <template slot="rightBtn">
          <button @click="getAlbumByType('hot')" class="no-btn" :class="{active: queryParam.type === 'hot'}">推荐</button>
          <button @click="getAlbumByType('new')" class="no-btn" :class="{active: queryParam.type === 'new'}">全部</button>
        </template>
      </SelectorMenu>
    </div>
    <ImgList :list="albumList" type="album">
      <template v-slot="{item}">
        {{ item.name }}
      </template>
    </ImgList>
  </div>

</template>

<style scoped lang="less">
.menu-bar {
  margin-top: 40px;
  margin-bottom: 20px;
  button.active{
    color: #ec4141;
  }
}
</style>