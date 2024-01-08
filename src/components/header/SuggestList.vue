<template>
  <div class="suggest-list">
    <header class="suggest-list-header">
      <slot name="title"></slot>
    </header>
    <main class="suggest-item-main">
      <slot name="item"></slot>
    </main>
  </div>
</template>

<script>
export default {
  name: "SuggestList"
}
</script>

<style scoped>

</style>