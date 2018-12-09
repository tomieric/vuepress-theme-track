<template>
  <header class="theme-track--header">
    <div class="theme-track--navbar" ref="navbar">
      <Brand :logo="logo" />
      <NavLinks />
      <Github :name="github" v-if="github" />
      <SearchBox />
    </div>
  </header>
</template>

<script>
  export default {
    props: ['logo'],
    computed: {
      github () {
        return this.$site.themeConfig.github
      }
    }
  }
</script>

<style lang="stylus">
  {$theme}
    &header
      color $textColor
      height $navbarHeight
    &navbar
      position fixed
      top 0
      left 0
      right 0
      z-index 100
      display flex
      padding 0 px2rem(90px)
      height $navbarHeight
      background #fff
      border-bottom 1px solid $borderColor
  @media (max-width: $MQNarrow)
    {$theme}
      &navbar
        padding 0 px2rem(30px) 0 px2rem(70px)
</style>