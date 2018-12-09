<template>
  <div class="theme-track--content-wrapper" :class="customClass">
    <slot />
  </div>
</template>

<style lang="stylus">
  {$theme}
    &content-wrapper
      padding 0 px2rem(90px)
      min-height calc(100vh - 240px)
      &.no-min-height
        min-height auto
  @media (max-width: $MQNarrow)
    {$theme}
      &content-wrapper
        padding 0 px2rem(30px)
</style>

<script>
  export default {
    props: ['customClass']
  }
</script>