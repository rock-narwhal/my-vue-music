<template>
  <div id="app">
    <transition name = 'el-fade-in'>
        <router-view />
    </transition>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  min-width: 680px;
}
</style>
