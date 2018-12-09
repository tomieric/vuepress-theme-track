<template>
  <div class="nav-button" :class="{ active }" @click="$emit('toggle-nav')">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512">
      <path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z" class=""></path>
    </svg>
  </div>
</template>

<script>
  export default {
    props: ['active']
  }
</script>

<style lang="stylus">
.nav-button
  display none
  width 1.25rem
  height 1.25rem
  position absolute
  padding 0.6rem
  top 0.75rem // ($navbarHeight - width - padding * 2) / 2
  left 1rem 
  z-index 30
  &.active
    color $accentColor
  .icon
    display block
    width 1.25rem
    height 1.25rem

@media (max-width: $MQNarrow)
  .nav-button
    display block
</style>