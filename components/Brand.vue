<template>
  <div class="theme-track--brand">
    <router-link
      :to="$localePath"
      class="theme-track--logo"
    >
      <img :src="imgLogo" v-if="imgLogo" />
      <h1 v-else>{{ $site.title }}</h1>
    </router-link>
  </div>
</template>

<style lang="stylus">
  {$theme}
    &brand
      flex 1
    &logo
      > h1
        margin (($navbarHeight - px2rem(30px)) / 2) 0 0
        font-size px2rem(24px)
        font-weight 200
      img
        display block
        margin-top (($navbarHeight - px2rem(30px)) / 2)
        height px2rem(30px)
        width auto
</style>

<script>
  import { isExternal } from '../util'
  export default {
    props: ['logo'],
    computed: {
      imgLogo () {
        const logo = this.logo ? this.logo : this.$site.themeConfig.logo
        return isExternal(logo) ? logo : this.$withBase(logo)
      }
    }
  }
</script>