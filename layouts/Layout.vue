<template>
  <LayoutContainer>
    <div class="top-banner" :style="{ 'background-image': `url(${maskBgUrl})`}">
      <div class="top-banner-bg"></div>
      <vue-particles
        v-if="showParticles"
        class="top-banner-mask"
        color="#6d6d6d"
        :particleOpacity="0.8"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="2"
        linesColor="#6d6d6d"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.5"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="pubsh"
      ></vue-particles>
    </div>
    <List v-if="$pagination && $pagination.posts" :items="$pagination.posts" />
    <Pagination />
  </LayoutContainer>
</template>

<script>
  import Vue from 'vue'
  import maskBgUrl from '../assets/images/world.png'
  export default {
    data () {
      return {
        maskBgUrl,
        showParticles: false
      }
    },
    mounted() {
      // 动态引入
      import('vue-particles').then(module => {
        Vue.use(module.default)
        this.$nextTick(() => (this.showParticles = true))
      })
    }
  }
</script>

<style lang="stylus">
  .top-banner
    position relative
    height px2rem(250px)
    background-repeat no-repeat
    background-size cover
    background-position top center
    &-bg
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      background radial-gradient(circle, lighten($codeBgColor, 70%) 10%, transparent 10%)
      background-size 10px 10px
      opacity .8
    &-mask
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      z-index 1
  @media (max-width: $MQNarrow)
    .top-banner
      height px2rem(200px)
</style>