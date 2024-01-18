<template>
  <div>
    <div class="cover-img"></div>
    <audio controls>
      <source :src="playingInfo.src">
    </audio>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default{
  name:'FooterBar',
  computed:{
    ...mapState(['playingInfo'])
  }
}
</script>

<style scoped lang="less">

</style>