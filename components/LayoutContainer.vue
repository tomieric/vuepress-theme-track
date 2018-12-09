<template>
  <div class="track-theme">
    <NavBar ref="header" />
    <div class="track-them--container">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style src="../assets/fonts/iconfont.css"></style>
<style src="../styles/theme.styl" lang="stylus"></style>
<style src="../styles/mobile.styl" lang="stylus"></style>
<style src="prismjs/themes/prism-tomorrow.css"></style>

<script>
  import Vue from 'vue'
  import nprogress from 'nprogress'
  import 'nprogress/nprogress.css'
  export default {
    mounted () {
      this.$router.beforeEach((to, from, next) => {
        if (to.path !== from.path && !Vue.component(to.name)) {
          nprogress.start()
        }
        next()
      });
      this.$router.afterEach(() => nprogress.done())
    }
  }
</script>

<style lang="stylus">
  #nprogress .bar
    background $accentColor
  #nprogress .peg
    box-shadow: 0 0 10px $accentColor, 0 0 5px $accentColor
  #nprogress .spinner-icon
    border-top-color: $accentColor
    border-left-color: $accentColor
</style>