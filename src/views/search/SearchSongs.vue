<script>
export default {
  name: "SearchSongs",
  props:["keywords"],
  created() {
    console.log('SearchSong created ',this.$route.query)
  }
}
</script>

<template>
<div>
  搜索 单曲页面  {{$route.query}}
</div>
</template>

<style scoped lang="less">

</style>