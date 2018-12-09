<template>
  <div class="theme-track--header-github">
    <a :href="url" target="_blank">
      <i class="iconfont icon-github"></i>
    </a>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String
      }
    },
    computed: {
      url () {
        return `//github.com/${this.name}`
      }
    }
  }
</script>

<style lang="stylus">
  {$theme}
    &header-github
      margin (($navbarHeight - px2rem(30px)) / 2) px2rem(40px) 0 px2rem(20px)
      height px2rem(30px)
      line-height px2rem(30px)
      width: px2rem(16px)
      > a
        color $textColor
        &:hover
          color $accentColor
      .iconfont
        margin-top -1px
        position absolute
  @media (max-width: $MQNarrow)
    {$theme}
      &header-github
        margin (($navbarHeight - px2rem(30px)) / 2) px2rem(20px) 0 px2rem(20px)
</style>